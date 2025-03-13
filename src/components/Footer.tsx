
import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full py-6 px-4 sm:px-6 lg:px-8 border-t border-border animate-fade-in">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between">
        <div className="mb-4 sm:mb-0">
          <p className="text-sm text-muted-foreground">
            © {currentYear} SoundSorcery. All rights reserved.
          </p>
        </div>
        <div className="flex space-x-6">
          <span className="text-sm text-muted-foreground transition-all-300 hover:text-foreground cursor-pointer">
            Privacy
          </span>
          <span className="text-sm text-muted-foreground transition-all-300 hover:text-foreground cursor-pointer">
            Terms
          </span>
          <span className="text-sm text-muted-foreground transition-all-300 hover:text-foreground cursor-pointer">
            Contact
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
