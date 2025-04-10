
import React, { useState } from 'react';
import { Upload, FileText, CheckCircle2, AlertCircle, Trash2, FileCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

type UploadState = 'idle' | 'uploading' | 'analyzing' | 'success' | 'error';
type AnalysisResult = {
  fileName: string;
  matchScore: number;
  skills: {
    matched: string[];
    missing: string[];
  };
  experience: string;
  education: string;
};

const ResumeUpload = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadState, setUploadState] = useState<UploadState>('idle');
  const [jobDescription, setJobDescription] = useState('');
  const [selectedJob, setSelectedJob] = useState('');
  const [progress, setProgress] = useState(0);
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult[]>([]);
  const { toast } = useToast();

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    const validFiles = droppedFiles.filter(file => {
      const extension = file.name.split('.').pop()?.toLowerCase();
      return ['pdf', 'doc', 'docx', 'txt'].includes(extension || '');
    });
    
    if (validFiles.length !== droppedFiles.length) {
      toast({
        title: "Invalid file format",
        description: "Only PDF, DOC, DOCX, and TXT files are supported",
        variant: "destructive",
      });
    }
    
    setFiles(prev => [...prev, ...validFiles]);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      const validFiles = selectedFiles.filter(file => {
        const extension = file.name.split('.').pop()?.toLowerCase();
        return ['pdf', 'doc', 'docx', 'txt'].includes(extension || '');
      });
      
      if (validFiles.length !== selectedFiles.length) {
        toast({
          title: "Invalid file format",
          description: "Only PDF, DOC, DOCX, and TXT files are supported",
          variant: "destructive",
        });
      }
      
      setFiles(prev => [...prev, ...validFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const simulateFileReading = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      // In a real implementation, we would use APIs to extract text from files
      // This is just a simulation
      const reader = new FileReader();
      reader.onload = (e) => {
        // Simulate a delay for reading
        setTimeout(() => {
          resolve('Simulated content for ' + file.name);
        }, 500);
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    });
  };

  const analyzeResume = (resumeContent: string, jd: string): AnalysisResult => {
    // In a real app, this would use NLP/AI to match resumes against JD
    // For demo, we'll create a simulated analysis with random scores
    
    const skills = {
      matched: [
        'JavaScript', 'React', 'TypeScript', 'HTML/CSS',
      ].sort(() => Math.random() - 0.5).slice(0, Math.floor(Math.random() * 4) + 1),
      missing: [
        'Node.js', 'Express', 'MongoDB', 'Docker', 'GraphQL',
      ].sort(() => Math.random() - 0.5).slice(0, Math.floor(Math.random() * 3) + 1)
    };
    
    // Random score between 60 and 95
    const matchScore = Math.floor(Math.random() * 36) + 60;
    
    return {
      fileName: 'Simulated Analysis',
      matchScore,
      skills,
      experience: Math.floor(Math.random() * 10) + 1 + ' years',
      education: ['Bachelor's', 'Master's', 'PhD'][Math.floor(Math.random() * 3)]
    };
  };

  const processFiles = async () => {
    if (files.length === 0) return;
    
    setUploadState('uploading');
    setProgress(0);
    
    try {
      // Simulate upload progress
      const totalFiles = files.length;
      const results: AnalysisResult[] = [];
      
      for (let i = 0; i < totalFiles; i++) {
        // Update progress
        setProgress(Math.round((i / totalFiles) * 50));
        
        // Simulate file upload
        await new Promise(resolve => setTimeout(resolve, 300));
      }
      
      setUploadState('analyzing');
      
      // Now analyze each file
      for (let i = 0; i < totalFiles; i++) {
        // Update progress for analysis phase (50-100%)
        setProgress(50 + Math.round((i / totalFiles) * 50));
        
        // Simulate file reading and analysis
        const fileContent = await simulateFileReading(files[i]);
        const jd = selectedJob ? "Selected job description" : jobDescription;
        const result = analyzeResume(fileContent, jd);
        
        // Add file name to the result
        result.fileName = files[i].name;
        results.push(result);
        
        await new Promise(resolve => setTimeout(resolve, 500));
      }
      
      // Complete the operation
      setProgress(100);
      setAnalysisResults(results);
      setUploadState('success');
      
      toast({
        title: "Analysis complete",
        description: `Successfully analyzed ${totalFiles} resume${totalFiles > 1 ? 's' : ''}`,
      });
    } catch (error) {
      setUploadState('error');
      toast({
        title: "Analysis failed",
        description: "There was an error analyzing the resumes",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    processFiles();
  };

  const resetForm = () => {
    setFiles([]);
    setUploadState('idle');
    setJobDescription('');
    setSelectedJob('');
    setAnalysisResults([]);
    setProgress(0);
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
              
              {(uploadState === 'uploading' || uploadState === 'analyzing') && (
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-muted-foreground mb-1">
                    <span>{uploadState === 'uploading' ? 'Uploading Files...' : 'Analyzing Resumes...'}</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress 
                    value={progress} 
                    className="h-2" 
                    indicatorClassName={uploadState === 'analyzing' ? "bg-yellow-500" : undefined}
                  />
                </div>
              )}
              
              <Button 
                type="submit" 
                className="w-full"
                disabled={files.length === 0 || uploadState === 'uploading' || uploadState === 'analyzing' || (selectedJob === '' && jobDescription === '')}
              >
                {uploadState === 'uploading' ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Uploading...
                  </span>
                ) : uploadState === 'analyzing' ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analyzing...
                  </span>
                ) : uploadState === 'success' ? (
                  <span className="flex items-center">
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Analysis Complete
                  </span>
                ) : uploadState === 'error' ? (
                  <span className="flex items-center">
                    <AlertCircle className="mr-2 h-4 w-4" />
                    Analysis Failed
                  </span>
                ) : (
                  'Upload and Analyze'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
        
        {uploadState === 'success' && analysisResults.length > 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>Analysis Results</CardTitle>
              <CardDescription>
                Resume matches based on the provided job description.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analysisResults.map((result, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <FileCheck className="h-5 w-5 text-primary mr-2" />
                        <h3 className="font-medium">{result.fileName}</h3>
                      </div>
                      <div className="flex items-center">
                        <span className={`text-sm font-semibold ${
                          result.matchScore >= 80 ? 'text-green-600' : 
                          result.matchScore >= 60 ? 'text-yellow-600' : 
                          'text-red-600'
                        }`}>
                          {result.matchScore}% Match
                        </span>
                      </div>
                    </div>
                    
                    <div className="mb-2">
                      <Progress 
                        value={result.matchScore} 
                        className="h-2"
                        indicatorClassName={
                          result.matchScore >= 80 ? "bg-green-500" : 
                          result.matchScore >= 60 ? "bg-yellow-500" : 
                          "bg-red-500"
                        }
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mt-3">
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">Matched Skills</h4>
                        <div className="flex flex-wrap gap-1">
                          {result.skills.matched.map((skill, i) => (
                            <span key={i} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              {skill}
                            </span>
                          ))}
                          {result.skills.matched.length === 0 && (
                            <span className="text-sm text-muted-foreground">No matched skills</span>
                          )}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">Missing Skills</h4>
                        <div className="flex flex-wrap gap-1">
                          {result.skills.missing.map((skill, i) => (
                            <span key={i} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              {skill}
                            </span>
                          ))}
                          {result.skills.missing.length === 0 && (
                            <span className="text-sm text-muted-foreground">No missing skills</span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-3 text-sm">
                      <div className="flex mb-1">
                        <span className="font-medium w-24">Experience:</span>
                        <span>{result.experience}</span>
                      </div>
                      <div className="flex">
                        <span className="font-medium w-24">Education:</span>
                        <span>{result.education}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                onClick={resetForm}
                className="w-full"
              >
                Upload More Resumes
              </Button>
            </CardFooter>
          </Card>
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default ResumeUpload;
