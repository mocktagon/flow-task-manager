
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, 
  Calendar, 
  Clock, 
  BarChart, 
  CheckCircle, 
  Zap,
  Layers,
  BrainCircuit
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted/30">
      {/* Hero Section */}
      <header className="bg-background/80 backdrop-blur-sm sticky top-0 z-50 flex justify-between items-center px-6 py-4 border-b">
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
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="md:w-1/2 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Work smarter with your natural flow
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto md:mx-0">
                Flow Tasks intelligently reorganizes your to-do list around your calendar and energy levels, helping you accomplish more without burning out.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link to="/signup">
                  <Button size="lg" className="w-full sm:w-auto group">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Log In
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 mt-8 md:mt-0">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-xl blur-lg opacity-30"></div>
                <div className="relative bg-card rounded-xl overflow-hidden shadow-2xl border">
                  <div className="aspect-video bg-gradient-to-tr from-background to-muted flex items-center justify-center p-6">
                    <div className="w-full max-w-md glass-card rounded-lg p-4">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-medium">Today's Flow</h3>
                        <div className="text-sm text-muted-foreground">9:30 AM</div>
                      </div>
                      <div className="space-y-3">
                        <div className="time-block time-block-high animate-pulse-subtle">
                          <div className="flex justify-between">
                            <div className="font-medium">Finish project proposal</div>
                            <div className="priority-badge priority-high">High</div>
                          </div>
                        </div>
                        <div className="time-block time-block-medium">
                          <div className="flex justify-between">
                            <div className="font-medium">Client meeting</div>
                            <div className="priority-badge priority-medium">Medium</div>
                          </div>
                        </div>
                        <div className="time-block time-block-low">
                          <div className="flex justify-between">
                            <div className="font-medium">Review analytics</div>
                            <div className="priority-badge priority-low">Low</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features section */}
        <section className="py-16 px-4 bg-background">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Designed for your natural workflow</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Flow Tasks adapts to how you naturally work, not the other way around.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="overflow-hidden border-2 border-transparent hover:border-primary/20 transition-all duration-300">
                <CardContent className="pt-6">
                  <Calendar className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Calendar Integration</h3>
                  <p className="text-muted-foreground">Intelligently reorganize tasks around your Google Calendar events.</p>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden border-2 border-transparent hover:border-primary/20 transition-all duration-300">
                <CardContent className="pt-6">
                  <Zap className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Energy Zones</h3>
                  <p className="text-muted-foreground">Align high-priority tasks with your peak energy periods for maximum productivity.</p>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden border-2 border-transparent hover:border-primary/20 transition-all duration-300">
                <CardContent className="pt-6">
                  <Clock className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Built-in Timer</h3>
                  <p className="text-muted-foreground">Track time spent on tasks with a simple one-click timer system.</p>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden border-2 border-transparent hover:border-primary/20 transition-all duration-300">
                <CardContent className="pt-6">
                  <Layers className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Backlog Management</h3>
                  <p className="text-muted-foreground">Never lose track of incomplete tasks with smart backlog organization.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How it works section */}
        <section className="py-16 px-4 bg-gradient-to-b from-muted/50 to-background">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How Flow Tasks Works</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Optimize your productivity without the stress.
              </p>
            </div>
            
            <div className="space-y-12">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="md:w-1/2 order-2 md:order-1">
                  <div className="p-1 mb-4 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <BrainCircuit className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">Prioritize Tasks</h3>
                  <p className="text-muted-foreground mb-4">
                    Assign priority levels and time estimates to each task. Flow Tasks uses this information to organize your day optimally.
                  </p>
                </div>
                <div className="md:w-1/2 bg-card p-6 rounded-lg shadow-md order-1 md:order-2 border">
                  <div className="aspect-video bg-gradient-to-tr from-primary/5 to-primary/20 rounded-md flex items-center justify-center overflow-hidden">
                    <div className="w-full max-w-md p-4">
                      <div className="bg-background/80 backdrop-blur-sm rounded-lg p-4 shadow-sm">
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-priority-high"></div>
                            <p className="font-medium">High Priority</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-priority-medium"></div>
                            <p className="font-medium">Medium Priority</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-priority-low"></div>
                            <p className="font-medium">Low Priority</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="md:w-1/2 bg-card p-6 rounded-lg shadow-md border">
                  <div className="aspect-video bg-gradient-to-tr from-primary/5 to-primary/20 rounded-md flex items-center justify-center overflow-hidden">
                    <div className="w-full max-w-md p-4">
                      <div className="bg-background/80 backdrop-blur-sm rounded-lg p-4 shadow-sm">
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-energy-high"></div>
                            <p className="font-medium">High Energy (8am - 11am)</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-energy-medium"></div>
                            <p className="font-medium">Medium Energy (2pm - 4pm)</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-energy-low"></div>
                            <p className="font-medium">Low Energy (4pm - 6pm)</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="md:w-1/2">
                  <div className="p-1 mb-4 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <BarChart className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">Set Energy Zones</h3>
                  <p className="text-muted-foreground mb-4">
                    Define your peak productivity periods. Flow Tasks will schedule high-priority tasks during your high-energy times.
                  </p>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="md:w-1/2 order-2 md:order-1">
                  <div className="p-1 mb-4 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">Sync with Google Calendar</h3>
                  <p className="text-muted-foreground mb-4">
                    Connect your Google Calendar to ensure tasks are scheduled around your existing commitments.
                  </p>
                </div>
                <div className="md:w-1/2 bg-card p-6 rounded-lg shadow-md order-1 md:order-2 border">
                  <div className="aspect-video bg-gradient-to-tr from-primary/5 to-primary/20 rounded-md flex items-center justify-center overflow-hidden">
                    <div className="w-full max-w-md p-4">
                      <div className="bg-background/80 backdrop-blur-sm rounded-lg p-4 shadow-sm">
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-primary" />
                            <p className="font-medium">Weekly Team Meeting (10:00 AM)</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-primary" />
                            <p className="font-medium">Client Call (1:30 PM)</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-primary" />
                            <p className="font-medium">Project Review (3:00 PM)</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="py-20 px-4 bg-gradient-to-r from-primary/10 to-accent/10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to optimize your workflow?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who have transformed their productivity with Flow Tasks.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button size="lg" className="w-full sm:w-auto">
                  Get Started for Free
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
