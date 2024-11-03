import React from 'react';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Bell, Sun, Moon, Home, Activity, Settings, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export const Header = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const location = useLocation();

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="px-4 py-3 bg-background/80 backdrop-blur-md border-b border-border/40 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold">F</span>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
            FitSync
          </span>
        </Link>

        <nav className="flex items-center space-x-1">
          <Link to="/">
            <Button 
              variant={isActive('/') ? "secondary" : "ghost"} 
              size="sm"
              className="rounded-xl transition-all duration-200 hover:scale-105"
            >
              <Home className="h-4 w-4 mr-2" />
              Home
            </Button>
          </Link>
          <Link to="/tracking">
            <Button 
              variant={isActive('/tracking') ? "secondary" : "ghost"} 
              size="sm"
              className="rounded-xl transition-all duration-200 hover:scale-105"
            >
              <Activity className="h-4 w-4 mr-2" />
              Track
            </Button>
          </Link>
          <Link to="/profile">
            <Button 
              variant={isActive('/profile') ? "secondary" : "ghost"} 
              size="sm"
              className="rounded-xl transition-all duration-200 hover:scale-105"
            >
              <User className="h-4 w-4 mr-2" />
              Profile
            </Button>
          </Link>
        </nav>

        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="icon"
            className="rounded-xl hover:scale-105 transition-all duration-200"
          >
            <Bell className="h-5 w-5" />
          </Button>
          <Switch
            checked={isDarkMode}
            onCheckedChange={toggleDarkMode}
            className="data-[state=checked]:bg-blue-600 transition-all duration-200"
          >
            {isDarkMode ? 
              <Moon className="h-4 w-4 text-blue-200" /> : 
              <Sun className="h-4 w-4 text-blue-500" />
            }
          </Switch>
        </div>
      </div>
    </header>
  );
};