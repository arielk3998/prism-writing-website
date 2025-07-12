"use client";

import React, { useState, useEffect } from "react";
import { CaseStudy } from "@/src/lib/entities/CaseStudy";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select";
import { Star, ArrowRight, Filter, FileText } from "lucide-react";

export default function Portfolio() {
  const [caseStudies, setCaseStudies] = useState([]);
  const [filteredStudies, setFilteredStudies] = useState([]);
  const [selectedIndustry, setSelectedIndustry] = useState("all");
  const [selectedService, setSelectedService] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  const filterStudies = React.useCallback(() => {
    let filtered = caseStudies;
    
    if (selectedIndustry !== "all") {
      filtered = filtered.filter(study => study.industry.toLowerCase() === selectedIndustry);
    }
    
    if (selectedService !== "all") {
      filtered = filtered.filter(study => study.service_type === selectedService);
    }
    
    setFilteredStudies(filtered);
  }, [caseStudies, selectedIndustry, selectedService]);

  useEffect(() => {
    let isMounted = true;
    const loadData = async () => {
      try {
        const studies = await CaseStudy.list("-created_date");
        if (isMounted) {
          setCaseStudies(studies);
        }
      } catch (error) {
        console.error("Error loading case studies:", error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    filterStudies();
  }, [filterStudies]);

  const getServiceDisplayName = (serviceType) => {
    const serviceMap = {
      "document_translation": "Document Translation",
      "website_localization": "Website Localization",
      "content_writing": "Content Writing",
      "copywriting": "Copywriting",
      "technical_writing": "Technical Writing"
    };
    return serviceMap[serviceType] || serviceType;
  };

  const getServiceColor = (serviceType) => {
    const colorMap = {
      "document_translation": "bg-blue-100 text-blue-800",
      "website_localization": "bg-green-100 text-green-800",
      "content_writing": "bg-purple-100 text-purple-800",
      "copywriting": "bg-orange-100 text-orange-800",
      "technical_writing": "bg-red-100 text-red-800"
    };
    return colorMap[serviceType] || "bg-gray-100 text-gray-800";
  };

  const stats = [
    { number: "500+", label: "Projects Completed" },
    { number: "200+", label: "Happy Clients" },
    { number: "40+", label: "Languages" },
    { number: "95%", label: "Success Rate" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-6 bg-blue-100 text-blue-800 border-blue-200">
              Our Success Stories
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Portfolio of
              <span className="text-gradient block">Excellence</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Discover how we&apos;ve helped businesses worldwide break language barriers 
              and achieve their global expansion goals through professional translation services.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">{stat.number}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <span className="font-medium text-gray-700">Filter Projects:</span>
            </div>
            <div className="flex gap-4">
              <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All Industries" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Industries</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="legal">Legal</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedService} onValueChange={setSelectedService}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All Services" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Services</SelectItem>
                  <SelectItem value="document_translation">Document Translation</SelectItem>
                  <SelectItem value="website_localization">Website Localization</SelectItem>
                  <SelectItem value="content_writing">Content Writing</SelectItem>
                  <SelectItem value="copywriting">Copywriting</SelectItem>
                  <SelectItem value="technical_writing">Technical Writing</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="shadow-lg border-0">
                  <CardContent className="p-6">
                    <div className="animate-pulse">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                      <div className="h-8 bg-gray-200 rounded w-full mb-4"></div>
                      <div className="h-20 bg-gray-200 rounded w-full mb-4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredStudies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredStudies.map((study) => (
                <Card key={study.id} className="hover-lift shadow-lg border-0 bg-white">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start mb-3">
                      <Badge className={getServiceColor(study.service_type)}>
                        {getServiceDisplayName(study.service_type)}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {study.industry}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{study.title}</CardTitle>
                    <p className="text-gray-600 font-medium">{study.client_name}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Challenge</h4>
                        <p className="text-gray-600 text-sm">{study.challenge}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Solution</h4>
                        <p className="text-gray-600 text-sm">{study.solution}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Results</h4>
                        <p className="text-gray-600 text-sm">{study.results}</p>
                      </div>
                      
                      {study.languages_involved && study.languages_involved.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Languages</h4>
                          <div className="flex flex-wrap gap-1">
                            {study.languages_involved.slice(0, 3).map((lang, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {lang}
                              </Badge>
                            ))}
                            {study.languages_involved.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{study.languages_involved.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}
                      
                      {study.project_duration && (
                        <div className="pt-4 border-t">
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-500">Timeline:</span>
                            <span className="font-medium">{study.project_duration}</span>
                          </div>
                        </div>
                      )}
                      
                      {study.testimonial && (
                        <div className="pt-4 border-t">
                          <div className="flex items-center mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                            ))}
                          </div>
                          <p className="text-gray-600 text-sm italic">&ldquo;{study.testimonial}&rdquo;</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No case studies found</h3>
              <p className="text-gray-600">Try adjusting your filters or check back later.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 premium-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Create Your Success Story?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join hundreds of companies that have achieved global success with our professional translation services
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-50 text-lg px-8 py-6">
              Start Your Project
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-2 border-white text-white hover:bg-white hover:text-blue-600">
              View All Services
            </Button>
          </div>
        </div>
      </section>

      <style jsx>{`
        .premium-gradient {
          background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
        }
        
        .text-gradient {
          background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .hover-lift {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .hover-lift:hover {
          transform: translateY(-2px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
      `}</style>
    </div>
  );
}
