import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Activity, Heart, Scale, Calendar, Play, Pause, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export const LandingPage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });

  const { scrollY } = useScroll();
  const demoScale = useTransform(scrollY, [0, 200], [0.8, 1]);
  const demoY = useTransform(scrollY, [0, 200], [100, 0]);
  const demoOpacity = useTransform(scrollY, [0, 200], [0.6, 1]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2" />
        <div className="absolute bottom-0 left-1/4 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[100px] translate-y-1/2" />
        <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[80px] -translate-y-1/2" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">F</span>
            </div>
            <span className="text-xl font-bold">FitSync</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <Link to="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">Dashboard</Link>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-xl hover:scale-105 transition-all duration-200"
            >
              {isDarkMode ? (
                <Moon className="h-5 w-5 text-blue-200" />
              ) : (
                <Sun className="h-5 w-5 text-blue-500" />
              )}
            </Button>
            <Link to="/dashboard">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Button>Sign Up</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 relative z-10">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent"
          >
            Unlock Your Fitness Potential
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            Personalized tracking, actionable insights, and expert guidance - all in one app
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center space-x-4"
          >
            <Link to="/dashboard">
              <Button size="lg" className="rounded-xl">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="lg" 
              className="rounded-xl"
              onClick={togglePlay}
            >
              {isPlaying ? (
                <>
                  <Pause className="mr-2 h-4 w-4" />
                  Pause Demo
                </>
              ) : (
                <>
                  <Play className="mr-2 h-4 w-4" />
                  Watch Demo
                </>
              )}
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Demo Preview */}
      <motion.div 
        style={{ scale: demoScale, y: demoY, opacity: demoOpacity }}
        className="relative z-20 max-w-6xl mx-auto px-4 mb-32"
      >
        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-border/50 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-b from-background/5 to-background/20 backdrop-blur-[2px]" />
          <img 
            src="/dashboard-preview.png" 
            alt="Dashboard Preview" 
            className="w-full h-full object-cover"
          />
          {isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/your-demo-video-id?autoplay=1&controls=0&modestbranding=1"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
        </div>
      </motion.div>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent"
          >
            Powerful Features to Boost Your Fitness
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const features = [
  {
    icon: Activity,
    title: 'Activity Tracking',
    description: 'Monitor your daily activities, steps, and calories burned with precision.'
  },
  {
    icon: Heart,
    title: 'Health Metrics',
    description: 'Keep track of vital health metrics like heart rate, blood pressure, and sleep patterns.'
  },
  {
    icon: Scale,
    title: 'Nutrition Planning',
    description: 'Plan your meals and track your nutritional intake for a balanced diet.'
  },
  {
    icon: Activity,
    title: 'Progress Analytics',
    description: 'Visualize your fitness progress with detailed charts and insights.'
  },
  {
    icon: Scale,
    title: 'Weight Management',
    description: 'Set weight goals and track your progress over time with our smart tools.'
  },
  {
    icon: Calendar,
    title: 'Workout Scheduler',
    description: 'Plan and schedule your workouts with our easy-to-use calendar integration.'
  }
];

export default LandingPage;