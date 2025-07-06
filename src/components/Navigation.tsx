import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Briefcase, BarChart3, Upload, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

type NavItem = {
  title: string;
  href: string;
  icon: React.ElementType;
};

const navItems: NavItem[] = [];

const Navigation = () => {
  return (
    <nav className="flex items-center justify-between p-4 bg-white shadow-sm border-b">
      <div className="flex items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="bg-brand-500 w-10 h-10 rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-xl">R</span>
          </div>
          <span className="font-bold text-xl text-foreground">ResuMatch</span>
        </Link>
      </div>
      
      <div className="hidden md:flex space-x-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-muted",
              window.location.pathname === item.href
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground"
            )}
          >
            <item.icon className="w-4 h-4 mr-2" />
            {item.title}
          </Link>
        ))}
      </div>
      
      <div className="flex md:hidden">
        <button className="p-2 text-muted-foreground hover:text-foreground">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
