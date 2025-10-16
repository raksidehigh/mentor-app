import { useState, useMemo } from 'react';
import { Mentor, FilterOptions } from '@/types/mentor';

export function useMentorFilters(mentors: Mentor[]) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({
    country: '',
    subject: '',
    university: '',
    minPrice: 0,
    maxPrice: 200,
    minRating: 0,
    sortBy: 'rating',
    sortOrder: 'desc'
  });

  const filteredMentors = useMemo(() => {
    let filtered = mentors.filter(mentor => {
      // Search query filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          mentor.name.toLowerCase().includes(query) ||
          mentor.university.toLowerCase().includes(query) ||
          mentor.subject.toLowerCase().includes(query) ||
          mentor.specialties.some(specialty => specialty.toLowerCase().includes(query));
        
        if (!matchesSearch) return false;
      }

      // Country filter
      if (filters.country && mentor.country !== filters.country) return false;

      // Subject filter
      if (filters.subject && mentor.subject !== filters.subject) return false;

      // University filter
      if (filters.university && mentor.university !== filters.university) return false;

      // Price range filter
      if (mentor.price < filters.minPrice || mentor.price > filters.maxPrice) return false;

      // Rating filter
      if (mentor.rating < filters.minRating) return false;

      return true;
    });

    // Sort the filtered results
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (filters.sortBy) {
        case 'price':
          comparison = a.price - b.price;
          break;
        case 'rating':
          comparison = a.rating - b.rating;
          break;
        case 'reviews':
          comparison = a.reviewCount - b.reviewCount;
          break;
        case 'experience':
          comparison = a.experience - b.experience;
          break;
        default:
          comparison = 0;
      }

      return filters.sortOrder === 'desc' ? -comparison : comparison;
    });

    return filtered;
  }, [mentors, searchQuery, filters]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.country) count++;
    if (filters.subject) count++;
    if (filters.university) count++;
    if (filters.minPrice > 0) count++;
    if (filters.maxPrice < 200) count++;
    if (filters.minRating > 0) count++;
    return count;
  }, [filters]);

  const clearFilters = () => {
    setFilters({
      country: '',
      subject: '',
      university: '',
      minPrice: 0,
      maxPrice: 200,
      minRating: 0,
      sortBy: 'rating',
      sortOrder: 'desc'
    });
    setSearchQuery('');
  };

  return {
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    filteredMentors,
    activeFilterCount,
    clearFilters
  };
}