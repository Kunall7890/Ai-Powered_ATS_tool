import React, { useState } from 'react';
import { 
  Search, Filter, ChevronDown, ArrowUpDown, Eye, Trash2, Download, 
  User, Mail, Phone, Briefcase, GraduationCap, Check, X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { Progress } from '@/components/ui/progress';

interface Candidate {
  id: number;
  name: string;
  email: string;
  phone: string;
  position: string;
  matchScore: number;
  experience: string;
  education: string;
  skills: string[];
  missingSkills: string[];
  uploadDate: string;
  status: 'new' | 'reviewed' | 'shortlisted' | 'rejected';
}

const statusColors = {
  new: 'bg-blue-500',
  reviewed: 'bg-purple-500',
  shortlisted: 'bg-green-500',
  rejected: 'bg-red-500',
};

const statusLabels = {
  new: 'New',
  reviewed: 'Reviewed',
  shortlisted: 'Shortlisted',
  rejected: 'Rejected',
};

const getScoreColor = (score: number) => {
  if (score >= 80) return 'match-score-high';
  if (score >= 60) return 'match-score-medium';
  return 'match-score-low';
};

const getProgressColor = (score: number) => {
  if (score >= 80) return 'bg-match-high';
  if (score >= 60) return 'bg-match-medium';
  return 'bg-match-low';
};

const CandidatesPage = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [scoreFilter, setScoreFilter] = useState<string>('all');
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Candidate | null;
    direction: 'ascending' | 'descending';
  }>({ key: 'matchScore', direction: 'descending' });
  
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

  const handleSort = (key: keyof Candidate) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    
    setSortConfig({ key, direction });
  };
  
  const filteredCandidates = candidates
    .filter(candidate => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const searchableFields = [
          candidate.name.toLowerCase(),
          candidate.email.toLowerCase(),
          candidate.position.toLowerCase(),
          ...candidate.skills.map(skill => skill.toLowerCase()),
        ];
        
        if (!searchableFields.some(field => field.includes(query))) {
          return false;
        }
      }
      
      // Status filter
      if (statusFilter.length > 0 && !statusFilter.includes(candidate.status)) {
        return false;
      }
      
      // Score filter
      if (scoreFilter !== 'all') {
        if (scoreFilter === 'high' && candidate.matchScore < 80) return false;
        if (scoreFilter === 'medium' && (candidate.matchScore < 60 || candidate.matchScore >= 80)) return false;
        if (scoreFilter === 'low' && candidate.matchScore >= 60) return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      if (!sortConfig.key) return 0;
      
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  
  const toggleStatusFilter = (status: string) => {
    if (statusFilter.includes(status)) {
      setStatusFilter(statusFilter.filter(s => s !== status));
    } else {
      setStatusFilter([...statusFilter, status]);
    }
  };
  
  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Candidates</h1>
        
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search candidates..."
              className="pl-8"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-1">
                <Filter className="h-4 w-4" />
                Filter
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => toggleStatusFilter('new')} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${statusFilter.includes('new') ? statusColors.new : 'bg-gray-300'}`} />
                <span>New</span>
                {statusFilter.includes('new') && <Check className="h-4 w-4 ml-auto" />}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toggleStatusFilter('reviewed')} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${statusFilter.includes('reviewed') ? statusColors.reviewed : 'bg-gray-300'}`} />
                <span>Reviewed</span>
                {statusFilter.includes('reviewed') && <Check className="h-4 w-4 ml-auto" />}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toggleStatusFilter('shortlisted')} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${statusFilter.includes('shortlisted') ? statusColors.shortlisted : 'bg-gray-300'}`} />
                <span>Shortlisted</span>
                {statusFilter.includes('shortlisted') && <Check className="h-4 w-4 ml-auto" />}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toggleStatusFilter('rejected')} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${statusFilter.includes('rejected') ? statusColors.rejected : 'bg-gray-300'}`} />
                <span>Rejected</span>
                {statusFilter.includes('rejected') && <Check className="h-4 w-4 ml-auto" />}
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Filter by Match Score</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setScoreFilter('all')} className="flex items-center gap-2">
                <span>All Scores</span>
                {scoreFilter === 'all' && <Check className="h-4 w-4 ml-auto" />}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setScoreFilter('high')} className="flex items-center gap-2">
                <span className="match-score-high">High (80-100%)</span>
                {scoreFilter === 'high' && <Check className="h-4 w-4 ml-auto" />}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setScoreFilter('medium')} className="flex items-center gap-2">
                <span className="match-score-medium">Medium (60-79%)</span>
                {scoreFilter === 'medium' && <Check className="h-4 w-4 ml-auto" />}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setScoreFilter('low')} className="flex items-center gap-2">
                <span className="match-score-low">Low (0-59%)</span>
                {scoreFilter === 'low' && <Check className="h-4 w-4 ml-auto" />}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-1 lg:col-span-2">
          <Card>
            <CardHeader className="p-4">
              <div className="grid grid-cols-12 text-xs font-medium text-muted-foreground">
                <div className="col-span-5 flex items-center cursor-pointer" onClick={() => handleSort('name')}>
                  Candidate
                  <ArrowUpDown className="ml-1 h-3 w-3" />
                </div>
                <div className="col-span-2 flex items-center cursor-pointer" onClick={() => handleSort('matchScore')}>
                  Match
                  <ArrowUpDown className="ml-1 h-3 w-3" />
                </div>
                <div className="col-span-2 flex items-center cursor-pointer" onClick={() => handleSort('experience')}>
                  Experience
                  <ArrowUpDown className="ml-1 h-3 w-3" />
                </div>
                <div className="col-span-2 flex items-center cursor-pointer" onClick={() => handleSort('status')}>
                  Status
                  <ArrowUpDown className="ml-1 h-3 w-3" />
                </div>
                <div className="col-span-1 text-right">Actions</div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {filteredCandidates.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground">
                  No candidates match your current filters.
                </div>
              ) : (
                <div className="divide-y">
                  {filteredCandidates.map(candidate => (
                    <div 
                      key={candidate.id} 
                      className="grid grid-cols-12 p-4 items-center hover:bg-muted/50 cursor-pointer"
                      onClick={() => setSelectedCandidate(candidate)}
                    >
                      <div className="col-span-5">
                        <div className="font-medium">{candidate.name}</div>
                        <div className="text-sm text-muted-foreground">{candidate.position}</div>
                      </div>
                      <div className="col-span-2">
                        <div className={`font-medium ${getScoreColor(candidate.matchScore)}`}>
                          {candidate.matchScore}%
                        </div>
                        <Progress 
                          value={candidate.matchScore} 
                          className="h-1.5 mt-1"
                          indicatorClassName={getProgressColor(candidate.matchScore)}
                        />
                      </div>
                      <div className="col-span-2">
                        {candidate.experience}
                      </div>
                      <div className="col-span-2">
                        <Badge variant="outline" className={`${statusColors[candidate.status]} text-white`}>
                          {statusLabels[candidate.status]}
                        </Badge>
                      </div>
                      <div className="col-span-1 flex justify-end">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div className="col-span-1">
          {selectedCandidate ? (
            <Card>
              <CardHeader className="p-4 flex flex-row items-start justify-between">
                <div>
                  <CardTitle>{selectedCandidate.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{selectedCandidate.position}</p>
                </div>
                <div className={`text-2xl font-bold ${getScoreColor(selectedCandidate.matchScore)}`}>
                  {selectedCandidate.matchScore}%
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center text-muted-foreground">
                    <Mail className="h-4 w-4 mr-2" />
                    <span className="text-sm">{selectedCandidate.email}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Phone className="h-4 w-4 mr-2" />
                    <span className="text-sm">{selectedCandidate.phone}</span>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium flex items-center">
                    <Briefcase className="h-4 w-4 mr-1" /> Experience
                  </h3>
                  <p className="text-sm">{selectedCandidate.experience}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium flex items-center">
                    <GraduationCap className="h-4 w-4 mr-1" /> Education
                  </h3>
                  <p className="text-sm">{selectedCandidate.education}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium flex items-center mb-1">
                    <Check className="h-4 w-4 mr-1 text-match-high" /> Matching Skills
                  </h3>
                  <div className="flex flex-wrap gap-1">
                    {selectedCandidate.skills.map((skill, index) => (
                      <Badge key={index} variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {selectedCandidate.missingSkills.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium flex items-center mb-1">
                      <X className="h-4 w-4 mr-1 text-match-low" /> Missing Skills
                    </h3>
                    <div className="flex flex-wrap gap-1">
                      {selectedCandidate.missingSkills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="bg-red-50 text-red-700 border-red-200">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="pt-2 space-x-2">
                  <Badge variant="outline" className={`${statusColors[selectedCandidate.status]} text-white`}>
                    {statusLabels[selectedCandidate.status]}
                  </Badge>
                  <Badge variant="outline" className="bg-secondary">
                    Uploaded on {new Date(selectedCandidate.uploadDate).toLocaleDateString()}
                  </Badge>
                </div>
                
                <div className="flex space-x-2 pt-2">
                  <Button className="flex-1" variant="default">
                    <User className="h-4 w-4 mr-1" /> View Profile
                  </Button>
                  <Button className="flex-1" variant="outline">
                    <Download className="h-4 w-4 mr-1" /> Resume
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-muted-foreground mb-2">
                  <User className="h-12 w-12 mx-auto mb-2 opacity-20" />
                  <p>Select a candidate to view details</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default CandidatesPage;
