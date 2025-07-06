import type { VideoProcessingJob } from '@/lib/types/video';

/**
 * Shared job storage service
 * In production, this would be replaced with a database
 */
class JobStorage {
  private jobs = new Map<string, VideoProcessingJob>();

  set(jobId: string, job: VideoProcessingJob): void {
    this.jobs.set(jobId, job);
  }

  get(jobId: string): VideoProcessingJob | undefined {
    return this.jobs.get(jobId);
  }

  has(jobId: string): boolean {
    return this.jobs.has(jobId);
  }

  delete(jobId: string): boolean {
    return this.jobs.delete(jobId);
  }

  getAll(): VideoProcessingJob[] {
    return Array.from(this.jobs.values());
  }

  size(): number {
    return this.jobs.size;
  }

  clear(): void {
    this.jobs.clear();
  }
}

// Export singleton instance
export const jobStorage = new JobStorage();
