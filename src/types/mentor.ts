export interface Mentor {
  id: string;
  name: string;
  university: string;
  country: string;
  subject: string;
  specialties: string[];
  rating: number;
  reviewCount: number;
  price: number;
  currency: string;
  avatar: string;
  bio: string;
  experience: number; // years
  languages: string[];
  responseTime: string;
  isOnline: boolean;
  badges: string[];
  // Enhanced Airbnb-like fields
  title: string;
  detailedBio: string;
  education: {
    degree: string;
    university: string;
    year: number;
  }[];
  achievements: string[];
  sessionTypes: {
    type: string;
    duration: number;
    price: number;
  }[];
  availability: {
    timezone: string;
    slots: {
      day: string;
      times: string[];
    }[];
  };
  reviews: {
    id: string;
    studentName: string;
    rating: number;
    comment: string;
    date: string;
    avatar?: string;
  }[];
  verifications: string[];
  totalSessions: number;
  joinedDate: string;
  skills: string[];
  interests: string[];
}

export interface FilterOptions {
  country: string;
  subject: string;
  university: string;
  minPrice: number;
  maxPrice: number;
  minRating: number;
  sortBy: 'price' | 'rating' | 'reviews' | 'experience';
  sortOrder: 'asc' | 'desc';
}