import { useState } from 'react';
import { Edit, Save, X, Plus, Trash2, User, GraduationCap, Star, Clock, Globe, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';

// Mock mentor data matching the reference structure
const mockMentorProfile = {
  id: '1',
  // Personal Information
  firstName: 'Sarah',
  lastName: 'Johnson',
  email: 'sarah.johnson@university.edu',
  phoneNumber: '+1 (555) 123-4567',
  
  // Academic Experience
  academicExperiences: [
    {
      university: 'Stanford University',
      fieldOfStudy: 'Computer Science',
      academicLevel: 'PhD'
    },
    {
      university: 'MIT',
      fieldOfStudy: 'Computer Science', 
      academicLevel: 'Masters'
    }
  ],
  
  // Mentoring Services
  mentoringServices: {
    'preArrivalCustom': ['Speak to admissions/professors', 'Share experiences on academic/assessment styles', 'Visit resource centre/department for academic queries'],
    'settleInSmoothly': ['Help find a place to live', 'Guide on setting up bank account, phone, etc.'],
    'moneyStuff': ['Break down the real cost of living', 'Share how to get student discounts', 'Help plan your student budget'],
    'preDeparture': ['Tell you exactly what to pack (and what not to)', 'Explain immigration and arrival process'],
    'academicSurvival': ['Explain how classes, deadlines & grading work', 'Show you how to use campus tools & portals', 'Tips on dealing with coursework & referencing', 'Assistance with Tips on IELTS and other Entrance Exams'],
    'partTimeJobs': ['Help find resources for part-time work', 'Share details for networking opportunities', 'Share resume & cover letter tips'],
    'lifeOnCampus': ['Show you the hidden gems on campus', 'Tell you about amazing campus resources', 'Help you join clubs and student groups'],
    'meetInPerson': ['Catch up for coffee when you arrive', 'Introduce you to other students', 'Share how I handled homesickness', 'Recommend student-friendly places to eat out', 'Share budget travel hacks']
  },
  selectedServices: [
    'Speak to admissions/professors',
    'Help find a place to live',
    'Break down the real cost of living',
    'Tell you exactly what to pack (and what not to)'
  ],
  
  // Languages
  availableLanguages: ['English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese', 'Korean', 'Arabic', 'Portuguese', 'Italian', 'Russian', 'Hindi'],
  selectedLanguages: ['English', 'Spanish', 'French'],
  
  // Timezone and Availability
  timezone: 'EST (UTC-5)',
  availableHours: [
    { from: '09:00', to: '17:00' },
    { from: '19:00', to: '21:00' }
  ],
  availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  allDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  
  // Pricing and Experience
  currency: 'USD',
  hourlyRate: 25,
  relevantExperience: 'I have been mentoring international students for over 5 years, helping them navigate university life and academic challenges. My experience includes working with students from diverse backgrounds and understanding the unique challenges they face.',
  achievements: [
    'Mentored 100+ international students',
    'PhD in Computer Science from Stanford',
    'Published researcher in AI/ML'
  ]
};

const mentoringServiceLabels = {
  'preArrivalCustom': 'Pre-Arrival & Custom Requests',
  'settleInSmoothly': 'Settle In Smoothly',
  'moneyStuff': 'Money Stuff',
  'preDeparture': 'Pre-Departure Help', 
  'academicSurvival': 'Academic Survival',
  'partTimeJobs': 'Part-Time Jobs & Internships',
  'lifeOnCampus': 'Life on Campus',
  'meetInPerson': 'Meet in Person'
};

export default function MentorProfile() {
  const { toast } = useToast();
  const [profile, setProfile] = useState(mockMentorProfile);
  const [editingSections, setEditingSections] = useState<Record<string, boolean>>({});

  const handleSectionSave = (section: string, data: any) => {
    setProfile({ ...profile, ...data });
    setEditingSections({ ...editingSections, [section]: false });
    toast({
      title: "Section Updated",
      description: "Your changes have been saved successfully.",
    });
  };

  const handleSectionCancel = (section: string) => {
    setEditingSections({ ...editingSections, [section]: false });
  };

  const startEdit = (section: string) => {
    setEditingSections({ ...editingSections, [section]: true });
  };

  // Personal Information Section
  const PersonalInfoSection = () => {
    const isEditing = editingSections.personalInfo;
    const [formData, setFormData] = useState({
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email,
      phoneNumber: profile.phoneNumber
    });

    const handleSave = () => {
      handleSectionSave('personalInfo', formData);
    };

    const handleCancel = () => {
      setFormData({
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        phoneNumber: profile.phoneNumber
      });
      handleSectionCancel('personalInfo');
    };

    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-blue-600" />
            <CardTitle>Personal Information</CardTitle>
          </div>
          {!isEditing && (
            <Button size="sm" variant="outline" onClick={() => startEdit('personalInfo')}>
              <Edit className="h-4 w-4" />
            </Button>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          {isEditing ? (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    placeholder="Your first name"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    placeholder="Your last name"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your.email@university.edu"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <Button onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button variant="outline" onClick={handleCancel}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>First Name</Label>
                <p className="font-medium">{profile.firstName}</p>
              </div>
              <div>
                <Label>Last Name</Label>
                <p className="font-medium">{profile.lastName}</p>
              </div>
              <div>
                <Label>Email Address</Label>
                <p className="font-medium">{profile.email}</p>
              </div>
              <div>
                <Label>Phone Number</Label>
                <p className="font-medium">{profile.phoneNumber}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  // Academic Experience Section
  const AcademicExperienceSection = () => {
    const isEditing = editingSections.academicExperience;
    const [formData, setFormData] = useState({
      academicExperiences: [...profile.academicExperiences],
      newExperience: { university: '', fieldOfStudy: '', academicLevel: '' }
    });

    const addExperience = () => {
      if (formData.newExperience.university && formData.newExperience.fieldOfStudy && formData.newExperience.academicLevel) {
        setFormData({
          ...formData,
          academicExperiences: [...formData.academicExperiences, { ...formData.newExperience }],
          newExperience: { university: '', fieldOfStudy: '', academicLevel: '' }
        });
      }
    };

    const removeExperience = (index: number) => {
      const newExperiences = formData.academicExperiences.filter((_, i) => i !== index);
      setFormData({ ...formData, academicExperiences: newExperiences });
    };

    const handleSave = () => {
      handleSectionSave('academicExperience', { academicExperiences: formData.academicExperiences });
    };

    const handleCancel = () => {
      setFormData({
        academicExperiences: [...profile.academicExperiences],
        newExperience: { university: '', fieldOfStudy: '', academicLevel: '' }
      });
      handleSectionCancel('academicExperience');
    };

    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-blue-600" />
            <CardTitle>International Academic Experience</CardTitle>
          </div>
          {!isEditing && (
            <Button size="sm" variant="outline" onClick={() => startEdit('academicExperience')}>
              <Edit className="h-4 w-4" />
            </Button>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          {isEditing ? (
            <>
              <p className="text-sm text-muted-foreground">
                Add your international education qualifications. If you have studied in more than one university or participated in exchange programs or semester abroad, please mention all of them.
              </p>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>University/Institution</Label>
                  <Input
                    value={formData.newExperience.university}
                    onChange={(e) => setFormData({
                      ...formData,
                      newExperience: { ...formData.newExperience, university: e.target.value }
                    })}
                    placeholder="University of Example"
                  />
                </div>
                <div>
                  <Label>Field of Study</Label>
                  <Input
                    value={formData.newExperience.fieldOfStudy}
                    onChange={(e) => setFormData({
                      ...formData,
                      newExperience: { ...formData.newExperience, fieldOfStudy: e.target.value }
                    })}
                    placeholder="Computer Science, Business, etc."
                  />
                </div>
                <div>
                  <Label>Academic Level</Label>
                  <Select
                    value={formData.newExperience.academicLevel}
                    onValueChange={(value) => setFormData({
                      ...formData,
                      newExperience: { ...formData.newExperience, academicLevel: value }
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Undergraduate">Undergraduate</SelectItem>
                      <SelectItem value="Masters">Masters</SelectItem>
                      <SelectItem value="PhD">PhD</SelectItem>
                      <SelectItem value="Certificate">Certificate</SelectItem>
                      <SelectItem value="Exchange">Exchange Program</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={addExperience} className="w-fit">
                <Plus className="h-4 w-4 mr-2" />
                Add Academic Experience
              </Button>

              <div className="space-y-2">
                <Label>Academic Experiences:</Label>
                {formData.academicExperiences.map((exp, index) => (
                  <Badge key={index} variant="secondary" className="mr-2 mb-2">
                    {exp.academicLevel} - {exp.fieldOfStudy} ({exp.university})
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-4 w-4 p-0 ml-2"
                      onClick={() => removeExperience(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>

              <div className="flex gap-2 pt-2">
                <Button onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button variant="outline" onClick={handleCancel}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </>
          ) : (
            <div className="space-y-3">
              {profile.academicExperiences.map((exp, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="font-medium">{exp.university}</div>
                  <div className="text-sm text-muted-foreground">{exp.academicLevel} in {exp.fieldOfStudy}</div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  // Mentoring Services Section
  const MentoringServicesSection = () => {
    const isEditing = editingSections.mentoringServices;
    const [selectedServices, setSelectedServices] = useState(profile.selectedServices);

    const handleServiceToggle = (service: string) => {
      if (selectedServices.includes(service)) {
        setSelectedServices(selectedServices.filter(s => s !== service));
      } else {
        setSelectedServices([...selectedServices, service]);
      }
    };

    const handleSave = () => {
      handleSectionSave('mentoringServices', { selectedServices });
    };

    const handleCancel = () => {
      setSelectedServices(profile.selectedServices);
      handleSectionCancel('mentoringServices');
    };

    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-blue-600" />
            <CardTitle>Mentoring Services</CardTitle>
          </div>
          {!isEditing && (
            <Button size="sm" variant="outline" onClick={() => startEdit('mentoringServices')}>
              <Edit className="h-4 w-4" />
            </Button>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          {isEditing ? (
            <>
              <div>
                <Label className="text-base font-semibold">How can you help students? *</Label>
                <p className="text-sm text-muted-foreground mb-4">
                  Choose the services you can offer to mentees (select at least one from any category)
                </p>
              </div>

              <div className="space-y-6">
                {Object.entries(mentoringServiceLabels).map(([key, label]) => (
                  <div key={key} className="space-y-3">
                    <h4 className="font-medium text-blue-600">• {label}</h4>
                    <div className="grid grid-cols-1 gap-2 ml-4">
                      {profile.mentoringServices[key]?.map((service, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Checkbox
                            id={`${key}-${index}`}
                            checked={selectedServices.includes(service)}
                            onCheckedChange={() => handleServiceToggle(service)}
                          />
                          <Label htmlFor={`${key}-${index}`} className="text-sm cursor-pointer">
                            {service}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2 pt-2">
                <Button onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button variant="outline" onClick={handleCancel}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </>
          ) : (
            <div className="space-y-3">
              <Label className="text-base font-semibold">Selected Services:</Label>
              <div className="flex flex-wrap gap-2">
                {profile.selectedServices.map((service, index) => (
                  <Badge key={index} variant="secondary">
                    {service}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  // Languages & Availability Section
  const LanguagesAvailabilitySection = () => {
    const isEditing = editingSections.languagesAvailability;
    const [formData, setFormData] = useState({
      selectedLanguages: [...profile.selectedLanguages],
      timezone: profile.timezone,
      availableHours: [...profile.availableHours],
      availableDays: [...profile.availableDays],
      newTimeSlot: { from: '', to: '' }
    });

    const handleLanguageToggle = (language: string) => {
      if (formData.selectedLanguages.includes(language)) {
        setFormData({
          ...formData,
          selectedLanguages: formData.selectedLanguages.filter(l => l !== language)
        });
      } else {
        setFormData({
          ...formData,
          selectedLanguages: [...formData.selectedLanguages, language]
        });
      }
    };

    const handleDayToggle = (day: string) => {
      if (formData.availableDays.includes(day)) {
        setFormData({
          ...formData,
          availableDays: formData.availableDays.filter(d => d !== day)
        });
      } else {
        setFormData({
          ...formData,
          availableDays: [...formData.availableDays, day]
        });
      }
    };

    const addTimeSlot = () => {
      if (formData.newTimeSlot.from && formData.newTimeSlot.to) {
        setFormData({
          ...formData,
          availableHours: [...formData.availableHours, { ...formData.newTimeSlot }],
          newTimeSlot: { from: '', to: '' }
        });
      }
    };

    const removeTimeSlot = (index: number) => {
      const newSlots = formData.availableHours.filter((_, i) => i !== index);
      setFormData({ ...formData, availableHours: newSlots });
    };

    const handleSave = () => {
      handleSectionSave('languagesAvailability', {
        selectedLanguages: formData.selectedLanguages,
        timezone: formData.timezone,
        availableHours: formData.availableHours,
        availableDays: formData.availableDays
      });
    };

    const handleCancel = () => {
      setFormData({
        selectedLanguages: [...profile.selectedLanguages],
        timezone: profile.timezone,
        availableHours: [...profile.availableHours],
        availableDays: [...profile.availableDays],
        newTimeSlot: { from: '', to: '' }
      });
      handleSectionCancel('languagesAvailability');
    };

    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-blue-600" />
            <CardTitle>Languages & Availability</CardTitle>
          </div>
          {!isEditing && (
            <Button size="sm" variant="outline" onClick={() => startEdit('languagesAvailability')}>
              <Edit className="h-4 w-4" />
            </Button>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          {isEditing ? (
            <>
              <div>
                <Label className="text-base font-semibold">Languages</Label>
                <p className="text-sm text-muted-foreground mb-3">Select languages you can mentor in</p>
                <div className="grid grid-cols-3 gap-2">
                  {profile.availableLanguages.map((language) => (
                    <div key={language} className="flex items-center space-x-2">
                      <Checkbox
                        id={language}
                        checked={formData.selectedLanguages.includes(language)}
                        onCheckedChange={() => handleLanguageToggle(language)}
                      />
                      <Label htmlFor={language} className="text-sm cursor-pointer">
                        {language}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-base font-semibold">Timezone *</Label>
                <p className="text-sm text-muted-foreground mb-3">Select your timezone to help students schedule sessions</p>
                <Select value={formData.timezone} onValueChange={(value) => setFormData({ ...formData, timezone: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="EST (UTC-5)">EST (UTC-5)</SelectItem>
                    <SelectItem value="PST (UTC-8)">PST (UTC-8)</SelectItem>
                    <SelectItem value="GMT (UTC+0)">GMT (UTC+0)</SelectItem>
                    <SelectItem value="CET (UTC+1)">CET (UTC+1)</SelectItem>
                    <SelectItem value="IST (UTC+5:30)">IST (UTC+5:30)</SelectItem>
                    <SelectItem value="JST (UTC+9)">JST (UTC+9)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-base font-semibold">Available Hours</Label>
                <p className="text-sm text-muted-foreground mb-3">Add your available time ranges (1:00 - 23:00 in your timezone)</p>
                <div className="grid grid-cols-3 gap-4 items-end">
                  <div>
                    <Label>From</Label>
                    <Select value={formData.newTimeSlot.from} onValueChange={(value) => setFormData({ ...formData, newTimeSlot: { ...formData.newTimeSlot, from: value } })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Start time" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 24 }, (_, i) => (
                          <SelectItem key={i} value={`${i.toString().padStart(2, '0')}:00`}>
                            {i.toString().padStart(2, '0')}:00
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>To</Label>
                    <Select value={formData.newTimeSlot.to} onValueChange={(value) => setFormData({ ...formData, newTimeSlot: { ...formData.newTimeSlot, to: value } })}>
                      <SelectTrigger>
                        <SelectValue placeholder="End time" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 24 }, (_, i) => (
                          <SelectItem key={i} value={`${i.toString().padStart(2, '0')}:00`}>
                            {i.toString().padStart(2, '0')}:00
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={addTimeSlot}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add
                  </Button>
                </div>
                <div className="mt-3 space-y-2">
                  {formData.availableHours.map((slot, index) => (
                    <Badge key={index} variant="outline" className="mr-2">
                      {slot.from} - {slot.to}
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-4 w-4 p-0 ml-2"
                        onClick={() => removeTimeSlot(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-base font-semibold">Available Days</Label>
                <p className="text-sm text-muted-foreground mb-3">Select the days of the week you're available</p>
                <div className="grid grid-cols-4 gap-2">
                  {profile.allDays.map((day) => (
                    <div key={day} className="flex items-center space-x-2">
                      <Checkbox
                        id={day}
                        checked={formData.availableDays.includes(day)}
                        onCheckedChange={() => handleDayToggle(day)}
                      />
                      <Label htmlFor={day} className="text-sm cursor-pointer">
                        {day}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button variant="outline" onClick={handleCancel}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <div>
                <Label className="font-semibold">Languages:</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {profile.selectedLanguages.map((language, index) => (
                    <Badge key={index} variant="secondary">
                      {language}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <Label className="font-semibold">Timezone:</Label>
                <p>{profile.timezone}</p>
              </div>
              <div>
                <Label className="font-semibold">Available Hours:</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {profile.availableHours.map((slot, index) => (
                    <Badge key={index} variant="outline">
                      {slot.from} - {slot.to}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <Label className="font-semibold">Available Days:</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {profile.availableDays.map((day, index) => (
                    <Badge key={index} variant="outline">
                      {day}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  // Pricing & Experience Section
  const PricingExperienceSection = () => {
    const isEditing = editingSections.pricingExperience;
    const [formData, setFormData] = useState({
      currency: profile.currency,
      hourlyRate: profile.hourlyRate,
      relevantExperience: profile.relevantExperience,
      achievements: [...profile.achievements],
      newAchievement: ''
    });

    const addAchievement = () => {
      if (formData.newAchievement.trim()) {
        setFormData({
          ...formData,
          achievements: [...formData.achievements, formData.newAchievement.trim()],
          newAchievement: ''
        });
      }
    };

    const removeAchievement = (index: number) => {
      const newAchievements = formData.achievements.filter((_, i) => i !== index);
      setFormData({ ...formData, achievements: newAchievements });
    };

    const handleSave = () => {
      handleSectionSave('pricingExperience', {
        currency: formData.currency,
        hourlyRate: formData.hourlyRate,
        relevantExperience: formData.relevantExperience,
        achievements: formData.achievements
      });
    };

    const handleCancel = () => {
      setFormData({
        currency: profile.currency,
        hourlyRate: profile.hourlyRate,
        relevantExperience: profile.relevantExperience,
        achievements: [...profile.achievements],
        newAchievement: ''
      });
      handleSectionCancel('pricingExperience');
    };

    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-blue-600" />
            <CardTitle>Pricing & Experience</CardTitle>
          </div>
          {!isEditing && (
            <Button size="sm" variant="outline" onClick={() => startEdit('pricingExperience')}>
              <Edit className="h-4 w-4" />
            </Button>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          {isEditing ? (
            <>
              <div>
                <Label className="text-base font-semibold">Preferred Currency & Hourly Rate *</Label>
                <div className="grid grid-cols-2 gap-4 mt-3">
                  <div>
                    <Label>Currency</Label>
                    <Select value={formData.currency} onValueChange={(value) => setFormData({ ...formData, currency: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">$ USD</SelectItem>
                        <SelectItem value="EUR">€ EUR</SelectItem>
                        <SelectItem value="GBP">£ GBP</SelectItem>
                        <SelectItem value="CAD">$ CAD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Hourly Rate *</Label>
                    <div className="flex items-center">
                      <span className="border border-r-0 px-3 py-2 bg-muted text-sm rounded-l-md">$</span>
                      <Input
                        type="number"
                        value={formData.hourlyRate}
                        onChange={(e) => setFormData({ ...formData, hourlyRate: parseInt(e.target.value) || 0 })}
                        placeholder="15.00"
                        className="rounded-l-none"
                      />
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  <strong>Rate Guidelines:</strong> Max $20 (USD)<br />
                  Students select mentors based on ratings, badges, and competitive pricing.
                </p>
              </div>

              <div>
                <Label className="text-base font-semibold">Relevant Experience</Label>
                <Textarea
                  value={formData.relevantExperience}
                  onChange={(e) => setFormData({ ...formData, relevantExperience: e.target.value })}
                  placeholder="Describe your relevant experience, internships, projects, or achievements..."
                  rows={6}
                  className="mt-3"
                />
              </div>

              <div>
                <Label className="text-base font-semibold">Notable Achievements</Label>
                <p className="text-sm text-muted-foreground mb-3">Add your achievements one at a time (Academic honors, awards, certifications, leadership roles, etc.)</p>
                <div className="flex gap-2 mb-3">
                  <Input
                    value={formData.newAchievement}
                    onChange={(e) => setFormData({ ...formData, newAchievement: e.target.value })}
                    placeholder="Enter an achievement..."
                    onKeyPress={(e) => e.key === 'Enter' && addAchievement()}
                  />
                  <Button onClick={addAchievement}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add
                  </Button>
                </div>
                <div className="space-y-2">
                  {formData.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center justify-between bg-muted p-3 rounded">
                      <span className="text-sm">{achievement}</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeAchievement(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button variant="outline" onClick={handleCancel}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <div>
                <Label className="font-semibold">Hourly Rate:</Label>
                <p className="text-lg font-bold">${profile.hourlyRate} {profile.currency}</p>
              </div>
              <div>
                <Label className="font-semibold">Relevant Experience:</Label>
                <p className="text-sm mt-1">{profile.relevantExperience}</p>
              </div>
              <div>
                <Label className="font-semibold">Achievements:</Label>
                <div className="space-y-2 mt-2">
                  {profile.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm">{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">My Profile</h1>
        <p className="text-muted-foreground mt-2">Manage your mentor profile section by section</p>
      </div>

      <div className="space-y-6">
        <PersonalInfoSection />
        <AcademicExperienceSection />
        <MentoringServicesSection />
        <LanguagesAvailabilitySection />
        <PricingExperienceSection />
      </div>
    </div>
  );
}