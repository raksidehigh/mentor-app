import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  PlayCircle, BookOpen, Award, Clock, CheckCircle, 
  Lock, Download, FileText, Video, Headphones, Star
} from 'lucide-react';

interface TrainingModule {
  id: string;
  title: string;
  description: string;
  duration: number;
  type: 'video' | 'document' | 'audio';
  status: 'completed' | 'in_progress' | 'locked' | 'available';
  progress: number;
  category: string;
  isRequired: boolean;
  rating?: number;
  thumbnail?: string;
}

const mockTrainingModules: TrainingModule[] = [
  {
    id: '1',
    title: 'Platform Overview & Getting Started',
    description: 'Learn the basics of our mentoring platform, navigation, and key features.',
    duration: 15,
    type: 'video',
    status: 'completed',
    progress: 100,
    category: 'basics',
    isRequired: true,
    rating: 4.8,
    thumbnail: '/assets/training-1.jpg'
  },
  {
    id: '2',
    title: 'Effective Mentoring Techniques',
    description: 'Best practices for conducting successful mentoring sessions and building rapport.',
    duration: 25,
    type: 'video',
    status: 'in_progress',
    progress: 60,
    category: 'skills',
    isRequired: true,
    rating: 4.9,
    thumbnail: '/assets/training-2.jpg'
  },
  {
    id: '3',
    title: 'Scholar Program Guidelines',
    description: 'Understanding the scholar program, eligibility criteria, and referral process.',
    duration: 20,
    type: 'video',
    status: 'available',
    progress: 0,
    category: 'programs',
    isRequired: false,
    rating: 4.7,
    thumbnail: '/assets/training-3.jpg'
  },
  {
    id: '4',
    title: 'Payment & Earnings Guide',
    description: 'How payments work, payout schedules, and maximizing your earnings.',
    duration: 12,
    type: 'document',
    status: 'available',
    progress: 0,
    category: 'business',
    isRequired: true,
    thumbnail: '/assets/training-4.jpg'
  },
  {
    id: '5',
    title: 'Advanced Session Management',
    description: 'Managing complex sessions, handling difficult situations, and technical troubleshooting.',
    duration: 30,
    type: 'video',
    status: 'locked',
    progress: 0,
    category: 'advanced',
    isRequired: false,
    thumbnail: '/assets/training-5.jpg'
  }
];

const categories = [
  { id: 'all', name: 'All Modules', count: mockTrainingModules.length },
  { id: 'basics', name: 'Getting Started', count: 1 },
  { id: 'skills', name: 'Mentoring Skills', count: 1 },
  { id: 'programs', name: 'Programs', count: 1 },
  { id: 'business', name: 'Business', count: 1 },
  { id: 'advanced', name: 'Advanced', count: 1 }
];

export function TrainingCenter() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedModule, setSelectedModule] = useState<TrainingModule | null>(null);

  const filteredModules = selectedCategory === 'all' 
    ? mockTrainingModules 
    : mockTrainingModules.filter(module => module.category === selectedCategory);

  const completedModules = mockTrainingModules.filter(m => m.status === 'completed').length;
  const totalProgress = Math.round((completedModules / mockTrainingModules.length) * 100);

  const handleModuleAction = (module: TrainingModule) => {
    if (module.status === 'locked') return;
    
    // Simulate starting/continuing module
    alert(`${module.status === 'completed' ? 'Rewatching' : 'Starting'}: ${module.title}`);
  };

  const handleDownload = (module: TrainingModule) => {
    // Simulate download
    alert(`Downloading: ${module.title}.pdf`);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'in_progress': return <PlayCircle className="h-4 w-4 text-blue-500" />;
      case 'locked': return <Lock className="h-4 w-4 text-gray-400" />;
      default: return <PlayCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="h-4 w-4" />;
      case 'audio': return <Headphones className="h-4 w-4" />;
      case 'document': return <FileText className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'locked': return 'bg-gray-100 text-gray-600';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-6 page-enter">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 content-enter">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Training Center</h1>
          <p className="text-muted-foreground">Enhance your mentoring skills with our comprehensive training materials.</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{completedModules}/{mockTrainingModules.length}</div>
            <div className="text-sm text-muted-foreground">Completed</div>
          </div>
          <div className="w-24">
            <Progress value={totalProgress} className="h-2 transition-all duration-1000" />
            <div className="text-xs text-center mt-1">{totalProgress}%</div>
          </div>
        </div>
      </div>

      {/* Achievement Banner */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 card-hover card-enter stagger-1">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Award className="h-8 w-8 text-blue-600" />
              <div>
                <h3 className="font-semibold text-blue-900">Certification Progress</h3>
                <p className="text-sm text-blue-700">Complete all required modules to earn your Mentor Certification</p>
              </div>
            </div>
            <Badge className="bg-blue-600 text-white">
              {completedModules}/4 Required
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          {categories.map((category) => (
            <TabsTrigger key={category.id} value={category.id} className="text-xs">
              {category.name}
              <Badge variant="secondary" className="ml-1 text-xs">
                {category.count}
              </Badge>
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Module List */}
          <div className="lg:col-span-2 space-y-4">
            {filteredModules.map((module, index) => (
              <Card 
                key={module.id} 
                className={`cursor-pointer card-hover card-enter ${
                  selectedModule?.id === module.id ? 'ring-2 ring-primary' : ''
                } ${module.status === 'locked' ? 'opacity-60' : ''}`}
                style={{animationDelay: `${0.2 + index * 0.1}s`}}
                onClick={() => module.status !== 'locked' && setSelectedModule(module)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                      {getTypeIcon(module.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1 flex items-center">
                            {module.title}
                            {module.isRequired && (
                              <Badge variant="outline" className="ml-2 text-xs">Required</Badge>
                            )}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-2">{module.description}</p>
                          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                            <div className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {module.duration} min
                            </div>
                            {module.rating && (
                              <div className="flex items-center">
                                <Star className="h-3 w-3 mr-1 text-yellow-400 fill-current" />
                                {module.rating}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          {getStatusIcon(module.status)}
                          <Badge className={getStatusColor(module.status)}>
                            {module.status.replace('_', ' ')}
                          </Badge>
                        </div>
                      </div>
                      {module.progress > 0 && (
                        <div className="mt-3">
                          <Progress value={module.progress} className="h-1 transition-all duration-1000" />
                          <div className="text-xs text-muted-foreground mt-1">{module.progress}% complete</div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Module Details */}
          <div className="space-y-4">
            {selectedModule ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    {getTypeIcon(selectedModule.type)}
                    <span className="ml-2">{selectedModule.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                    <PlayCircle className="h-12 w-12 text-gray-400" />
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground mb-3">{selectedModule.description}</p>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Duration:</span>
                        <span>{selectedModule.duration} minutes</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Type:</span>
                        <span className="capitalize">{selectedModule.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Status:</span>
                        <Badge className={getStatusColor(selectedModule.status)}>
                          {selectedModule.status.replace('_', ' ')}
                        </Badge>
                      </div>
                      {selectedModule.rating && (
                        <div className="flex justify-between">
                          <span>Rating:</span>
                          <div className="flex items-center">
                            <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
                            {selectedModule.rating}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    {selectedModule.status === 'completed' ? (
                      <Button className="w-full" onClick={() => handleModuleAction(selectedModule)}>
                        <PlayCircle className="h-4 w-4 mr-2" />
                        Rewatch
                      </Button>
                    ) : selectedModule.status === 'in_progress' ? (
                      <Button className="w-full" onClick={() => handleModuleAction(selectedModule)}>
                        <PlayCircle className="h-4 w-4 mr-2" />
                        Continue
                      </Button>
                    ) : selectedModule.status === 'available' ? (
                      <Button className="w-full" onClick={() => handleModuleAction(selectedModule)}>
                        <PlayCircle className="h-4 w-4 mr-2" />
                        Start Module
                      </Button>
                    ) : (
                      <Button className="w-full" disabled>
                        <Lock className="h-4 w-4 mr-2" />
                        Locked
                      </Button>
                    )}
                    
                    {selectedModule.type === 'document' && (
                      <Button variant="outline" className="w-full" onClick={() => handleDownload(selectedModule)}>
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="font-semibold mb-2">Select a Module</h3>
                    <p className="text-muted-foreground text-sm">Choose a training module to view details and start learning</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Your Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Modules Completed:</span>
                  <span className="font-medium">{completedModules}/{mockTrainingModules.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Total Watch Time:</span>
                  <span className="font-medium">45 minutes</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Certification Progress:</span>
                  <span className="font-medium">{Math.round((completedModules / 4) * 100)}%</span>
                </div>
                <Progress value={(completedModules / mockTrainingModules.length) * 100} className="h-2" />
              </CardContent>
            </Card>
          </div>
        </div>
      </Tabs>
    </div>
  );
}
