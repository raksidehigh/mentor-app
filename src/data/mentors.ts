import { Mentor } from '@/types/mentor';
import mentor1 from '@/assets/mentor-1.jpg';
import mentor2 from '@/assets/mentor-2.jpg';
import mentor3 from '@/assets/mentor-3.jpg';
import mentor4 from '@/assets/mentor-4.jpg';

export const mockMentors: Mentor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Chen',
    title: 'AI Research Scientist & MIT Professor',
    university: 'MIT',
    country: 'United States',
    subject: 'Computer Science',
    specialties: ['Machine Learning', 'AI', 'Data Science'],
    rating: 4.9,
    reviewCount: 127,
    price: 85,
    currency: 'USD',
    avatar: mentor1,
    bio: 'PhD in Computer Science with 8+ years experience in AI research. Former Google engineer helping students break into tech.',
    detailedBio: 'Dr. Sarah Chen is a distinguished AI researcher and professor at MIT with over 8 years of experience in machine learning and artificial intelligence. She completed her PhD in Computer Science at Stanford University and has worked as a Senior Research Scientist at Google AI. Her research focuses on deep learning applications in natural language processing and computer vision.\n\nSarah has published over 30 papers in top-tier conferences including NeurIPS, ICML, and ICLR. She is passionate about mentoring the next generation of AI researchers and has successfully guided over 200 students through their academic and career journeys. Her mentoring approach combines technical expertise with practical industry insights.',
    experience: 8,
    languages: ['English', 'Mandarin'],
    responseTime: '< 2 hours',
    isOnline: true,
    badges: ['Top Rated', 'PhD Holder', 'Industry Expert'],
    education: [
      { degree: 'PhD in Computer Science', university: 'Stanford University', year: 2016 },
      { degree: 'MS in Computer Science', university: 'Carnegie Mellon University', year: 2012 },
      { degree: 'BS in Computer Engineering', university: 'UC Berkeley', year: 2010 }
    ],
    achievements: [
      'Published 30+ papers in top AI conferences',
      'Former Senior Research Scientist at Google AI',
      'MIT Teaching Excellence Award 2023',
      'Best Paper Award at NeurIPS 2022'
    ],
    sessionTypes: [
      { type: 'Career Guidance', duration: 60, price: 85 },
      { type: 'Research Mentorship', duration: 90, price: 120 },
      { type: 'Interview Prep', duration: 45, price: 70 }
    ],
    availability: {
      timezone: 'EST',
      slots: [
        { day: 'Monday', times: ['10:00 AM', '2:00 PM', '4:00 PM'] },
        { day: 'Tuesday', times: ['11:00 AM', '3:00 PM'] },
        { day: 'Wednesday', times: ['9:00 AM', '1:00 PM', '5:00 PM'] },
        { day: 'Thursday', times: ['10:00 AM', '2:00 PM'] },
        { day: 'Friday', times: ['11:00 AM', '3:00 PM'] }
      ]
    },
    reviews: [
      {
        id: '1',
        studentName: 'Alex Johnson',
        rating: 5,
        comment: 'Dr. Chen provided incredible guidance for my PhD applications. Her insights into AI research helped me secure admission to Stanford!',
        date: '2024-01-15',
        avatar: undefined
      },
      {
        id: '2',
        studentName: 'Maria Santos',
        rating: 5,
        comment: 'Amazing mentor! Helped me transition from traditional software engineering to ML engineering. Very knowledgeable and supportive.',
        date: '2024-01-20'
      }
    ],
    verifications: ['PhD Verified', 'Employment Verified', 'Identity Verified'],
    totalSessions: 342,
    joinedDate: '2022-03-15',
    skills: ['Deep Learning', 'Python', 'TensorFlow', 'PyTorch', 'Research Methods'],
    interests: ['AI Ethics', 'Educational Technology', 'Startups']
  },
  {
    id: '2',
    name: 'Prof. James Wilson',
    title: 'Mechanical Engineering Professor & Robotics Expert',
    university: 'Oxford University',
    country: 'United Kingdom',
    subject: 'Engineering',
    specialties: ['Mechanical Engineering', 'Robotics', 'Design'],
    rating: 4.8,
    reviewCount: 94,
    price: 75,
    currency: 'USD',
    avatar: mentor2,
    bio: 'Professor of Engineering with extensive industry experience. Specializing in robotics and mechanical design.',
    detailedBio: 'Professor James Wilson is a renowned mechanical engineer and robotics expert at Oxford University. With over 12 years of combined academic and industry experience, he has worked on cutting-edge robotics projects for companies like Boston Dynamics and Dyson.\n\nJames specializes in mechanical design, control systems, and robot kinematics. He has supervised over 50 PhD students and has been instrumental in developing several breakthrough technologies in autonomous systems. His teaching philosophy emphasizes hands-on learning and practical application of theoretical concepts.',
    experience: 12,
    languages: ['English', 'French'],
    responseTime: '< 4 hours',
    isOnline: false,
    badges: ['Professor', 'Research Expert'],
    education: [
      { degree: 'PhD in Mechanical Engineering', university: 'Imperial College London', year: 2012 },
      { degree: 'MEng in Mechanical Engineering', university: 'Oxford University', year: 2008 }
    ],
    achievements: [
      'Professor at Oxford University',
      'Former Senior Engineer at Boston Dynamics',
      'IEEE Robotics and Automation Award 2021',
      '25+ patents in robotics and automation'
    ],
    sessionTypes: [
      { type: 'Academic Guidance', duration: 60, price: 75 },
      { type: 'Industry Transition', duration: 90, price: 110 },
      { type: 'Project Review', duration: 45, price: 60 }
    ],
    availability: {
      timezone: 'GMT',
      slots: [
        { day: 'Monday', times: ['9:00 AM', '2:00 PM'] },
        { day: 'Wednesday', times: ['10:00 AM', '3:00 PM'] },
        { day: 'Friday', times: ['11:00 AM', '4:00 PM'] }
      ]
    },
    reviews: [
      {
        id: '3',
        studentName: 'David Chen',
        rating: 5,
        comment: 'Prof. Wilson helped me understand complex robotics concepts and guided my thesis project. Excellent mentor!',
        date: '2024-01-10'
      }
    ],
    verifications: ['PhD Verified', 'Professor Verified', 'Identity Verified'],
    totalSessions: 186,
    joinedDate: '2022-06-20',
    skills: ['Robotics', 'Mechanical Design', 'Control Systems', 'MATLAB', 'SolidWorks'],
    interests: ['Autonomous Vehicles', 'Sustainable Engineering', 'Innovation']
  },
  {
    id: '3',
    name: 'Maria Rodriguez',
    title: 'Entrepreneur & Stanford MBA',
    university: 'Stanford University',
    country: 'United States',
    subject: 'Business',
    specialties: ['Entrepreneurship', 'Marketing', 'Strategy'],
    rating: 4.7,
    reviewCount: 156,
    price: 65,
    currency: 'USD',
    avatar: mentor3,
    bio: 'MBA graduate and successful entrepreneur. Founded 2 startups and helped 100+ students with business school applications.',
    detailedBio: 'Maria Rodriguez is a successful entrepreneur and Stanford MBA graduate who has founded two successful startups in the fintech and edtech spaces. Her first company was acquired by PayPal in 2020, and she currently serves as CEO of an AI-powered learning platform.\n\nWith her extensive experience in business strategy, marketing, and fundraising, Maria has helped over 100 students navigate business school applications and career transitions. She is particularly passionate about supporting underrepresented entrepreneurs and has been featured in Forbes 30 Under 30.',
    experience: 6,
    languages: ['English', 'Spanish'],
    responseTime: '< 1 hour',
    isOnline: true,
    badges: ['Entrepreneur', 'MBA Holder', 'Startup Advisor'],
    education: [
      { degree: 'MBA', university: 'Stanford Graduate School of Business', year: 2018 },
      { degree: 'BS in Business Administration', university: 'UC Berkeley', year: 2016 }
    ],
    achievements: [
      'Founded 2 successful startups',
      'Featured in Forbes 30 Under 30',
      'Startup acquired by PayPal',
      'Raised $5M+ in venture funding'
    ],
    sessionTypes: [
      { type: 'Business School Prep', duration: 60, price: 65 },
      { type: 'Startup Mentoring', duration: 90, price: 95 },
      { type: 'Career Strategy', duration: 45, price: 55 }
    ],
    availability: {
      timezone: 'PST',
      slots: [
        { day: 'Monday', times: ['8:00 AM', '12:00 PM', '6:00 PM'] },
        { day: 'Tuesday', times: ['9:00 AM', '1:00 PM', '7:00 PM'] },
        { day: 'Wednesday', times: ['8:00 AM', '2:00 PM'] },
        { day: 'Thursday', times: ['10:00 AM', '4:00 PM'] },
        { day: 'Saturday', times: ['9:00 AM', '11:00 AM'] }
      ]
    },
    reviews: [
      {
        id: '4',
        studentName: 'Jennifer Park',
        rating: 5,
        comment: 'Maria helped me craft a compelling business school application and I got into Wharton! Her entrepreneurial insights were invaluable.',
        date: '2024-01-25'
      },
      {
        id: '5',
        studentName: 'Carlos Mendez',
        rating: 4,
        comment: 'Great startup advice and helped me refine my business model. Very practical and actionable feedback.',
        date: '2024-01-18'
      }
    ],
    verifications: ['MBA Verified', 'Entrepreneur Verified', 'Identity Verified'],
    totalSessions: 298,
    joinedDate: '2022-01-10',
    skills: ['Business Strategy', 'Fundraising', 'Marketing', 'Leadership', 'Product Management'],
    interests: ['EdTech', 'Diversity & Inclusion', 'Venture Capital']
  },
  {
    id: '4',
    name: 'Dr. Michael Thompson',
    title: 'Harvard Medical Student & Research Scholar',
    university: 'Harvard University',
    country: 'United States',
    subject: 'Medicine',
    specialties: ['Pre-Med', 'Medical School Prep', 'Research'],
    rating: 4.9,
    reviewCount: 89,
    price: 95,
    currency: 'USD',
    avatar: mentor4,
    bio: 'Harvard Medical School graduate currently doing residency. Passionate about helping pre-med students succeed.',
    detailedBio: 'Dr. Michael Thompson is a Harvard Medical School graduate currently completing his residency in Internal Medicine at Massachusetts General Hospital. He completed his undergraduate degree in Biochemistry at Yale University with summa cum laude honors.\n\nMichael has extensive research experience, having published 8 papers in peer-reviewed medical journals. He scored in the 99th percentile on the MCAT and has helped over 150 pre-med students gain admission to top medical schools. His approach focuses on academic excellence, research experience, and developing a compelling personal narrative.',
    experience: 4,
    languages: ['English'],
    responseTime: '< 3 hours',
    isOnline: true,
    badges: ['Medical Student', 'Harvard Graduate', 'Research Published'],
    education: [
      { degree: 'MD', university: 'Harvard Medical School', year: 2023 },
      { degree: 'BS in Biochemistry', university: 'Yale University', year: 2019 }
    ],
    achievements: [
      'Harvard Medical School graduate',
      'Published 8 research papers',
      'MCAT 99th percentile',
      'Alpha Omega Alpha Honor Society'
    ],
    sessionTypes: [
      { type: 'Pre-Med Counseling', duration: 60, price: 95 },
      { type: 'MCAT Prep Strategy', duration: 90, price: 130 },
      { type: 'Research Guidance', duration: 45, price: 80 }
    ],
    availability: {
      timezone: 'EST',
      slots: [
        { day: 'Sunday', times: ['10:00 AM', '2:00 PM'] },
        { day: 'Tuesday', times: ['7:00 PM'] },
        { day: 'Wednesday', times: ['8:00 PM'] },
        { day: 'Saturday', times: ['9:00 AM', '1:00 PM', '4:00 PM'] }
      ]
    },
    reviews: [
      {
        id: '6',
        studentName: 'Sarah Kim',
        rating: 5,
        comment: 'Dr. Thompson helped me improve my MCAT score by 15 points and get into my dream medical school. Amazing mentor!',
        date: '2024-01-12'
      }
    ],
    verifications: ['Medical Degree Verified', 'Research Verified', 'Identity Verified'],
    totalSessions: 234,
    joinedDate: '2022-08-01',
    skills: ['MCAT Prep', 'Medical Research', 'Clinical Medicine', 'Academic Writing', 'Interview Skills'],
    interests: ['Global Health', 'Medical Education', 'Healthcare Innovation']
  }
];

// ... keep existing code (countries, subjects, universities)

export const countries = Array.from(new Set(mockMentors.map(m => m.country))).sort();
export const subjects = Array.from(new Set(mockMentors.map(m => m.subject))).sort();
export const universities = Array.from(new Set(mockMentors.map(m => m.university))).sort();