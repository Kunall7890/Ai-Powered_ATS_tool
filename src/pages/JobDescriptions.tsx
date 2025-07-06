import React, { useState } from 'react';
import { 
  Plus, Search, Calendar, Users, Briefcase, Clock, MoreHorizontal, 
  ExternalLink, Edit, Trash2, ChevronDown, FileText, UserCheck, BarChart2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface JobDescription {
  id: number;
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract';
  experience: string;
  postedDate: string;
  applicants: number;
  matches: number;
  keySkills: string[];
  status: 'active' | 'closed' | 'draft';
  description: string;
}

const statusColors = {
  active: 'bg-green-500',
  closed: 'bg-gray-500',
  draft: 'bg-yellow-500',
};

const statusLabels = {
  active: 'Active',
  closed: 'Closed',
  draft: 'Draft',
};

const JobDescriptionsPage = () => {
  const [jobs, setJobs] = useState<JobDescription[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [newJobDialogOpen, setNewJobDialogOpen] = useState(false);
  const [newJob, setNewJob] = useState({
    title: '',
    department: '',
    location: '',
    type: 'Full-time' as const,
    experience: '',
    keySkills: '',
    description: '',
  });
  
  const filteredJobs = jobs.filter(job => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const searchableFields = [
        job.title.toLowerCase(),
        job.department.toLowerCase(),
        job.location.toLowerCase(),
        ...job.keySkills.map(skill => skill.toLowerCase()),
      ];
      
      if (!searchableFields.some(field => field.includes(query))) {
        return false;
      }
    }
    
    // Status filter
    if (statusFilter.length > 0 && !statusFilter.includes(job.status)) {
      return false;
    }
    
    return true;
  });
  
  const toggleStatusFilter = (status: string) => {
    if (statusFilter.includes(status)) {
      setStatusFilter(statusFilter.filter(s => s !== status));
    } else {
      setStatusFilter([...statusFilter, status]);
    }
  };
  
  const handleSubmitNewJob = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newJobData: JobDescription = {
      id: jobs.length + 1,
      title: newJob.title,
      department: newJob.department,
      location: newJob.location,
      type: newJob.type,
      experience: newJob.experience,
      postedDate: new Date().toISOString().split('T')[0],
      applicants: 0,
      matches: 0,
      keySkills: newJob.keySkills.split(',').map(skill => skill.trim()),
      status: 'draft',
      description: newJob.description,
    };
    
    setJobs([...jobs, newJobData]);
    setNewJobDialogOpen(false);
    // Reset form
    setNewJob({
      title: '',
      department: '',
      location: '',
      type: 'Full-time',
      experience: '',
      keySkills: '',
      description: '',
    });
  };
  
  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Job Descriptions</h1>
        
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search jobs..."
              className="pl-8"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-1">
                Status
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem 
                onClick={() => toggleStatusFilter('active')}
                className="flex items-center gap-2"
              >
                <div className={`w-3 h-3 rounded-full ${statusFilter.includes('active') ? statusColors.active : 'bg-gray-300'}`} />
                Active
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => toggleStatusFilter('closed')}
                className="flex items-center gap-2"
              >
                <div className={`w-3 h-3 rounded-full ${statusFilter.includes('closed') ? statusColors.closed : 'bg-gray-300'}`} />
                Closed
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => toggleStatusFilter('draft')}
                className="flex items-center gap-2"
              >
                <div className={`w-3 h-3 rounded-full ${statusFilter.includes('draft') ? statusColors.draft : 'bg-gray-300'}`} />
                Draft
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Dialog open={newJobDialogOpen} onOpenChange={setNewJobDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Job
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <form onSubmit={handleSubmitNewJob}>
                <DialogHeader>
                  <DialogTitle>Create New Job Description</DialogTitle>
                  <DialogDescription>
                    Enter the details for the new job position. The AI will automatically extract key requirements.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Job Title</Label>
                      <Input 
                        id="title" 
                        placeholder="e.g., Senior Frontend Developer"
                        value={newJob.title}
                        onChange={e => setNewJob({...newJob, title: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Input 
                        id="department" 
                        placeholder="e.g., Engineering"
                        value={newJob.department}
                        onChange={e => setNewJob({...newJob, department: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input 
                        id="location" 
                        placeholder="e.g., San Francisco, CA"
                        value={newJob.location}
                        onChange={e => setNewJob({...newJob, location: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="experience">Experience Required</Label>
                      <Input 
                        id="experience" 
                        placeholder="e.g., 3+ years"
                        value={newJob.experience}
                        onChange={e => setNewJob({...newJob, experience: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="keySkills">Key Skills (comma separated)</Label>
                    <Input 
                      id="keySkills" 
                      placeholder="e.g., React, TypeScript, Node.js"
                      value={newJob.keySkills}
                      onChange={e => setNewJob({...newJob, keySkills: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Job Description</Label>
                    <Textarea 
                      id="description" 
                      placeholder="Enter detailed job description..."
                      className="min-h-[200px]"
                      value={newJob.description}
                      onChange={e => setNewJob({...newJob, description: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button 
                    variant="outline" 
                    type="button"
                    onClick={() => setNewJobDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Create Job</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredJobs.map(job => (
          <Card key={job.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl">{job.title}</CardTitle>
                <Badge variant="outline" className={`${statusColors[job.status]} text-white`}>
                  {statusLabels[job.status]}
                </Badge>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Briefcase className="h-4 w-4 mr-1" />
                {job.department} · {job.location}
              </div>
            </CardHeader>
            <CardContent className="pb-3">
              <div className="flex justify-between text-sm mb-3">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span>{job.experience}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span>Posted {new Date(job.postedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                </div>
              </div>
              
              <div className="mb-4 text-sm line-clamp-3">
                {job.description}
              </div>
              
              <div className="flex flex-wrap gap-1 mb-4">
                {job.keySkills.map((skill, index) => (
                  <Badge key={index} variant="outline" className="bg-primary/10 text-primary border-primary/20">
                    {skill}
                  </Badge>
                ))}
              </div>
              
              <div className="grid grid-cols-2 gap-2 mb-2">
                <div className="bg-muted/50 rounded p-2 text-center">
                  <div className="text-sm text-muted-foreground flex items-center justify-center mb-1">
                    <Users className="h-3.5 w-3.5 mr-1" /> Applicants
                  </div>
                  <div className="font-medium">{job.applicants}</div>
                </div>
                <div className="bg-muted/50 rounded p-2 text-center">
                  <div className="text-sm text-muted-foreground flex items-center justify-center mb-1">
                    <UserCheck className="h-3.5 w-3.5 mr-1" /> Matches
                  </div>
                  <div className="font-medium">{job.matches}</div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between pt-0">
              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-1" />
                View Details
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Edit className="h-4 w-4 mr-2" /> Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <ExternalLink className="h-4 w-4 mr-2" /> Publish
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <BarChart2 className="h-4 w-4 mr-2" /> View Analytics
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">
                    <Trash2 className="h-4 w-4 mr-2" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {filteredJobs.length === 0 && (
        <div className="text-center py-12">
          <div className="bg-muted/30 inline-flex p-4 rounded-full mb-4">
            <Briefcase className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium mb-2">No job descriptions found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search or filter criteria
          </p>
          <Button 
            onClick={() => setNewJobDialogOpen(true)}
            className="gap-1"
          >
            <Plus className="h-4 w-4" /> Add New Job
          </Button>
        </div>
      )}
    </div>
  );
};

export default JobDescriptionsPage;
