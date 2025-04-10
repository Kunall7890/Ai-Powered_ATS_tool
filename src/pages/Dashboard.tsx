
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  UserCheck, Users, FileText, BarChart3, Briefcase, 
  TrendingUp, TrendingDown, Clock 
} from 'lucide-react';

const statCards = [
  {
    title: 'Total Candidates',
    value: '124',
    icon: Users,
    change: '+12% from last month',
    trend: 'up',
  },
  {
    title: 'High Matches',
    value: '38',
    icon: UserCheck,
    change: '+5% from last month',
    trend: 'up',
  },
  {
    title: 'Active Jobs',
    value: '7',
    icon: Briefcase,
    change: '-2 from last month',
    trend: 'down',
  },
  {
    title: 'Avg. Match Score',
    value: '68%',
    icon: BarChart3,
    change: '+3% from last month',
    trend: 'up',
  },
];

const recentMatches = [
  { 
    name: 'Michael Johnson', 
    position: 'Senior Frontend Developer',
    score: 92,
    skills: ['React', 'TypeScript', 'Redux', 'Node.js']
  },
  { 
    name: 'Emily Chen', 
    position: 'UX Designer',
    score: 87,
    skills: ['Figma', 'UI Design', 'User Research', 'Prototyping']
  },
  { 
    name: 'David Smith', 
    position: 'Full Stack Developer',
    score: 78,
    skills: ['JavaScript', 'React', 'Express', 'MongoDB']
  },
  { 
    name: 'Sarah Williams', 
    position: 'Product Manager',
    score: 85,
    skills: ['Agile', 'Jira', 'Product Strategy', 'User Stories']
  },
  { 
    name: 'James Wilson', 
    position: 'DevOps Engineer',
    score: 73,
    skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD']
  },
];

const recentJobs = [
  { 
    title: 'Senior Frontend Developer', 
    department: 'Engineering',
    applicants: 24, 
    highMatches: 8
  },
  { 
    title: 'UX Designer', 
    department: 'Design',
    applicants: 18, 
    highMatches: 5
  },
  { 
    title: 'Full Stack Developer', 
    department: 'Engineering',
    applicants: 32, 
    highMatches: 12
  },
  { 
    title: 'Product Manager', 
    department: 'Product',
    applicants: 15, 
    highMatches: 6
  },
];

const getScoreColor = (score: number) => {
  if (score >= 80) return 'match-score-high';
  if (score >= 60) return 'match-score-medium';
  return 'match-score-low';
};

const Dashboard = () => {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="mr-1 h-4 w-4" />
          Last updated: April 10, 2025 - 09:45 AM
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map((card, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <card.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground flex items-center mt-1">
                {card.trend === 'up' ? (
                  <TrendingUp className="mr-1 h-3 w-3 text-match-high" />
                ) : (
                  <TrendingDown className="mr-1 h-3 w-3 text-match-low" />
                )}
                {card.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Candidate Matches</CardTitle>
            <CardDescription>Top candidate matches from the last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentMatches.map((match, i) => (
                <div key={i} className="flex items-start justify-between border-b pb-4 last:border-0 last:pb-0">
                  <div>
                    <h4 className="font-medium">{match.name}</h4>
                    <p className="text-sm text-muted-foreground">{match.position}</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {match.skills.slice(0, 3).map((skill, j) => (
                        <span key={j} className="text-xs bg-secondary px-2 py-0.5 rounded">
                          {skill}
                        </span>
                      ))}
                      {match.skills.length > 3 && (
                        <span className="text-xs bg-secondary px-2 py-0.5 rounded">
                          +{match.skills.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className={`text-lg font-bold ${getScoreColor(match.score)}`}>
                      {match.score}%
                    </span>
                    <span className="text-xs text-muted-foreground">match score</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Active Job Openings</CardTitle>
            <CardDescription>Currently active job positions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentJobs.map((job, i) => (
                <div key={i} className="flex items-start justify-between border-b pb-4 last:border-0 last:pb-0">
                  <div>
                    <h4 className="font-medium">{job.title}</h4>
                    <p className="text-sm text-muted-foreground">{job.department}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{job.applicants} applicants</div>
                    <div className="text-xs text-match-high">{job.highMatches} high matches</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
