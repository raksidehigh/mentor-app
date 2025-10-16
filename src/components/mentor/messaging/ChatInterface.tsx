import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, Paperclip, Calendar, CheckCircle, X, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { mockConversations, mockMessages, mockBookingRequests } from '@/data/messaging';
import { mockMentorServices } from '@/data/services';

interface ChatInterfaceProps {
  conversationId: string;
  onBack: () => void;
}

export function ChatInterface({ conversationId, onBack }: ChatInterfaceProps) {
  const { toast } = useToast();
  const [newMessage, setNewMessage] = useState('');
  const [showBookingForm, setShowBookingForm] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const conversation = mockConversations.find(c => c.id === conversationId);
  const messages = mockMessages[conversationId] || [];
  const bookingRequests = mockBookingRequests.filter(b => b.conversationId === conversationId);

  const [bookingForm, setBookingForm] = useState({
    serviceType: '',
    preferredDate: '',
    preferredTime: '',
    notes: ''
  });

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!conversation) {
    return (
      <div className="max-w-6xl mx-auto p-4">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Conversation not found</h2>
          <Button onClick={onBack}>Back to Messages</Button>
        </div>
      </div>
    );
  }

  const otherParticipant = conversation.participants.find(p => p.id !== 'current-user-id') || conversation.participants[0];
  const currentUser = conversation.participants.find(p => p.id === 'current-user-id') || { id: 'current-user-id', name: 'You', role: 'student' as const };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    // In real app, this would make an API call
    toast({
      title: "Message sent!",
      description: "Your message has been delivered.",
    });

    setNewMessage('');
  };

  const handleSendBookingRequest = () => {
    if (!bookingForm.serviceType || !bookingForm.preferredDate || !bookingForm.preferredTime) {
      toast({
        title: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }

    // In real app, this would make an API call
    toast({
      title: "Booking request sent!",
      description: "Your booking request has been sent to the mentor.",
    });

    setShowBookingForm(false);
    setBookingForm({
      serviceType: '',
      preferredDate: '',
      preferredTime: '',
      notes: ''
    });
  };

  const formatMessageTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatMessageDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString([], { month: 'long', day: 'numeric' });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 h-screen flex flex-col">
      {/* Header */}
      <Card className="mb-4">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            
            <Avatar className="h-10 w-10">
              <AvatarImage src={otherParticipant.avatar} alt={otherParticipant.name} />
              <AvatarFallback>{otherParticipant.name.charAt(0)}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <h2 className="font-semibold">{otherParticipant.name}</h2>
              <p className="text-sm text-muted-foreground capitalize">{otherParticipant.role}</p>
            </div>

            {otherParticipant.role === 'mentor' && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowBookingForm(!showBookingForm)}
              >
                <Calendar className="h-4 w-4 mr-2" />
                Book Session
              </Button>
            )}
          </div>
        </CardHeader>
      </Card>

      {/* Booking Form */}
      {showBookingForm && (
        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Book a Session</span>
              <Button variant="ghost" size="sm" onClick={() => setShowBookingForm(false)}>
                <X className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Service Type *</label>
              <Select 
                value={bookingForm.serviceType} 
                onValueChange={(value) => setBookingForm({...bookingForm, serviceType: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose a service" />
                </SelectTrigger>
                <SelectContent>
                  {mockMentorServices.map((service) => (
                    <SelectItem key={service.id} value={service.title}>
                      {service.title} - {service.duration}min - ${service.price}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Preferred Date *</label>
                <Input
                  type="date"
                  value={bookingForm.preferredDate}
                  onChange={(e) => setBookingForm({...bookingForm, preferredDate: e.target.value})}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Preferred Time *</label>
                <Input
                  type="time"
                  value={bookingForm.preferredTime}
                  onChange={(e) => setBookingForm({...bookingForm, preferredTime: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Additional Notes</label>
              <Textarea
                placeholder="Tell the mentor about your specific needs or questions..."
                value={bookingForm.notes}
                onChange={(e) => setBookingForm({...bookingForm, notes: e.target.value})}
                rows={3}
              />
            </div>

            <Button onClick={handleSendBookingRequest} className="w-full">
              Send Booking Request
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Booking Requests */}
      {bookingRequests.length > 0 && (
        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="text-lg">Booking Requests</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {bookingRequests.map((booking) => (
              <div key={booking.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{booking.serviceType}</h4>
                  <Badge
                    variant={
                      booking.status === 'accepted' ? 'default' :
                      booking.status === 'pending' ? 'secondary' :
                      booking.status === 'declined' ? 'destructive' : 'outline'
                    }
                  >
                    {booking.status}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>📅 {new Date(booking.preferredDate).toLocaleDateString()} at {booking.preferredTime}</p>
                  <p>⏱️ {booking.duration} minutes - ${booking.price}</p>
                  {booking.notes && <p>💬 {booking.notes}</p>}
                </div>
                {booking.status === 'pending' && currentUser.role === 'mentor' && (
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="default">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Accept
                    </Button>
                    <Button size="sm" variant="outline">
                      <X className="h-4 w-4 mr-1" />
                      Decline
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Messages */}
      <Card className="flex-1 flex flex-col">
        <CardContent className="flex-1 p-0">
          <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-96">
            {messages.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No messages yet. Start the conversation!</p>
              </div>
            ) : (
              messages.map((message, index) => {
                const isCurrentUser = message.senderId === currentUser.id;
                const showDate = index === 0 || 
                  formatMessageDate(message.timestamp) !== formatMessageDate(messages[index - 1].timestamp);

                return (
                  <div key={message.id}>
                    {showDate && (
                      <div className="text-center my-4">
                        <span className="bg-muted px-3 py-1 rounded-full text-xs text-muted-foreground">
                          {formatMessageDate(message.timestamp)}
                        </span>
                      </div>
                    )}
                    
                    <div className={`flex gap-3 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                      {!isCurrentUser && (
                        <Avatar className="h-8 w-8 mt-1">
                          <AvatarImage src={otherParticipant.avatar} alt={otherParticipant.name} />
                          <AvatarFallback className="text-xs">
                            {otherParticipant.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      )}
                      
                      <div className={`max-w-[70%] ${isCurrentUser ? 'order-1' : ''}`}>
                        <div
                          className={`rounded-lg px-3 py-2 ${
                            isCurrentUser
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted'
                          } ${
                            message.messageType === 'booking_request' || message.messageType === 'booking_confirmation'
                              ? 'border-2 border-dashed border-primary/50'
                              : ''
                          }`}
                        >
                          {message.messageType === 'booking_confirmation' && (
                            <div className="flex items-center gap-2 mb-2 text-xs opacity-75">
                              <Calendar className="h-3 w-3" />
                              Booking Confirmation
                            </div>
                          )}
                          
                          <p className="text-sm">{message.content}</p>
                          
                          <div className="flex items-center justify-between mt-1">
                            <span className={`text-xs ${isCurrentUser ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                              {formatMessageTime(message.timestamp)}
                            </span>
                            {isCurrentUser && (
                              <div className="flex items-center gap-1">
                                {message.isRead ? (
                                  <CheckCircle className="h-3 w-3 text-primary-foreground/70" />
                                ) : (
                                  <Clock className="h-3 w-3 text-primary-foreground/70" />
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {isCurrentUser && (
                        <Avatar className="h-8 w-8 mt-1">
                          <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                            You
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>
        </CardContent>

        {/* Message Input */}
        <Separator />
        <CardContent className="p-4">
          <div className="flex gap-2">
            <Button variant="ghost" size="sm">
              <Paperclip className="h-4 w-4" />
            </Button>
            <Input
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}