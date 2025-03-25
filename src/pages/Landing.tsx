
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, Clock, BarChart, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <header className="bg-background sticky top-0 z-50 flex justify-between items-center px-6 py-4 border-b">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
            <Calendar className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-xl font-semibold text-foreground tracking-tight">Flow Tasks</h1>
        </div>
        <div className="flex gap-2">
          <Link to="/login">
            <Button variant="ghost">Login</Button>
          </Link>
          <Link to="/signup">
            <Button>Sign Up</Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero section */}
        <section className="py-20 px-4 text-center bg-gradient-to-b from-background to-muted">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Organize your tasks in <span className="text-primary">perfect flow</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Flow Tasks intelligently reorganizes your to-do list around your calendar and energy levels, helping you work smarter, not harder.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button size="lg" className="w-full sm:w-auto">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Log In
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features section */}
        <section className="py-16 px-4 bg-background">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card>
                <CardContent className="pt-6">
                  <Calendar className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Calendar Integration</h3>
                  <p className="text-muted-foreground">Intelligently reorganize tasks around your Google Calendar events.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <BarChart className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Energy Zones</h3>
                  <p className="text-muted-foreground">Align high-priority tasks with your peak energy periods for maximum productivity.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <Clock className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Built-in Timer</h3>
                  <p className="text-muted-foreground">Track time spent on tasks with a simple one-click timer system.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <CheckCircle className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Backlog Management</h3>
                  <p className="text-muted-foreground">Never lose track of incomplete tasks with smart backlog organization.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How it works section */}
        <section className="py-16 px-4 bg-muted">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">How Flow Tasks Works</h2>
            
            <div className="space-y-12">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="md:w-1/2 order-2 md:order-1">
                  <h3 className="text-2xl font-semibold mb-4">Prioritize Tasks</h3>
                  <p className="text-muted-foreground mb-4">
                    Assign priority levels and time estimates to each task. Flow Tasks uses this information to organize your day optimally.
                  </p>
                </div>
                <div className="md:w-1/2 bg-card p-6 rounded-lg shadow-md order-1 md:order-2">
                  {/* Placeholder for image or illustration */}
                  <div className="aspect-video bg-gradient-to-r from-primary/20 to-primary/40 rounded-md flex items-center justify-center">
                    <p className="text-primary font-medium">Task Priority Interface</p>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="md:w-1/2 bg-card p-6 rounded-lg shadow-md">
                  {/* Placeholder for image or illustration */}
                  <div className="aspect-video bg-gradient-to-r from-primary/20 to-primary/40 rounded-md flex items-center justify-center">
                    <p className="text-primary font-medium">Energy Zone Configuration</p>
                  </div>
                </div>
                <div className="md:w-1/2">
                  <h3 className="text-2xl font-semibold mb-4">Set Energy Zones</h3>
                  <p className="text-muted-foreground mb-4">
                    Define your peak productivity periods. Flow Tasks will schedule high-priority tasks during your high-energy times.
                  </p>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="md:w-1/2 order-2 md:order-1">
                  <h3 className="text-2xl font-semibold mb-4">Sync with Google Calendar</h3>
                  <p className="text-muted-foreground mb-4">
                    Connect your Google Calendar to ensure tasks are scheduled around your existing commitments.
                  </p>
                </div>
                <div className="md:w-1/2 bg-card p-6 rounded-lg shadow-md order-1 md:order-2">
                  {/* Placeholder for image or illustration */}
                  <div className="aspect-video bg-gradient-to-r from-primary/20 to-primary/40 rounded-md flex items-center justify-center">
                    <p className="text-primary font-medium">Calendar Integration View</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-background border-t py-12 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
              <Calendar className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-xl font-semibold">Flow Tasks</h2>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-muted-foreground">© 2023 Flow Tasks. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
