import { MentorService, TimeSlot, Availability } from '@/types/services';

export const mockMentorServices: MentorService[] = [
  {
    id: 'service1',
    mentorId: '1',
    title: 'AI Research Mentorship',
    description: 'Comprehensive guidance on AI research projects, including literature review, methodology, and paper writing.',
    category: 'Research',
    duration: 90,
    price: 120,
    currency: 'USD',
    isActive: true,
    maxStudents: 1,
    requirements: ['Basic ML knowledge', 'Python programming', 'Specific research topic'],
    deliverables: ['Research roadmap', 'Resource recommendations', 'Follow-up plan'],
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T14:00:00Z'
  },
  {
    id: 'service2',
    mentorId: '1',
    title: 'Career Guidance Session',
    description: 'One-on-one career counseling for tech industry transitions, interview prep, and career strategy.',
    category: 'Career',
    duration: 60,
    price: 85,
    currency: 'USD',
    isActive: true,
    maxStudents: 1,
    requirements: ['Resume/CV', 'Career goals description'],
    deliverables: ['Personalized career plan', 'Interview tips', 'Industry insights'],
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-18T09:00:00Z'
  },
  {
    id: 'service3',
    mentorId: '1',
    title: 'Group ML Workshop',
    description: 'Interactive workshop covering machine learning fundamentals with hands-on coding exercises.',
    category: 'Workshop',
    duration: 120,
    price: 50,
    currency: 'USD',
    isActive: true,
    maxStudents: 6,
    requirements: ['Laptop with Python installed', 'Basic programming knowledge'],
    deliverables: ['Workshop materials', 'Code examples', 'Resource list'],
    createdAt: '2024-01-10T15:00:00Z',
    updatedAt: '2024-01-16T11:00:00Z'
  }
];

export const mockTimeSlots: TimeSlot[] = [
  {
    id: 'slot1',
    mentorId: '1',
    date: '2024-01-26',
    startTime: '09:00',
    endTime: '10:30',
    isAvailable: true,
    isRecurring: false,
    maxBookings: 1,
    currentBookings: 0,
    serviceTypes: ['Career Guidance Session', 'AI Research Mentorship'],
    notes: 'Morning session - best for focused discussions'
  },
  {
    id: 'slot2',
    mentorId: '1',
    date: '2024-01-26',
    startTime: '14:00',
    endTime: '15:30',
    isAvailable: false,
    isRecurring: false,
    maxBookings: 1,
    currentBookings: 1,
    serviceTypes: ['AI Research Mentorship'],
    notes: 'Booked - Alex Johnson research session'
  },
  {
    id: 'slot3',
    mentorId: '1',
    date: '2024-01-27',
    startTime: '10:00',
    endTime: '12:00',
    isAvailable: true,
    isRecurring: true,
    recurringDays: ['monday', 'wednesday', 'friday'],
    maxBookings: 6,
    currentBookings: 3,
    serviceTypes: ['Group ML Workshop'],
    notes: 'Weekly group workshop session'
  }
];

export const mockAvailability: Availability = {
  id: 'avail1',
  mentorId: '1',
  timezone: 'EST',
  workingHours: [
    { day: 'monday', startTime: '09:00', endTime: '17:00', isAvailable: true },
    { day: 'tuesday', startTime: '09:00', endTime: '17:00', isAvailable: true },
    { day: 'wednesday', startTime: '10:00', endTime: '16:00', isAvailable: true },
    { day: 'thursday', startTime: '09:00', endTime: '17:00', isAvailable: true },
    { day: 'friday', startTime: '09:00', endTime: '15:00', isAvailable: true },
    { day: 'saturday', startTime: '10:00', endTime: '14:00', isAvailable: false },
    { day: 'sunday', startTime: '00:00', endTime: '00:00', isAvailable: false }
  ],
  blockedDates: ['2024-02-15', '2024-02-16', '2024-03-01'],
  advanceBookingDays: 30,
  cancellationPolicy: 'Free cancellation up to 24 hours before the session. 50% refund for cancellations within 24 hours.',
  bufferTime: 15
};