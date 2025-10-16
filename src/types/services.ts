export interface MentorService {
  id: string;
  mentorId: string;
  title: string;
  description: string;
  category: string;
  duration: number; // in minutes
  price: number;
  currency: string;
  isActive: boolean;
  maxStudents?: number; // for group sessions
  requirements?: string[];
  deliverables?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface TimeSlot {
  id: string;
  mentorId: string;
  date: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  isRecurring: boolean;
  recurringDays?: string[]; // ['monday', 'wednesday', 'friday']
  maxBookings: number;
  currentBookings: number;
  serviceTypes: string[]; // which services can be booked in this slot
  notes?: string;
}

export interface Availability {
  id: string;
  mentorId: string;
  timezone: string;
  workingHours: {
    day: string;
    startTime: string;
    endTime: string;
    isAvailable: boolean;
  }[];
  blockedDates: string[];
  advanceBookingDays: number; // how many days in advance can students book
  cancellationPolicy: string;
  bufferTime: number; // minutes between sessions
}