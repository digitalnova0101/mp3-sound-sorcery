
import React from 'react';
import { Music } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="w-full py-6 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Music className="h-8 w-8 text-primary animate-float" />
          <h1 className="text-2xl font-bold tracking-tight">
            <span className="text-primary">Sound</span>
            <span>Sorcery</span>
          </h1>
        </div>
        <div className="hidden sm:flex items-center space-x-6">
          <span className="text-sm font-medium text-muted-foreground transition-all-300 hover:text-foreground cursor-pointer">
            About
          </span>
          <span className="text-sm font-medium text-muted-foreground transition-all-300 hover:text-foreground cursor-pointer">
            Features
          </span>
          <span className="text-sm font-medium text-muted-foreground transition-all-300 hover:text-foreground cursor-pointer">
            Support
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
