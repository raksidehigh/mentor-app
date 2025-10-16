import { useState } from 'react';
import { Search, MessageCircle, Filter, Users, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Conversation } from '@/types/messaging';
import { mockConversations } from '@/data/messaging';
import { ChatInterface } from './ChatInterface';

export function MessageCenter() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'unread' | 'students' | 'mentors'>('all');

  const filteredConversations = mockConversations.filter(conversation => {
    const matchesSearch = conversation.participants.some(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) || conversation.lastMessage.content.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    switch (filterType) {
      case 'unread':
        return conversation.unreadCount > 0;
      case 'students':
        return conversation.participants.some(p => p.role === 'student');
      case 'mentors':
        return conversation.participants.some(p => p.role === 'mentor');
      default:
        return true;
    }
  });

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffInHours < 168) { // 7 days
      return date.toLocaleDateString([], { weekday: 'short' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  const getOtherParticipant = (conversation: Conversation) => {
    // In a real app, you'd get the current user ID from auth context
    return conversation.participants.find(p => p.id !== 'current-user-id') || conversation.participants[0];
  };

  if (selectedConversation) {
    return (
      <ChatInterface
        conversationId={selectedConversation}
        onBack={() => setSelectedConversation(null)}
      />
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Messages</h1>
        <p className="text-muted-foreground">Stay connected with your mentoring community</p>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filterType} onValueChange={(value: any) => setFilterType(value)}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Messages</SelectItem>
              <SelectItem value="unread">Unread</SelectItem>
              <SelectItem value="students">From Students</SelectItem>
              <SelectItem value="mentors">From Mentors</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all" className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            All ({filteredConversations.length})
          </TabsTrigger>
          <TabsTrigger value="unread" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Unread ({filteredConversations.filter(c => c.unreadCount > 0).length})
          </TabsTrigger>
          <TabsTrigger value="archived" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Archived (0)
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="space-y-2">
            {filteredConversations.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <MessageCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">No conversations found</h3>
                  <p className="text-muted-foreground">
                    {searchQuery ? 'Try adjusting your search terms' : 'Start a conversation with a mentor or student'}
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredConversations.map((conversation) => {
                const otherParticipant = getOtherParticipant(conversation);
                return (
                  <Card
                    key={conversation.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      conversation.unreadCount > 0 ? 'border-primary/20 bg-primary/5' : ''
                    }`}
                    onClick={() => setSelectedConversation(conversation.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={otherParticipant.avatar} alt={otherParticipant.name} />
                            <AvatarFallback>
                              {otherParticipant.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <Badge
                            variant={otherParticipant.role === 'mentor' ? 'default' : 'secondary'}
                            className="absolute -bottom-1 -right-1 text-xs px-1"
                          >
                            {otherParticipant.role === 'mentor' ? 'M' : 'S'}
                          </Badge>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-semibold truncate">
                              {otherParticipant.name}
                            </h3>
                            <div className="flex items-center gap-2">
                              {conversation.unreadCount > 0 && (
                                <Badge variant="destructive" className="text-xs">
                                  {conversation.unreadCount}
                                </Badge>
                              )}
                              <span className="text-xs text-muted-foreground">
                                {formatTime(conversation.lastMessage.timestamp)}
                              </span>
                            </div>
                          </div>
                          
                          <p className="text-sm text-muted-foreground truncate mb-1">
                            {conversation.lastMessage.senderName === otherParticipant.name ? '' : 'You: '}
                            {conversation.lastMessage.content}
                          </p>

                          <div className="flex items-center gap-2 text-xs">
                            <Badge variant="outline" className="text-xs">
                              {otherParticipant.role}
                            </Badge>
                            {conversation.lastMessage.messageType === 'booking_request' && (
                              <Badge variant="secondary" className="text-xs">
                                <Clock className="h-3 w-3 mr-1" />
                                Booking Request
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>
        </TabsContent>

        <TabsContent value="unread" className="mt-6">
          <div className="space-y-2">
            {filteredConversations.filter(c => c.unreadCount > 0).map((conversation) => {
              const otherParticipant = getOtherParticipant(conversation);
              return (
                <Card
                  key={conversation.id}
                  className="cursor-pointer transition-all hover:shadow-md border-primary/20 bg-primary/5"
                  onClick={() => setSelectedConversation(conversation.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={otherParticipant.avatar} alt={otherParticipant.name} />
                        <AvatarFallback>{otherParticipant.name.charAt(0)}</AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold">{otherParticipant.name}</h3>
                          <Badge variant="destructive" className="text-xs">
                            {conversation.unreadCount}
                          </Badge>
                        </div>
                        
                        <p className="text-sm text-muted-foreground truncate">
                          {conversation.lastMessage.content}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="archived" className="mt-6">
          <Card>
            <CardContent className="p-12 text-center">
              <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No archived conversations</h3>
              <p className="text-muted-foreground">Archived conversations will appear here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}