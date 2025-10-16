import { Conversation, Message, BookingRequest } from '@/types/messaging';

export const mockConversations: Conversation[] = [
  {
    id: '1',
    participants: [
      {
        id: 'student1',
        name: 'Alex Johnson',
        avatar: undefined,
        role: 'student'
      },
      {
        id: '1',
        name: 'Dr. Sarah Chen',
        avatar: '/src/assets/mentor-1.jpg',
        role: 'mentor'
      }
    ],
    lastMessage: {
      id: 'msg1',
      conversationId: '1',
      senderId: 'student1',
      senderName: 'Alex Johnson',
      content: 'Thank you for accepting my session request! Looking forward to our meeting on Friday.',
      timestamp: '2024-01-25T14:30:00Z',
      isRead: false,
      messageType: 'text'
    },
    unreadCount: 2,
    isActive: true,
    createdAt: '2024-01-20T10:00:00Z',
    updatedAt: '2024-01-25T14:30:00Z'
  },
  {
    id: '2',
    participants: [
      {
        id: 'student2',
        name: 'Maria Santos',
        avatar: undefined,
        role: 'student'
      },
      {
        id: '1',
        name: 'Dr. Sarah Chen',
        avatar: '/src/assets/mentor-1.jpg',
        role: 'mentor'
      }
    ],
    lastMessage: {
      id: 'msg2',
      conversationId: '2',
      senderId: '1',
      senderName: 'Dr. Sarah Chen',
      content: 'I can help you with your ML project. Let\'s schedule a session to discuss your requirements.',
      timestamp: '2024-01-24T16:45:00Z',
      isRead: true,
      messageType: 'text'
    },
    unreadCount: 0,
    isActive: true,
    createdAt: '2024-01-22T09:15:00Z',
    updatedAt: '2024-01-24T16:45:00Z'
  },
  {
    id: '3',
    participants: [
      {
        id: 'student3',
        name: 'David Chen',
        avatar: undefined,
        role: 'student'
      },
      {
        id: '2',
        name: 'Prof. James Wilson',
        avatar: '/src/assets/mentor-2.jpg',
        role: 'mentor'
      }
    ],
    lastMessage: {
      id: 'msg3',
      conversationId: '3',
      senderId: 'student3',
      senderName: 'David Chen',
      content: 'Hi Prof. Wilson, I\'d like to book a session for robotics project guidance.',
      timestamp: '2024-01-23T11:20:00Z',
      isRead: true,
      messageType: 'text'
    },
    unreadCount: 0,
    isActive: true,
    createdAt: '2024-01-23T11:20:00Z',
    updatedAt: '2024-01-23T11:20:00Z'
  }
];

export const mockMessages: { [conversationId: string]: Message[] } = {
  '1': [
    {
      id: 'msg1-1',
      conversationId: '1',
      senderId: 'student1',
      senderName: 'Alex Johnson',
      content: 'Hi Dr. Chen! I\'m interested in getting mentorship for my AI research project. Could we schedule a session?',
      timestamp: '2024-01-20T10:00:00Z',
      isRead: true,
      messageType: 'text'
    },
    {
      id: 'msg1-2',
      conversationId: '1',
      senderId: '1',
      senderName: 'Dr. Sarah Chen',
      content: 'Hello Alex! I\'d be happy to help with your AI research. Could you share more details about your project?',
      timestamp: '2024-01-20T14:30:00Z',
      isRead: true,
      messageType: 'text'
    },
    {
      id: 'msg1-3',
      conversationId: '1',
      senderId: 'student1',
      senderName: 'Alex Johnson',
      content: 'I\'m working on a computer vision project for medical imaging. I need guidance on model architecture and dataset preparation.',
      timestamp: '2024-01-21T09:15:00Z',
      isRead: true,
      messageType: 'text'
    },
    {
      id: 'msg1-4',
      conversationId: '1',
      senderId: '1',
      senderName: 'Dr. Sarah Chen',
      content: 'That sounds like a fascinating project! I have experience with medical imaging AI. Let\'s schedule a 90-minute research mentorship session.',
      timestamp: '2024-01-21T16:20:00Z',
      isRead: true,
      messageType: 'booking_confirmation'
    },
    {
      id: 'msg1-5',
      conversationId: '1',
      senderId: 'student1',
      senderName: 'Alex Johnson',
      content: 'Thank you for accepting my session request! Looking forward to our meeting on Friday.',
      timestamp: '2024-01-25T14:30:00Z',
      isRead: false,
      messageType: 'text'
    }
  ]
};

export const mockBookingRequests: BookingRequest[] = [
  {
    id: 'booking1',
    conversationId: '1',
    mentorId: '1',
    studentId: 'student1',
    serviceType: 'Research Mentorship',
    preferredDate: '2024-01-26',
    preferredTime: '14:00',
    duration: 90,
    price: 120,
    status: 'accepted',
    notes: 'Computer vision project for medical imaging',
    createdAt: '2024-01-21T16:20:00Z'
  },
  {
    id: 'booking2',
    conversationId: '2',
    mentorId: '1',
    studentId: 'student2',
    serviceType: 'Career Guidance',
    preferredDate: '2024-01-27',
    preferredTime: '10:00',
    duration: 60,
    price: 85,
    status: 'pending',
    notes: 'Transitioning to ML engineering career',
    createdAt: '2024-01-24T16:45:00Z'
  }
];