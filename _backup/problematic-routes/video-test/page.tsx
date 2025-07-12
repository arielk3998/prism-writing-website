'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const VideoTestPage = () => {
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [currentJobId, setCurrentJobId] = useState<string | null>(null);

  const testCreateJob = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/video/demo', {
        method: 'POST'
      });
      const data = await response.json();
      setResults(data);
      setCurrentJobId(data.jobId);
    } catch (error) {
      console.error('Error:', error);
      setResults({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  const testProcessJob = async () => {
    if (!currentJobId) return;
    
    setLoading(true);
    try {
      const response = await fetch('/api/video/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobId: currentJobId })
      });
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error:', error);
      setResults({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  const testGetStatus = async () => {
    if (!currentJobId) return;
    
    setLoading(true);
    try {
      const response = await fetch(`/api/video/status/${currentJobId}`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error:', error);
      setResults({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  const testGetAllJobs = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/video/demo');
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error:', error);
      setResults({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-safe mb-8">
            Video Processing API Test
          </h1>

          <Card className="p-6 mb-8">
            <h2 className="text-xl font-semibold text-safe mb-4">
              Test API Endpoints
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <Button
                onClick={testCreateJob}
                disabled={loading}
                className="btn-primary"
              >
                Create Demo Job
              </Button>
              
              <Button
                onClick={testProcessJob}
                disabled={loading || !currentJobId}
                variant="secondary"
              >
                Start Processing
              </Button>
              
              <Button
                onClick={testGetStatus}
                disabled={loading || !currentJobId}
                variant="secondary"
              >
                Get Status
              </Button>
              
              <Button
                onClick={testGetAllJobs}
                disabled={loading}
                variant="secondary"
              >
                Get All Jobs
              </Button>
            </div>

            {currentJobId && (
              <div className="mb-4 p-3 bg-muted rounded-lg">
                <span className="text-safe-muted text-sm">Current Job ID: </span>
                <span className="text-safe font-mono text-sm">{currentJobId}</span>
              </div>
            )}
          </Card>

          {results && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-safe mb-4">
                API Response
              </h3>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                {JSON.stringify(results, null, 2)}
              </pre>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoTestPage;
