import React, { useState } from 'react';
import { Search as SearchIcon, Filter, ChevronDown, X, DownloadCloud, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';

interface SearchResult {
  id: number;
  name: string;
  position: string;
  matchScore: number;
  experience: string;
  education: string;
  skills: string[];
  location: string;
  status: 'new' | 'reviewed' | 'shortlisted' | 'rejected';
}

const experienceOptions = [
  { label: 'All Experience', value: 'all' },
  { label: '0-2 years', value: '0-2' },
  { label: '3-5 years', value: '3-5' },
  { label: '5+ years', value: '5+' },
];

const educationOptions = [
  { label: 'All Education', value: 'all' },
  { label: 'Bachelor\'s', value: 'bachelors' },
  { label: 'Master\'s', value: 'masters' },
  { label: 'Ph.D.', value: 'phd' },
];

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

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [experienceFilter, setExperienceFilter] = useState('all');
  const [educationFilter, setEducationFilter] = useState('all');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (searchQuery.trim() === '') return;
    
    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      setResults([]);
      setIsSearching(false);
    }, 1500);
  };
  
  const addFilter = (filter: string) => {
    if (!activeFilters.includes(filter)) {
      setActiveFilters([...activeFilters, filter]);
    }
  };
  
  const removeFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter(f => f !== filter));
  };
  
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Search Candidates</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
              <CardDescription>Refine your search results</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-2">Skills</h3>
                <div className="space-y-2">
                  {['React', 'JavaScript', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker'].map(skill => (
                    <div key={skill} className="flex items-center">
                      <input 
                        type="checkbox" 
                        id={`skill-${skill}`} 
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        onChange={() => activeFilters.includes(skill) ? removeFilter(skill) : addFilter(skill)}
                        checked={activeFilters.includes(skill)}
                      />
                      <label htmlFor={`skill-${skill}`} className="ml-2 text-sm">{skill}</label>
                    </div>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-sm font-medium mb-2">Experience</h3>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                      {experienceOptions.find(opt => opt.value === experienceFilter)?.label}
                      <ChevronDown className="h-4 w-4 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-full">
                    {experienceOptions.map(option => (
                      <DropdownMenuItem 
                        key={option.value}
                        onClick={() => setExperienceFilter(option.value)}
                      >
                        {option.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-sm font-medium mb-2">Education</h3>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                      {educationOptions.find(opt => opt.value === educationFilter)?.label}
                      <ChevronDown className="h-4 w-4 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-full">
                    {educationOptions.map(option => (
                      <DropdownMenuItem 
                        key={option.value}
                        onClick={() => setEducationFilter(option.value)}
                      >
                        {option.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-sm font-medium mb-2">Location</h3>
                <Input placeholder="Enter location..." />
              </div>
              
              <Button variant="outline" className="w-full" onClick={() => {
                setActiveFilters([]);
                setExperienceFilter('all');
                setEducationFilter('all');
              }}>
                Reset Filters
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-3">
          <form onSubmit={handleSearch} className="mb-4">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-2.5 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search by skill, name, or position (e.g., 'React AND JavaScript')"
                  className="pl-10"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>
              <Button type="submit" disabled={isSearching}>
                {isSearching ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Searching...
                  </span>
                ) : (
                  'Search'
                )}
              </Button>
            </div>
          </form>
          
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {activeFilters.map(filter => (
                <Badge key={filter} variant="secondary" className="flex items-center gap-1">
                  {filter}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => removeFilter(filter)}
                  />
                </Badge>
              ))}
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-6 px-2 text-xs"
                onClick={() => setActiveFilters([])}
              >
                Clear All
              </Button>
            </div>
          )}
          
          {results.length > 0 ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium">Search Results ({results.length})</h2>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-1" />
                  Export Results
                </Button>
              </div>
              
              <div className="space-y-4">
                {results.map((result) => (
                  <Card key={result.id}>
                    <CardContent className="p-4">
                      <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <h3 className="text-lg font-medium">{result.name}</h3>
                            <Badge variant="outline" className={`ml-2 ${statusColors[result.status]} text-white`}>
                              {statusLabels[result.status]}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{result.position} • {result.location}</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {result.skills.map((skill, index) => (
                              <Badge 
                                key={index} 
                                variant="outline" 
                                className={activeFilters.includes(skill) 
                                  ? "bg-primary/20 text-primary border-primary/30" 
                                  : "bg-secondary"
                                }
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-end mt-4 md:mt-0">
                          <div className="text-lg font-bold mb-1">
                            <span className={getScoreColor(result.matchScore)}>
                              {result.matchScore}%
                            </span>
                          </div>
                          <Progress 
                            value={result.matchScore} 
                            className="h-2 w-32"
                            indicatorClassName={getProgressColor(result.matchScore)}
                          />
                          <div className="flex gap-2 mt-2 text-sm text-muted-foreground">
                            <span>{result.experience} exp</span>
                            <span>•</span>
                            <span>{result.education}</span>
                          </div>
                          <Button variant="outline" size="sm" className="mt-2">
                            View Profile
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-12 text-center">
                <div className="rounded-full bg-muted/50 p-4 mb-4">
                  <SearchIcon className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">
                  {searchQuery ? 'No results found' : 'Search for candidates'}
                </h3>
                <p className="text-muted-foreground mb-4 max-w-md">
                  {searchQuery 
                    ? 'Try adjusting your search terms or filters to find what you\'re looking for.'
                    : 'Use the search bar above to find candidates by skills, position, or name. Try using keywords like "React" or "Product Manager".'
                  }
                </p>
                {searchQuery && (
                  <Button 
                    variant="outline" 
                    onClick={() => setSearchQuery('')}
                  >
                    Clear Search
                  </Button>
                )}
                {!searchQuery && (
                  <div className="flex flex-col items-center">
                    <div className="text-sm font-medium text-muted-foreground mb-2">Try these example searches:</div>
                    <div className="flex flex-wrap gap-2 justify-center">
                      <Button variant="secondary" size="sm" onClick={() => setSearchQuery('React AND JavaScript')}>
                        React AND JavaScript
                      </Button>
                      <Button variant="secondary" size="sm" onClick={() => setSearchQuery('Senior Developer')}>
                        Senior Developer
                      </Button>
                      <Button variant="secondary" size="sm" onClick={() => setSearchQuery('AWS')}>
                        AWS
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
