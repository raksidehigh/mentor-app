import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Video, VideoOff, Mic, MicOff, Monitor, MessageSquare, 
  Phone, Settings, Users, Clock, AlertTriangle, CheckCircle
} from 'lucide-react';

interface SessionExperienceProps {
  sessionId: string;
  studentName: string;
  studentAvatar: string;
  topic: string;
  duration: number;
  onEndSession: () => void;
}

export function SessionExperience({ 
  sessionId, 
  studentName, 
  studentAvatar, 
  topic, 
  duration,
  onEndSession 
}: SessionExperienceProps) {
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const [connectionStatus, setConnectionStatus] = useState<'good' | 'poor' | 'reconnecting'>('good');

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getConnectionColor = () => {
    switch (connectionStatus) {
      case 'good': return 'text-green-500';
      case 'poor': return 'text-yellow-500';
      case 'reconnecting': return 'text-red-500';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gray-800">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={studentAvatar} />
            <AvatarFallback>{studentName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold">{studentName}</h2>
            <p className="text-sm text-gray-300">{topic}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4" />
            <span className="text-sm">{formatTime(sessionTime)}</span>
          </div>
          <div className={`flex items-center space-x-1 ${getConnectionColor()}`}>
            <div className="w-2 h-2 rounded-full bg-current"></div>
            <span className="text-xs capitalize">{connectionStatus}</span>
          </div>
        </div>
      </div>

      {/* Main Video Area */}
      <div className="flex-1 relative">
        <div className="grid grid-cols-1 lg:grid-cols-4 h-[calc(100vh-200px)]">
          {/* Student Video */}
          <div className="lg:col-span-3 bg-gray-800 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src={studentAvatar} />
                  <AvatarFallback className="text-2xl">{studentName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <p className="text-gray-300">{studentName}</p>
              </div>
            </div>
            
            {/* Screen sharing indicator */}
            {isScreenSharing && (
              <div className="absolute top-4 left-4">
                <Badge className="bg-blue-600">
                  <Monitor className="h-3 w-3 mr-1" />
                  Screen Sharing
                </Badge>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="bg-gray-700 p-4 space-y-4">
            {/* Quick Actions */}
            <Card className="bg-gray-600 border-gray-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-white">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button size="sm" className="w-full" variant="outline">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Open Chat
                </Button>
                <Button size="sm" className="w-full" variant="outline">
                  <Monitor className="h-4 w-4 mr-2" />
                  Share Screen
                </Button>
                <Button size="sm" className="w-full" variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </CardContent>
            </Card>

            {/* Issue Resolution */}
            <Card className="bg-gray-600 border-gray-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-white flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Quick Fixes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button size="sm" className="w-full text-xs" variant="outline">
                  Audio Issues
                </Button>
                <Button size="sm" className="w-full text-xs" variant="outline">
                  Video Problems
                </Button>
                <Button size="sm" className="w-full text-xs" variant="outline">
                  Connection Help
                </Button>
              </CardContent>
            </Card>

            {/* Session Notes */}
            <Card className="bg-gray-600 border-gray-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-white">Session Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <textarea 
                  className="w-full h-20 text-xs bg-gray-700 border-gray-500 rounded p-2 text-white"
                  placeholder="Add notes about this session..."
                />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* My Video (Picture in Picture) */}
        <div className="absolute bottom-4 right-4 w-48 h-36 bg-gray-800 rounded-lg border-2 border-gray-600">
          <div className="w-full h-full flex items-center justify-center">
            <Avatar className="w-16 h-16">
              <AvatarImage src="/assets/mentor-avatar.png" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center space-x-4 p-4 bg-gray-800">
        <Button
          size="lg"
          variant={isAudioOn ? "default" : "destructive"}
          onClick={() => setIsAudioOn(!isAudioOn)}
          className="rounded-full w-12 h-12"
        >
          {isAudioOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
        </Button>

        <Button
          size="lg"
          variant={isVideoOn ? "default" : "destructive"}
          onClick={() => setIsVideoOn(!isVideoOn)}
          className="rounded-full w-12 h-12"
        >
          {isVideoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
        </Button>

        <Button
          size="lg"
          variant={isScreenSharing ? "secondary" : "outline"}
          onClick={() => setIsScreenSharing(!isScreenSharing)}
          className="rounded-full w-12 h-12"
        >
          <Monitor className="h-5 w-5" />
        </Button>

        <Button
          size="lg"
          variant="destructive"
          onClick={onEndSession}
          className="rounded-full w-12 h-12"
        >
          <Phone className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
