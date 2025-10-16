export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  messageType: 'text' | 'booking_request' | 'booking_confirmation' | 'system';
  attachments?: {
    id: string;
    name: string;
    url: string;
    type: string;
  }[];
}

export interface Conversation {
  id: string;
  participants: {
    id: string;
    name: string;
    avatar?: string;
    role: 'mentor' | 'student';
  }[];
  lastMessage: Message;
  unreadCount: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BookingRequest {
  id: string;
  conversationId: string;
  mentorId: string;
  studentId: string;
  serviceType: string;
  preferredDate: string;
  preferredTime: string;
  duration: number;
  price: number;
  status: 'pending' | 'accepted' | 'declined' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: string;
}