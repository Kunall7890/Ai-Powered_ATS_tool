import React from 'react';
import { Outlet } from 'react-router-dom';
import { TooltipProvider } from "@/components/ui/tooltip";
import Navigation from './Navigation';

const Layout = () => {
  return (
    <TooltipProvider>
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 bg-secondary/30">
          <Outlet />
        </main>
      </div>
    </TooltipProvider>
  );
};

export default Layout;
