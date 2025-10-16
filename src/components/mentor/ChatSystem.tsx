import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Send, Paperclip, Smile, MoreVertical, Search, 
  Phone, Video, Star, Clock, CheckCheck
} from 'lucide-react';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  content: string;
  timestamp: string;
  type: 'text' | 'file' | 'session_request';
  isRead: boolean;
}

interface ChatUser {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
  rating?: number;
}

const mockUsers: ChatUser[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    avatar: '/assets/student-1.png',
    lastMessage: 'Thank you for the great session!',
    lastMessageTime: '2 min ago',
    unreadCount: 0,
    isOnline: true,
    rating: 5
  },
  {
    id: '2',
    name: 'Mike Chen',
    avatar: '/assets/student-2.png',
    lastMessage: 'Can we schedule another session?',
    lastMessageTime: '1 hour ago',
    unreadCount: 2,
    isOnline: false,
    rating: 4
  },
  {
    id: '3',
    name: 'Emma Wilson',
    avatar: '/assets/student-3.png',
    lastMessage: 'I have a question about the assignment',
    lastMessageTime: '3 hours ago',
    unreadCount: 1,
    isOnline: true
  }
];

const mockMessages: Message[] = [
  {
    id: '1',
    senderId: '1',
    senderName: 'Sarah Johnson',
    senderAvatar: '/assets/student-1.png',
    content: 'Hi! I wanted to thank you for the amazing career guidance session yesterday.',
    timestamp: '10:30 AM',
    type: 'text',
    isRead: true
  },
  {
    id: '2',
    senderId: 'mentor',
    senderName: 'You',
    senderAvatar: '/assets/mentor-avatar.png',
    content: 'You\'re very welcome! I\'m glad it was helpful. How are you feeling about your next steps?',
    timestamp: '10:32 AM',
    type: 'text',
    isRead: true
  },
  {
    id: '3',
    senderId: '1',
    senderName: 'Sarah Johnson',
    senderAvatar: '/assets/student-1.png',
    content: 'Much more confident! I\'ve already started updating my LinkedIn profile with your suggestions.',
    timestamp: '10:35 AM',
    type: 'text',
    isRead: true
  }
];

export function ChatSystem() {
  const [selectedUser, setSelectedUser] = useState<ChatUser | null>(mockUsers[0]);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedUser) return;

    const message: Message = {
      id: Date.now().toString(),
      senderId: 'mentor',
      senderName: 'You',
      senderAvatar: '/assets/mentor-avatar.png',
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'text',
      isRead: false
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleCall = (type: 'voice' | 'video') => {
    if (!selectedUser) return;
    alert(`Starting ${type} call with ${selectedUser.name}`);
  };

  const handleFileAttach = () => {
    // Simulate file attachment
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        alert(`File attached: ${file.name}`);
      }
    };
    input.click();
  };

  return (
    <div className="flex flex-col lg:flex-row h-[600px] border rounded-lg overflow-hidden">
      {/* Chat List */}
      <div className={`${selectedUser ? 'hidden lg:block' : 'block'} w-full lg:w-1/3 border-r bg-muted/30`}>
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-2 space-y-1">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                onClick={() => setSelectedUser(user)}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedUser?.id === user.id ? 'bg-primary/10 border border-primary/20' : 'hover:bg-accent'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Avatar>
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    {user.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-background rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium truncate">{user.name}</p>
                      <div className="flex items-center space-x-1">
                        {user.rating && (
                          <div className="flex items-center">
                            <Star className="h-3 w-3 text-yellow-400 fill-current" />
                            <span className="text-xs ml-1">{user.rating}</span>
                          </div>
                        )}
                        {user.unreadCount > 0 && (
                          <Badge className="h-5 w-5 flex items-center justify-center p-0 text-xs">
                            {user.unreadCount}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{user.lastMessage}</p>
                    <p className="text-xs text-muted-foreground">{user.lastMessageTime}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Chat Area */}
      <div className={`${selectedUser ? 'flex' : 'hidden lg:flex'} flex-1 flex-col`}>
        {selectedUser ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="lg:hidden"
                  onClick={() => setSelectedUser(null)}
                >
                  ←
                </Button>
                <Avatar>
                  <AvatarImage src={selectedUser.avatar} />
                  <AvatarFallback>{selectedUser.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{selectedUser.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedUser.isOnline ? 'Online' : 'Last seen 2 hours ago'}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="outline" className="hidden sm:flex" onClick={() => handleCall('voice')}>
                  <Phone className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline" className="hidden sm:flex" onClick={() => handleCall('video')}>
                  <Video className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.senderId === 'mentor' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-end space-x-2 max-w-[70%] ${
                      message.senderId === 'mentor' ? 'flex-row-reverse space-x-reverse' : ''
                    }`}>
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={message.senderAvatar} />
                        <AvatarFallback className="text-xs">
                          {message.senderName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className={`rounded-lg p-3 ${
                        message.senderId === 'mentor' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted'
                      }`}>
                        <p className="text-sm">{message.content}</p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs opacity-70">{message.timestamp}</span>
                          {message.senderId === 'mentor' && (
                            <CheckCheck className={`h-3 w-3 ml-2 ${message.isRead ? 'text-blue-400' : 'opacity-50'}`} />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="p-4 border-t">
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="outline" onClick={handleFileAttach}>
                  <Paperclip className="h-4 w-4" />
                </Button>
                <div className="flex-1 relative">
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="pr-10"
                  />
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2"
                  >
                    <Smile className="h-4 w-4" />
                  </Button>
                </div>
                <Button onClick={sendMessage} disabled={!newMessage.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-semibold mb-2">Select a conversation</h3>
              <p className="text-muted-foreground">Choose a student to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
