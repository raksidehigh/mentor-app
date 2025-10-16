import { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { MentorService } from '@/types/services';

interface ServiceFormProps {
  mode: 'create' | 'edit';
  service?: MentorService | null;
  onSave: (serviceData: Partial<MentorService>) => void;
  onCancel: () => void;
}

const serviceCategories = [
  'Research',
  'Career',
  'Workshop',
  'Academic Guidance',
  'Interview Prep',
  'Project Review',
  'Consultation'
];

export function ServiceForm({ mode, service, onSave, onCancel }: ServiceFormProps) {
  const [formData, setFormData] = useState({
    title: service?.title || '',
    description: service?.description || '',
    category: service?.category || '',
    duration: service?.duration || 60,
    price: service?.price || 50,
    currency: service?.currency || 'USD',
    isActive: service?.isActive ?? true,
    maxStudents: service?.maxStudents || 1,
    requirements: service?.requirements || [],
    deliverables: service?.deliverables || []
  });

  const [newRequirement, setNewRequirement] = useState('');
  const [newDeliverable, setNewDeliverable] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.category) {
      return;
    }

    onSave({
      title: formData.title,
      description: formData.description,
      category: formData.category,
      duration: formData.duration,
      price: formData.price,
      currency: formData.currency,
      isActive: formData.isActive,
      maxStudents: formData.maxStudents > 1 ? formData.maxStudents : undefined,
      requirements: formData.requirements.length > 0 ? formData.requirements : undefined,
      deliverables: formData.deliverables.length > 0 ? formData.deliverables : undefined
    });
  };

  const addRequirement = () => {
    if (newRequirement.trim()) {
      setFormData(prev => ({
        ...prev,
        requirements: [...prev.requirements, newRequirement.trim()]
      }));
      setNewRequirement('');
    }
  };

  const removeRequirement = (index: number) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index)
    }));
  };

  const addDeliverable = () => {
    if (newDeliverable.trim()) {
      setFormData(prev => ({
        ...prev,
        deliverables: [...prev.deliverables, newDeliverable.trim()]
      }));
      setNewDeliverable('');
    }
  };

  const removeDeliverable = (index: number) => {
    setFormData(prev => ({
      ...prev,
      deliverables: prev.deliverables.filter((_, i) => i !== index)
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <Card>
        <CardContent className="p-4 space-y-4">
          <h3 className="font-semibold">Basic Information</h3>
          
          <div className="space-y-2">
            <Label htmlFor="title">Service Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="e.g., AI Research Mentorship"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe what you'll provide in this service..."
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select 
              value={formData.category} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {serviceCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Pricing & Duration */}
      <Card>
        <CardContent className="p-4 space-y-4">
          <h3 className="font-semibold">Pricing & Duration</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Select 
                value={formData.duration.toString()} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, duration: Number(value) }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="45">45 minutes</SelectItem>
                  <SelectItem value="60">60 minutes</SelectItem>
                  <SelectItem value="90">90 minutes</SelectItem>
                  <SelectItem value="120">120 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price (USD)</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: Number(e.target.value) }))}
                min="1"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="maxStudents">Maximum Students</Label>
            <Select 
              value={formData.maxStudents.toString()} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, maxStudents: Number(value) }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1-on-1 Session</SelectItem>
                <SelectItem value="2">Up to 2 students</SelectItem>
                <SelectItem value="4">Up to 4 students</SelectItem>
                <SelectItem value="6">Up to 6 students</SelectItem>
                <SelectItem value="10">Up to 10 students</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Requirements */}
      <Card>
        <CardContent className="p-4 space-y-4">
          <h3 className="font-semibold">Requirements (Optional)</h3>
          <p className="text-sm text-muted-foreground">
            What should students prepare or know before booking this service?
          </p>
          
          <div className="flex gap-2">
            <Input
              value={newRequirement}
              onChange={(e) => setNewRequirement(e.target.value)}
              placeholder="e.g., Basic Python knowledge"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addRequirement())}
            />
            <Button type="button" variant="outline" onClick={addRequirement}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {formData.requirements.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {formData.requirements.map((req, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {req}
                  <X 
                    className="h-3 w-3 cursor-pointer hover:text-destructive" 
                    onClick={() => removeRequirement(index)}
                  />
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Deliverables */}
      <Card>
        <CardContent className="p-4 space-y-4">
          <h3 className="font-semibold">Deliverables (Optional)</h3>
          <p className="text-sm text-muted-foreground">
            What will students receive after the session?
          </p>
          
          <div className="flex gap-2">
            <Input
              value={newDeliverable}
              onChange={(e) => setNewDeliverable(e.target.value)}
              placeholder="e.g., Session notes and resources"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addDeliverable())}
            />
            <Button type="button" variant="outline" onClick={addDeliverable}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {formData.deliverables.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {formData.deliverables.map((deliverable, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {deliverable}
                  <X 
                    className="h-3 w-3 cursor-pointer hover:text-destructive" 
                    onClick={() => removeDeliverable(index)}
                  />
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Status */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Service Status</h3>
              <p className="text-sm text-muted-foreground">
                Active services are visible to students
              </p>
            </div>
            <Switch
              checked={formData.isActive}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))}
            />
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {mode === 'create' ? 'Create Service' : 'Save Changes'}
        </Button>
      </div>
    </form>
  );
}