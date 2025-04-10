
import React, { useState } from 'react';
import { Upload, FileText, CheckCircle2, AlertCircle, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

type UploadState = 'idle' | 'uploading' | 'success' | 'error';

const ResumeUpload = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadState, setUploadState] = useState<UploadState>('idle');
  const [jobDescription, setJobDescription] = useState('');
  const [selectedJob, setSelectedJob] = useState('');

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    const validFiles = droppedFiles.filter(file => {
      const extension = file.name.split('.').pop()?.toLowerCase();
      return ['pdf', 'doc', 'docx', 'txt'].includes(extension || '');
    });
    
    setFiles(prev => [...prev, ...validFiles]);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...selectedFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUploadState('uploading');
    
    // Simulate API call
    setTimeout(() => {
      setUploadState('success');
      
      // Reset form after success
      setTimeout(() => {
        setFiles([]);
        setUploadState('idle');
        setJobDescription('');
        setSelectedJob('');
      }, 3000);
    }, 2000);
  };

  const jobOptions = [
    { value: 'frontend', label: 'Senior Frontend Developer' },
    { value: 'backend', label: 'Backend Engineer' },
    { value: 'fullstack', label: 'Full Stack Developer' },
    { value: 'devops', label: 'DevOps Engineer' },
    { value: 'designer', label: 'UX/UI Designer' },
  ];

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Upload Resumes</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Upload Resumes</CardTitle>
            <CardDescription>
              Upload candidate resumes to analyze and match with job descriptions.
              Supported formats: PDF, DOCX, TXT.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div 
                className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center mb-4"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleFileDrop}
              >
                <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                <p className="text-sm text-center text-muted-foreground mb-2">
                  Drag and drop files here, or click to select files
                </p>
                <Input
                  type="file"
                  className="hidden"
                  id="resumeInput"
                  multiple
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={handleFileInput}
                />
                <Button 
                  variant="outline" 
                  type="button"
                  onClick={() => document.getElementById('resumeInput')?.click()}
                >
                  Browse Files
                </Button>
              </div>
              
              {files.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-sm font-medium mb-2">Selected Files ({files.length})</h3>
                  <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                    {files.map((file, index) => (
                      <div 
                        key={index} 
                        className="flex items-center justify-between bg-secondary/50 p-2 rounded-md"
                      >
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 mr-2 text-primary" />
                          <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => removeFile(index)}
                          type="button"
                        >
                          <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="space-y-4 mb-4">
                <div>
                  <Label htmlFor="jobSelect">Match against existing job description</Label>
                  <Select value={selectedJob} onValueChange={setSelectedJob}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a job" />
                    </SelectTrigger>
                    <SelectContent>
                      {jobOptions.map(job => (
                        <SelectItem key={job.value} value={job.value}>
                          {job.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="jobDescription">
                    Or paste a new job description
                  </Label>
                  <Textarea
                    id="jobDescription"
                    placeholder="Paste job description here..."
                    className="min-h-32"
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full"
                disabled={files.length === 0 || uploadState === 'uploading' || (selectedJob === '' && jobDescription === '')}
              >
                {uploadState === 'uploading' ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Uploading...
                  </span>
                ) : uploadState === 'success' ? (
                  <span className="flex items-center">
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Upload Successful!
                  </span>
                ) : uploadState === 'error' ? (
                  <span className="flex items-center">
                    <AlertCircle className="mr-2 h-4 w-4" />
                    Upload Failed
                  </span>
                ) : (
                  'Upload and Analyze'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>How it Works</CardTitle>
            <CardDescription>
              Our AI-powered resume screening process helps you find the best candidates quickly.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex">
                <div className="mr-4 bg-primary/10 p-2 rounded-full h-10 w-10 flex items-center justify-center">
                  <span className="text-primary font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-medium">Upload Resumes</h3>
                  <p className="text-sm text-muted-foreground">
                    Upload candidate resumes in PDF, DOCX, or TXT format.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="mr-4 bg-primary/10 p-2 rounded-full h-10 w-10 flex items-center justify-center">
                  <span className="text-primary font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-medium">AI-Powered Analysis</h3>
                  <p className="text-sm text-muted-foreground">
                    Our AI engine extracts key information from resumes and analyzes skills, experience, and education.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="mr-4 bg-primary/10 p-2 rounded-full h-10 w-10 flex items-center justify-center">
                  <span className="text-primary font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-medium">Match with Job Description</h3>
                  <p className="text-sm text-muted-foreground">
                    Compare candidates against job requirements to find the best matches.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="mr-4 bg-primary/10 p-2 rounded-full h-10 w-10 flex items-center justify-center">
                  <span className="text-primary font-bold">4</span>
                </div>
                <div>
                  <h3 className="font-medium">View Detailed Reports</h3>
                  <p className="text-sm text-muted-foreground">
                    Get match scores, insights, and recommendations for each candidate.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResumeUpload;
