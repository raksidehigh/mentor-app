import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Users, Calendar, MessageSquare, DollarSign, TrendingUp, Clock, Star, 
  Eye, Briefcase, User as UserIcon, ArrowUpRight, CheckCircle, XCircle, 
  AlertCircle, Plus, Video, PlayCircle, BookOpen, Gift, ExternalLink,
  CreditCard, Wallet, Target, Award, Timer, BarChart3
} from 'lucide-react';

const mockStats = {
  totalStudents: 47,
  activeBookings: 12,
  monthlyEarnings: 4850,
  totalEarnings: 28400,
  avgRating: 4.9,
  totalSessions: 156,
  totalMinutes: 9340,
  responseRate: 98,
  completionRate: 96,
  referralEarnings: 1200,
  pendingPayouts: 2400
};

const mockSessions = [
  {
    id: '1',
    studentName: 'Sarah Johnson',
    avatar: '/assets/student-1.png',
    topic: 'Career Transition Strategy',
    date: '2024-10-09',
    time: '2:00 PM',
    duration: 60,
    status: 'upcoming',
    amount: 120,
    type: 'video'
  },
  {
    id: '2',
    studentName: 'Mike Chen',
    avatar: '/assets/student-2.png',
    topic: 'Technical Interview Prep',
    date: '2024-10-08',
    time: '4:30 PM',
    duration: 90,
    status: 'completed',
    amount: 180,
    rating: 5,
    type: 'video'
  }
];

const mockReferrals = [
  {
    id: '1',
    studentName: 'Alex Rodriguez',
    status: 'scholar_program',
    earnings: 500,
    date: '2024-10-05'
  },
  {
    id: '2',
    studentName: 'Emma Wilson',
    status: 'first_session',
    earnings: 25,
    date: '2024-10-07'
  }
];

const MentorDashboard = () => {
  const [selectedTab, setSelectedTab] = useState('overview');
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'rescheduled': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStartSession = () => {
    navigate('/session/123');
  };

  const handleJoinSession = (sessionId: string) => {
    navigate(`/session/${sessionId}`);
  };

  const handleViewAll = (section: string) => {
    setSelectedTab(section);
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'messages':
        navigate('/messages');
        break;
      case 'availability':
        navigate('/availability');
        break;
      case 'referrals':
        setSelectedTab('referrals');
        break;
      case 'training':
        navigate('/training');
        break;
      case 'join-session':
        handleStartSession();
        break;
      default:
        break;
    }
  };

  const copyReferralLink = () => {
    navigator.clipboard.writeText('https://edumentor.io/ref/john-doe');
    // You could add a toast notification here
  };

  const handlePayoutRequest = () => {
    // Add payout request logic
    alert('Payout request submitted!');
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-6 page-enter">
      {/* Welcome Section */}
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 content-enter">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">Welcome back, John!</h1>
            <p className="text-muted-foreground">Manage your mentoring sessions and grow your impact.</p>
          </div>
          <Button className="w-fit button-scale" onClick={handleStartSession}>
            <Video className="h-4 w-4 mr-2" />
            Start Session
          </Button>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="card-hover card-enter stagger-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${mockStats.totalEarnings.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+${mockStats.monthlyEarnings} this month</span>
            </p>
          </CardContent>
        </Card>

        <Card className="card-hover card-enter stagger-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Session Minutes</CardTitle>
            <Timer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.totalMinutes.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Across {mockStats.totalSessions} sessions
            </p>
          </CardContent>
        </Card>

        <Card className="card-hover card-enter stagger-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center">
              {mockStats.avgRating}
              <Star className="h-5 w-5 text-yellow-400 fill-current ml-1" />
            </div>
            <p className="text-xs text-muted-foreground">Based on 89 reviews</p>
          </CardContent>
        </Card>

        <Card className="card-hover card-enter stagger-4">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.totalStudents}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-blue-600">{mockStats.activeBookings} upcoming sessions</span>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <div className="overflow-x-auto">
          <TabsList className="grid w-full grid-cols-4 min-w-[400px] lg:min-w-0">
            <TabsTrigger value="overview" className="text-xs lg:text-sm">Overview</TabsTrigger>
            <TabsTrigger value="sessions" className="text-xs lg:text-sm">Sessions</TabsTrigger>
            <TabsTrigger value="payments" className="text-xs lg:text-sm">Payments</TabsTrigger>
            <TabsTrigger value="referrals" className="text-xs lg:text-sm">Referrals</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview" className="space-y-4 content-enter">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Performance Metrics */}
            <Card className="xl:col-span-2 card-hover card-enter stagger-1">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Performance Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Progress Bars */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Response Rate</span>
                      <span className="text-sm font-bold text-blue-600">{mockStats.responseRate}%</span>
                    </div>
                    <Progress value={mockStats.responseRate} className="h-3 transition-all duration-1000" />
                    <p className="text-xs text-muted-foreground">Excellent response time</p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Completion Rate</span>
                      <span className="text-sm font-bold text-green-600">{mockStats.completionRate}%</span>
                    </div>
                    <Progress value={mockStats.completionRate} className="h-3 transition-all duration-1000" />
                    <p className="text-xs text-muted-foreground">Above average completion</p>
                  </div>
                </div>
                
                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t">
                  <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-100 hover-scale">
                    <div className="text-2xl lg:text-3xl font-bold text-blue-600 mb-1">{mockStats.totalSessions}</div>
                    <div className="text-sm text-blue-700 font-medium">Total Sessions</div>
                    <div className="text-xs text-blue-600 mt-1">+12 this month</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg border border-green-100 hover-scale">
                    <div className="text-2xl lg:text-3xl font-bold text-green-600 mb-1">${mockStats.referralEarnings}</div>
                    <div className="text-sm text-green-700 font-medium">Referral Earnings</div>
                    <div className="text-xs text-green-600 mt-1">+$300 this month</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-100 hover-scale">
                    <div className="text-2xl lg:text-3xl font-bold text-purple-600 mb-1">{Math.round(mockStats.totalMinutes / mockStats.totalSessions)}</div>
                    <div className="text-sm text-purple-700 font-medium">Avg Session (min)</div>
                    <div className="text-xs text-purple-600 mt-1">Optimal duration</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="card-hover card-enter stagger-2">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start button-scale" variant="outline" onClick={() => handleQuickAction('join-session')}>
                  <Video className="h-4 w-4 mr-2" />
                  Join Next Session
                </Button>
                <Button className="w-full justify-start button-scale" variant="outline" onClick={() => handleQuickAction('messages')}>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Check Messages (5)
                </Button>
                <Button className="w-full justify-start button-scale" variant="outline" onClick={() => handleQuickAction('availability')}>
                  <Calendar className="h-4 w-4 mr-2" />
                  Update Availability
                </Button>
                <Button className="w-full justify-start button-scale" variant="outline" onClick={() => handleQuickAction('referrals')}>
                  <Gift className="h-4 w-4 mr-2" />
                  Refer Students
                </Button>
                <Button className="w-full justify-start button-scale" variant="outline" onClick={() => handleQuickAction('training')}>
                  <BookOpen className="h-4 w-4 mr-2" />
                  Training Materials
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Recent Sessions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Recent Sessions
                <Button variant="outline" size="sm" onClick={() => handleViewAll('sessions')}>View All</Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockSessions.map((session) => (
                  <div key={session.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg space-y-3 sm:space-y-0">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={session.avatar} />
                        <AvatarFallback>{session.studentName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{session.studentName}</p>
                        <p className="text-sm text-muted-foreground">{session.topic}</p>
                        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mt-1">
                          <span>{session.date}</span>
                          <span className="hidden sm:inline">•</span>
                          <span>{session.time}</span>
                          <span className="hidden sm:inline">•</span>
                          <span>{session.duration} min</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end space-x-3">
                      <div className="text-left sm:text-right">
                        <p className="font-medium">${session.amount}</p>
                        <Badge className={getStatusColor(session.status)}>
                          {session.status}
                        </Badge>
                        {session.rating && (
                          <div className="flex items-center mt-1">
                            <Star className="h-3 w-3 text-yellow-400 fill-current" />
                            <span className="text-xs ml-1">{session.rating}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sessions" className="space-y-4 content-enter">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
            <Card className="card-enter stagger-1">
              <CardContent className="pt-6">
                <div className="text-center">
                  <Calendar className="h-8 w-8 mx-auto text-blue-500 mb-2" />
                  <div className="text-2xl font-bold">{mockStats.activeBookings}</div>
                  <div className="text-sm text-muted-foreground">Upcoming</div>
                </div>
              </CardContent>
            </Card>
            <Card className="card-enter stagger-2">
              <CardContent className="pt-6">
                <div className="text-center">
                  <CheckCircle className="h-8 w-8 mx-auto text-green-500 mb-2" />
                  <div className="text-2xl font-bold">{mockStats.totalSessions - mockStats.activeBookings}</div>
                  <div className="text-sm text-muted-foreground">Completed</div>
                </div>
              </CardContent>
            </Card>
            <Card className="card-enter stagger-3">
              <CardContent className="pt-6">
                <div className="text-center">
                  <Clock className="h-8 w-8 mx-auto text-yellow-500 mb-2" />
                  <div className="text-2xl font-bold">3</div>
                  <div className="text-sm text-muted-foreground">Rescheduled</div>
                </div>
              </CardContent>
            </Card>
            <Card className="card-enter stagger-4">
              <CardContent className="pt-6">
                <div className="text-center">
                  <XCircle className="h-8 w-8 mx-auto text-red-500 mb-2" />
                  <div className="text-2xl font-bold">2</div>
                  <div className="text-sm text-muted-foreground">Cancelled</div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="card-hover card-enter stagger-5">
            <CardHeader>
              <CardTitle>Session Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockSessions.map((session, index) => (
                  <div key={session.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg space-y-3 sm:space-y-0 hover-scale">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={session.avatar} />
                        <AvatarFallback>{session.studentName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{session.studentName}</p>
                        <p className="text-sm text-muted-foreground">{session.topic}</p>
                        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mt-1">
                          <span>{session.date} at {session.time}</span>
                          <span className="hidden sm:inline">•</span>
                          <span>{session.duration} minutes</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      {session.status === 'upcoming' && (
                        <>
                          <Button size="sm" onClick={() => handleJoinSession(session.id)} className="button-scale">
                            <Video className="h-4 w-4 mr-1" />
                            Join
                          </Button>
                          <Button size="sm" variant="outline" className="button-scale">Reschedule</Button>
                        </>
                      )}
                      {session.status === 'completed' && (
                        <Badge className="bg-green-100 text-green-800">
                          Completed • ${session.amount}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-4 content-enter">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="card-hover card-enter stagger-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Available Balance</CardTitle>
                <Wallet className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${mockStats.pendingPayouts}</div>
                <p className="text-xs text-muted-foreground">Ready for withdrawal</p>
              </CardContent>
            </Card>
            <Card className="card-hover card-enter stagger-2">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">This Month</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${mockStats.monthlyEarnings}</div>
                <p className="text-xs text-muted-foreground">+18% from last month</p>
              </CardContent>
            </Card>
            <Card className="card-hover card-enter stagger-3">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Hourly Rate</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$120</div>
                <p className="text-xs text-muted-foreground">Average per hour</p>
              </CardContent>
            </Card>
          </div>

          <Card className="card-hover card-enter stagger-4">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Payment Settings
                <Button onClick={handlePayoutRequest} className="button-scale">Request Payout</Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border rounded-lg hover-scale">
                <h4 className="font-medium mb-2">Payout Method</h4>
                <p className="text-sm text-muted-foreground mb-3">Bank Transfer (USD) • ****1234</p>
                <Button variant="outline" size="sm" className="button-scale">Update Payment Method</Button>
              </div>
              <div className="p-4 border rounded-lg hover-scale">
                <h4 className="font-medium mb-2">Minimum Payout Threshold</h4>
                <p className="text-sm text-muted-foreground mb-3">$500 - You'll receive payments once you reach this amount</p>
                <Progress value={(mockStats.pendingPayouts / 500) * 100} className="h-2 transition-all duration-1000" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="referrals" className="space-y-4 content-enter">
          {/* Enhanced Referral System */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 card-hover card-enter stagger-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Referral Earnings</CardTitle>
                <Gift className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-700">${mockStats.referralEarnings}</div>
                <p className="text-xs text-green-600">+$300 this month</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200 card-hover card-enter stagger-2">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Referrals</CardTitle>
                <Users className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-700">12</div>
                <p className="text-xs text-blue-600">Students referred</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200 card-hover card-enter stagger-3">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                <Target className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-700">68%</div>
                <p className="text-xs text-purple-600">Above average</p>
              </CardContent>
            </Card>
          </div>

          {/* Referral Tools */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="card-hover card-enter stagger-4">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ExternalLink className="h-5 w-5 mr-2" />
                  Referral Tools
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Your Referral Link</label>
                  <div className="flex items-center space-x-2">
                    <code className="text-sm bg-muted px-3 py-2 rounded flex-1">https://edumentor.io/ref/john-doe</code>
                    <Button size="sm" variant="outline" onClick={copyReferralLink} className="button-scale">Copy</Button>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Share via Social Media</label>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="flex-1 button-scale">Twitter</Button>
                    <Button size="sm" variant="outline" className="flex-1 button-scale">LinkedIn</Button>
                    <Button size="sm" variant="outline" className="flex-1 button-scale">WhatsApp</Button>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Email Template</label>
                  <Button variant="outline" className="w-full button-scale">Generate Email Template</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover card-enter stagger-5">
              <CardHeader>
                <CardTitle>Referral Program Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="p-4 border rounded-lg bg-green-50 border-green-200 hover-scale">
                    <div className="flex items-center mb-2">
                      <Award className="h-6 w-6 text-green-600 mr-2" />
                      <h4 className="font-semibold text-green-800">Scholar Program Referral</h4>
                    </div>
                    <p className="text-sm text-green-700 mb-2">Earn $500 when your referred student joins our scholar program</p>
                    <Badge className="bg-green-600 text-white">High Reward</Badge>
                  </div>
                  
                  <div className="p-4 border rounded-lg bg-blue-50 border-blue-200 hover-scale">
                    <div className="flex items-center mb-2">
                      <Users className="h-6 w-6 text-blue-600 mr-2" />
                      <h4 className="font-semibold text-blue-800">First Session Referral</h4>
                    </div>
                    <p className="text-sm text-blue-700 mb-2">Earn $25 when your referred student books their first session</p>
                    <Badge className="bg-blue-600 text-white">Quick Reward</Badge>
                  </div>

                  <div className="p-4 border rounded-lg bg-purple-50 border-purple-200 hover-scale">
                    <div className="flex items-center mb-2">
                      <Star className="h-6 w-6 text-purple-600 mr-2" />
                      <h4 className="font-semibold text-purple-800">Bonus Tiers</h4>
                    </div>
                    <p className="text-sm text-purple-700 mb-2">Refer 10+ students and get 20% bonus on all future referrals</p>
                    <Badge className="bg-purple-600 text-white">Tier Bonus</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Referrals */}
          <Card className="card-hover card-enter stagger-1">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Recent Referrals
                <Button variant="outline" size="sm" className="button-scale">View All</Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockReferrals.map((referral, index) => (
                  <div key={referral.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg space-y-2 sm:space-y-0 hover-scale">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarFallback>{referral.studentName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{referral.studentName}</p>
                        <p className="text-sm text-muted-foreground">{referral.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end space-x-4">
                      <Badge className={referral.status === 'scholar_program' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}>
                        {referral.status === 'scholar_program' ? 'Scholar Program' : 'First Session'}
                      </Badge>
                      <div className="text-right">
                        <p className="font-bold text-green-600">+${referral.earnings}</p>
                        <p className="text-xs text-muted-foreground">Earned</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Referral Analytics */}
          <Card className="card-hover card-enter stagger-2">
            <CardHeader>
              <CardTitle>Referral Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 border rounded-lg hover-scale">
                  <div className="text-2xl font-bold text-blue-600">24</div>
                  <div className="text-sm text-muted-foreground">Total Referrals</div>
                </div>
                <div className="text-center p-4 border rounded-lg hover-scale">
                  <div className="text-2xl font-bold text-green-600">16</div>
                  <div className="text-sm text-muted-foreground">Successful</div>
                </div>
                <div className="text-center p-4 border rounded-lg hover-scale">
                  <div className="text-2xl font-bold text-purple-600">8</div>
                  <div className="text-sm text-muted-foreground">Pending</div>
                </div>
                <div className="text-center p-4 border rounded-lg hover-scale">
                  <div className="text-2xl font-bold text-orange-600">$1,200</div>
                  <div className="text-sm text-muted-foreground">Total Earned</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>
    </div>
  );
};

export default MentorDashboard;
