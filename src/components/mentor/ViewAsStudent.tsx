import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Star, MapPin, Calendar, Clock, DollarSign, 
  MessageSquare, Video, ArrowLeft, Users, Award
} from 'lucide-react';

interface ViewAsStudentProps {
  onBack: () => void;
}

export function ViewAsStudent({ onBack }: ViewAsStudentProps) {
  const mentorProfile = {
    name: "John Doe",
    title: "Senior Software Engineer & Career Coach",
    avatar: "/assets/mentor-avatar.png",
    rating: 4.9,
    reviewCount: 89,
    location: "San Francisco, CA",
    experience: "8+ years",
    hourlyRate: 120,
    responseTime: "Within 2 hours",
    completedSessions: 156,
    bio: "Passionate software engineer with 8+ years of experience at top tech companies including Google and Meta. I specialize in helping developers advance their careers, ace technical interviews, and transition into senior roles.",
    expertise: ["Career Development", "Technical Interviews", "System Design", "Leadership", "Code Review"],
    languages: ["English", "Spanish"],
    availability: "Mon-Fri: 9 AM - 6 PM PST"
  };

  return (
    <div className="min-h-screen bg-background page-enter">
      {/* Header */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-4 content-enter">
          <Button variant="ghost" onClick={onBack} className="mb-4 button-scale">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 card-enter stagger-1">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm font-medium text-blue-800">Student View Mode</span>
            </div>
            <p className="text-sm text-blue-700 mt-1">
              This is how students see your profile. Use this view to optimize your profile for better bookings.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Profile */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Header */}
            <Card className="card-hover card-enter stagger-2">
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={mentorProfile.avatar} />
                    <AvatarFallback className="text-2xl">JD</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h1 className="text-2xl font-bold mb-2">{mentorProfile.name}</h1>
                    <p className="text-lg text-muted-foreground mb-3">{mentorProfile.title}</p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                        <span className="font-medium">{mentorProfile.rating}</span>
                        <span className="ml-1">({mentorProfile.reviewCount} reviews)</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {mentorProfile.location}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {mentorProfile.completedSessions} sessions
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {mentorProfile.expertise.slice(0, 3).map((skill) => (
                        <Badge key={skill} variant="secondary">{skill}</Badge>
                      ))}
                      {mentorProfile.expertise.length > 3 && (
                        <Badge variant="outline">+{mentorProfile.expertise.length - 3} more</Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* About */}
            <Card className="card-hover card-enter stagger-3">
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{mentorProfile.bio}</p>
              </CardContent>
            </Card>

            {/* Expertise */}
            <Card className="card-hover card-enter stagger-4">
              <CardHeader>
                <CardTitle>Areas of Expertise</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {mentorProfile.expertise.map((skill) => (
                    <div key={skill} className="flex items-center p-3 border rounded-lg hover-scale">
                      <Award className="h-4 w-4 text-primary mr-2" />
                      <span className="text-sm font-medium">{skill}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Reviews Preview */}
            <Card className="card-hover card-enter stagger-5">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Reviews ({mentorProfile.reviewCount})
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400 fill-current mr-1" />
                    <span className="font-bold">{mentorProfile.rating}</span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Sample Reviews */}
                  <div className="border-l-4 border-primary pl-4 hover-scale">
                    <div className="flex items-center mb-2">
                      <div className="flex">
                        {[1,2,3,4,5].map((star) => (
                          <Star key={star} className="h-4 w-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-muted-foreground">Sarah J.</span>
                    </div>
                    <p className="text-sm">"Excellent career guidance! John helped me land my dream job at a FAANG company."</p>
                  </div>
                  <div className="border-l-4 border-primary pl-4 hover-scale">
                    <div className="flex items-center mb-2">
                      <div className="flex">
                        {[1,2,3,4,5].map((star) => (
                          <Star key={star} className="h-4 w-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-muted-foreground">Mike C.</span>
                    </div>
                    <p className="text-sm">"Great technical interview prep. Very knowledgeable and patient."</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Sidebar */}
          <div className="space-y-4">
            {/* Booking Card */}
            <Card className="sticky top-4 card-hover card-enter stagger-1">
              <CardContent className="pt-6">
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Response time:</span>
                    <span className="font-medium">{mentorProfile.responseTime}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Languages:</span>
                    <span className="font-medium">{mentorProfile.languages.join(", ")}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Availability:</span>
                    <span className="font-medium text-green-600">Available</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button className="w-full button-scale" size="lg">
                    <Calendar className="h-4 w-4 mr-2" />
                    Book Session
                  </Button>
                  <Button variant="outline" className="w-full button-scale">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                  <Button variant="outline" className="w-full button-scale">
                    <Video className="h-4 w-4 mr-2" />
                    Quick Call
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="card-hover card-enter stagger-2">
              <CardHeader>
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Sessions:</span>
                  <span className="font-medium">{mentorProfile.completedSessions}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Experience:</span>
                  <span className="font-medium">{mentorProfile.experience}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Rating:</span>
                  <div className="flex items-center">
                    <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
                    <span className="font-medium">{mentorProfile.rating}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Availability */}
            <Card className="card-hover card-enter stagger-3">
              <CardHeader>
                <CardTitle className="text-lg">Availability</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm">
                  <div className="flex items-center mb-2">
                    <Clock className="h-4 w-4 text-green-500 mr-2" />
                    <span className="font-medium">Available Now</span>
                  </div>
                  <p className="text-muted-foreground">{mentorProfile.availability}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
