
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, 
  Calendar, 
  Clock, 
  BarChart, 
  CheckCircle, 
  Zap,
  Layers,
  BrainCircuit,
  Sparkles,
  LineChart,
  Bot,
  Workflow
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="glass-card sticky top-0 z-50 flex justify-between items-center px-6 py-4 border-b border-accent/20">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
            <Calendar className="h-5 w-5 text-primary-foreground" />
          </div>
          <h1 className="text-xl font-semibold tracking-tight">
            <span className="ai-gradient-text">Flow Tasks</span>
          </h1>
        </div>
        <div className="flex gap-2">
          <Link to="/login">
            <Button variant="ghost" className="text-foreground/90 hover:text-foreground">Login</Button>
          </Link>
          <Link to="/signup">
            <Button className="ai-button-glow">Sign Up</Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero section */}
        <section className="py-24 px-4 ai-gradient-bg">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="md:w-1/2 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 glow-text">
                <span className="ai-gradient-text">Work smarter with your natural flow</span>
              </h1>
              <p className="text-xl text-foreground/80 mb-8 max-w-2xl mx-auto md:mx-0">
                Flow Tasks intelligently reorganizes your to-do list around your calendar and energy levels, 
                helping you accomplish more without burning out.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link to="/signup">
                  <Button size="lg" className="w-full sm:w-auto group ai-button-glow relative overflow-hidden">
                    <span className="relative z-10 flex items-center">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Button>
                </Link>
                <Link to="/login">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-accent/50 hover:bg-accent/30">
                    Log In
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 mt-8 md:mt-0">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-cyan-400 rounded-xl blur-xl opacity-30"></div>
                <div className="relative glow-border rounded-xl overflow-hidden">
                  <div className="aspect-video bg-gradient-to-tr from-accent/80 to-accent/30 flex items-center justify-center p-6">
                    <div className="w-full max-w-md glass-card rounded-lg p-4">
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="font-medium flex items-center gap-2">
                          <Sparkles className="h-4 w-4 text-primary" />
                          <span>Today's Flow</span>
                        </h3>
                        <div className="text-sm text-foreground/70">9:30 AM</div>
                      </div>
                      <div className="space-y-3">
                        <div className="time-block time-block-high animate-pulse-subtle bg-energy-high/20 backdrop-blur-sm">
                          <div className="flex justify-between">
                            <div className="font-medium flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-energy-high"></div>
                              Finish project proposal
                            </div>
                            <div className="priority-badge priority-high flex items-center gap-1">
                              <Zap className="h-3 w-3" />
                              High
                            </div>
                          </div>
                        </div>
                        <div className="time-block time-block-medium bg-energy-medium/20 backdrop-blur-sm">
                          <div className="flex justify-between">
                            <div className="font-medium flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-energy-medium"></div>
                              Client meeting
                            </div>
                            <div className="priority-badge priority-medium flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              Medium
                            </div>
                          </div>
                        </div>
                        <div className="time-block time-block-low bg-energy-low/20 backdrop-blur-sm">
                          <div className="flex justify-between">
                            <div className="font-medium flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-energy-low"></div>
                              Review analytics
                            </div>
                            <div className="priority-badge priority-low flex items-center gap-1">
                              <LineChart className="h-3 w-3" />
                              Low
                            </div>
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
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 glow-text">
                <span className="ai-gradient-text">Designed for your natural workflow</span>
              </h2>
              <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
                Flow Tasks adapts to how you naturally work, not the other way around.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="ai-card group">
                <CardContent className="pt-8 p-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Calendar Integration</h3>
                  <p className="text-foreground/70">Intelligently reorganize tasks around your Google Calendar events.</p>
                </CardContent>
              </Card>
              
              <Card className="ai-card group">
                <CardContent className="pt-8 p-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Energy Zones</h3>
                  <p className="text-foreground/70">Align high-priority tasks with your peak energy periods for maximum productivity.</p>
                </CardContent>
              </Card>
              
              <Card className="ai-card group">
                <CardContent className="pt-8 p-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Built-in Timer</h3>
                  <p className="text-foreground/70">Track time spent on tasks with a simple one-click timer system.</p>
                </CardContent>
              </Card>
              
              <Card className="ai-card group">
                <CardContent className="pt-8 p-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Layers className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Backlog Management</h3>
                  <p className="text-foreground/70">Never lose track of incomplete tasks with smart backlog organization.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How it works section */}
        <section className="py-20 px-4 bg-accent/20 backdrop-blur-md">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 glow-text">
                <span className="ai-gradient-text">How Flow Tasks Works</span>
              </h2>
              <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
                Optimize your productivity without the stress.
              </p>
            </div>
            
            <div className="space-y-16">
              <div className="flex flex-col md:flex-row gap-12 items-center">
                <div className="md:w-1/2 order-2 md:order-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-1 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <BrainCircuit className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-primary">STEP 1</span>
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">Prioritize Tasks</h3>
                  <p className="text-foreground/80 mb-4 leading-relaxed">
                    Assign priority levels and time estimates to each task. Flow Tasks uses this information to organize your day optimally.
                  </p>
                </div>
                <div className="md:w-1/2 order-1 md:order-2">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-cyan-400/30 rounded-xl blur-lg opacity-40"></div>
                    <Card className="glow-border overflow-hidden">
                      <CardContent className="p-6">
                        <div className="bg-accent/30 backdrop-blur-md rounded-md flex items-center justify-center p-6">
                          <div className="w-full space-y-4">
                            <div className="glass-card p-3 rounded-lg flex items-center gap-3">
                              <div className="w-4 h-4 rounded-full bg-priority-high"></div>
                              <p className="font-medium">High Priority Tasks</p>
                            </div>
                            <div className="glass-card p-3 rounded-lg flex items-center gap-3">
                              <div className="w-4 h-4 rounded-full bg-priority-medium"></div>
                              <p className="font-medium">Medium Priority Tasks</p>
                            </div>
                            <div className="glass-card p-3 rounded-lg flex items-center gap-3">
                              <div className="w-4 h-4 rounded-full bg-priority-low"></div>
                              <p className="font-medium">Low Priority Tasks</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
              
              <Separator className="bg-accent/30" />
              
              <div className="flex flex-col md:flex-row gap-12 items-center">
                <div className="md:w-1/2">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-cyan-400/30 rounded-xl blur-lg opacity-40"></div>
                    <Card className="glow-border overflow-hidden">
                      <CardContent className="p-6">
                        <div className="bg-accent/30 backdrop-blur-md rounded-md flex items-center justify-center p-6">
                          <div className="w-full space-y-4">
                            <div className="glass-card p-3 rounded-lg flex items-center gap-3">
                              <div className="w-4 h-4 rounded-full bg-energy-high"></div>
                              <p className="font-medium">High Energy (8am - 11am)</p>
                            </div>
                            <div className="glass-card p-3 rounded-lg flex items-center gap-3">
                              <div className="w-4 h-4 rounded-full bg-energy-medium"></div>
                              <p className="font-medium">Medium Energy (2pm - 4pm)</p>
                            </div>
                            <div className="glass-card p-3 rounded-lg flex items-center gap-3">
                              <div className="w-4 h-4 rounded-full bg-energy-low"></div>
                              <p className="font-medium">Low Energy (4pm - 6pm)</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                <div className="md:w-1/2">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-1 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <BarChart className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-primary">STEP 2</span>
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">Set Energy Zones</h3>
                  <p className="text-foreground/80 mb-4 leading-relaxed">
                    Define your peak productivity periods. Flow Tasks will schedule high-priority tasks during your high-energy times.
                  </p>
                </div>
              </div>
              
              <Separator className="bg-accent/30" />
              
              <div className="flex flex-col md:flex-row gap-12 items-center">
                <div className="md:w-1/2 order-2 md:order-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-1 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-primary">STEP 3</span>
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">Sync with Google Calendar</h3>
                  <p className="text-foreground/80 mb-4 leading-relaxed">
                    Connect your Google Calendar to ensure tasks are scheduled around your existing commitments.
                  </p>
                </div>
                <div className="md:w-1/2 order-1 md:order-2">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-cyan-400/30 rounded-xl blur-lg opacity-40"></div>
                    <Card className="glow-border overflow-hidden">
                      <CardContent className="p-6">
                        <div className="bg-accent/30 backdrop-blur-md rounded-md flex items-center justify-center p-6">
                          <div className="w-full space-y-4">
                            <div className="glass-card p-3 rounded-lg flex items-center gap-3">
                              <Calendar className="h-4 w-4 text-primary" />
                              <p className="font-medium">Weekly Team Meeting (10:00 AM)</p>
                            </div>
                            <div className="glass-card p-3 rounded-lg flex items-center gap-3">
                              <Calendar className="h-4 w-4 text-primary" />
                              <p className="font-medium">Client Call (1:30 PM)</p>
                            </div>
                            <div className="glass-card p-3 rounded-lg flex items-center gap-3">
                              <Calendar className="h-4 w-4 text-primary" />
                              <p className="font-medium">Project Review (3:00 PM)</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
              
              <Separator className="bg-accent/30" />
              
              <div className="flex flex-col md:flex-row gap-12 items-center">
                <div className="md:w-1/2">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-cyan-400/30 rounded-xl blur-lg opacity-40"></div>
                    <Card className="glow-border overflow-hidden">
                      <CardContent className="p-6">
                        <div className="bg-accent/30 backdrop-blur-md rounded-md flex items-center justify-center p-6">
                          <div className="w-full space-y-4">
                            <div className="glass-card p-3 rounded-lg flex items-center gap-3">
                              <Bot className="h-4 w-4 text-primary" />
                              <p className="font-medium">AI Optimized Schedule</p>
                            </div>
                            <div className="glass-card p-3 rounded-lg flex items-center gap-3">
                              <Workflow className="h-4 w-4 text-primary" />
                              <p className="font-medium">Smart Task Distribution</p>
                            </div>
                            <div className="glass-card p-3 rounded-lg flex items-center gap-3">
                              <Sparkles className="h-4 w-4 text-primary" />
                              <p className="font-medium">Personalized Focus Periods</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                <div className="md:w-1/2">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-1 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <Sparkles className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-primary">STEP 4</span>
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">Let AI Optimize Your Day</h3>
                  <p className="text-foreground/80 mb-4 leading-relaxed">
                    Flow Tasks' AI engine arranges your tasks into an optimal schedule that respects your energy levels, priorities, and calendar commitments.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="py-20 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-cyan-500/5"></div>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 glow-text">
              <span className="ai-gradient-text">Ready to optimize your workflow?</span>
            </h2>
            <p className="text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who have transformed their productivity with Flow Tasks.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button size="lg" className="w-full sm:w-auto ai-button-glow group">
                  <span className="relative z-10 flex items-center">
                    Get Started for Free
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-accent/50 hover:bg-accent/30">
                  Log In
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-accent/30 backdrop-blur-md py-12 px-4 border-t border-accent/20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
              <Calendar className="h-5 w-5 text-primary-foreground" />
            </div>
            <h2 className="text-xl font-semibold ai-gradient-text">Flow Tasks</h2>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-foreground/60">© 2023 Flow Tasks. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
