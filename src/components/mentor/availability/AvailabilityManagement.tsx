import { useState } from 'react';
import { Calendar, Clock, Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { mockAvailability, mockTimeSlots } from '@/data/services';
import { Availability, TimeSlot } from '@/types/services';

export function AvailabilityManagement() {
  const { toast } = useToast();
  const [availability, setAvailability] = useState<Availability>(mockAvailability);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>(mockTimeSlots);
  const [showSlotForm, setShowSlotForm] = useState(false);
  const [editingSlot, setEditingSlot] = useState<TimeSlot | null>(null);

  const [newSlot, setNewSlot] = useState({
    date: '',
    startTime: '',
    endTime: '',
    serviceTypes: [] as string[],
    maxBookings: 1,
    notes: '',
    isRecurring: false,
    recurringDays: [] as string[]
  });

  const daysOfWeek = [
    { key: 'monday', label: 'Monday' },
    { key: 'tuesday', label: 'Tuesday' },
    { key: 'wednesday', label: 'Wednesday' },
    { key: 'thursday', label: 'Thursday' },
    { key: 'friday', label: 'Friday' },
    { key: 'saturday', label: 'Saturday' },
    { key: 'sunday', label: 'Sunday' }
  ];

  const handleWorkingHourChange = (day: string, field: 'startTime' | 'endTime' | 'isAvailable', value: string | boolean) => {
    setAvailability(prev => ({
      ...prev,
      workingHours: prev.workingHours.map(wh => 
        wh.day === day ? { ...wh, [field]: value } : wh
      )
    }));
  };

  const handleSaveSlot = () => {
    if (!newSlot.date || !newSlot.startTime || !newSlot.endTime) {
      toast({
        title: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }

    const slot: TimeSlot = {
      id: `slot_${Date.now()}`,
      mentorId: 'current-mentor-id',
      date: newSlot.date,
      startTime: newSlot.startTime,
      endTime: newSlot.endTime,
      isAvailable: true,
      isRecurring: newSlot.isRecurring,
      recurringDays: newSlot.isRecurring ? newSlot.recurringDays : undefined,
      maxBookings: newSlot.maxBookings,
      currentBookings: 0,
      serviceTypes: newSlot.serviceTypes,
      notes: newSlot.notes
    };

    if (editingSlot) {
      setTimeSlots(prev => prev.map(s => s.id === editingSlot.id ? { ...slot, id: editingSlot.id } : s));
      toast({
        title: "Time slot updated",
        description: "Your availability has been updated successfully"
      });
    } else {
      setTimeSlots(prev => [...prev, slot]);
      toast({
        title: "Time slot created",
        description: "New availability slot has been added"
      });
    }

    setShowSlotForm(false);
    setEditingSlot(null);
    setNewSlot({
      date: '',
      startTime: '',
      endTime: '',
      serviceTypes: [],
      maxBookings: 1,
      notes: '',
      isRecurring: false,
      recurringDays: []
    });
  };

  const handleEditSlot = (slot: TimeSlot) => {
    setEditingSlot(slot);
    setNewSlot({
      date: slot.date,
      startTime: slot.startTime,
      endTime: slot.endTime,
      serviceTypes: slot.serviceTypes,
      maxBookings: slot.maxBookings,
      notes: slot.notes || '',
      isRecurring: slot.isRecurring,
      recurringDays: slot.recurringDays || []
    });
    setShowSlotForm(true);
  };

  const handleDeleteSlot = (slotId: string) => {
    setTimeSlots(prev => prev.filter(s => s.id !== slotId));
    toast({
      title: "Time slot deleted",
      description: "The availability slot has been removed"
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString([], { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Availability Management</h1>
          <p className="text-muted-foreground">Manage your schedule and time slots</p>
        </div>

        <Dialog open={showSlotForm} onOpenChange={setShowSlotForm}>
          <DialogTrigger asChild>
            <Button onClick={() => setShowSlotForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Time Slot
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingSlot ? 'Edit Time Slot' : 'Create New Time Slot'}
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Date *</Label>
                  <Input
                    type="date"
                    value={newSlot.date}
                    onChange={(e) => setNewSlot(prev => ({ ...prev, date: e.target.value }))}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Max Bookings</Label>
                  <Select 
                    value={newSlot.maxBookings.toString()} 
                    onValueChange={(value) => setNewSlot(prev => ({ ...prev, maxBookings: Number(value) }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 booking</SelectItem>
                      <SelectItem value="2">2 bookings</SelectItem>
                      <SelectItem value="4">4 bookings</SelectItem>
                      <SelectItem value="6">6 bookings</SelectItem>
                      <SelectItem value="10">10 bookings</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Time *</Label>
                  <Input
                    type="time"
                    value={newSlot.startTime}
                    onChange={(e) => setNewSlot(prev => ({ ...prev, startTime: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>End Time *</Label>
                  <Input
                    type="time"
                    value={newSlot.endTime}
                    onChange={(e) => setNewSlot(prev => ({ ...prev, endTime: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Notes</Label>
                <Input
                  value={newSlot.notes}
                  onChange={(e) => setNewSlot(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Optional notes about this time slot"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={newSlot.isRecurring}
                    onCheckedChange={(checked) => setNewSlot(prev => ({ ...prev, isRecurring: checked }))}
                  />
                  <Label>Recurring weekly</Label>
                </div>
              </div>

              {newSlot.isRecurring && (
                <div className="space-y-2">
                  <Label>Recurring Days</Label>
                  <div className="flex flex-wrap gap-2">
                    {daysOfWeek.map((day) => (
                      <Button
                        key={day.key}
                        variant={newSlot.recurringDays.includes(day.key) ? "default" : "outline"}
                        size="sm"
                        type="button"
                        onClick={() => {
                          setNewSlot(prev => ({
                            ...prev,
                            recurringDays: prev.recurringDays.includes(day.key)
                              ? prev.recurringDays.filter(d => d !== day.key)
                              : [...prev.recurringDays, day.key]
                          }));
                        }}
                      >
                        {day.label.slice(0, 3)}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button variant="outline" onClick={() => setShowSlotForm(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveSlot}>
                  <Save className="h-4 w-4 mr-2" />
                  {editingSlot ? 'Update' : 'Create'} Slot
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="schedule" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="schedule">Weekly Schedule</TabsTrigger>
          <TabsTrigger value="slots">Time Slots</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Weekly Schedule */}
        <TabsContent value="schedule" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Weekly Working Hours
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {availability.workingHours.map((workingHour) => (
                <div key={workingHour.day} className="flex items-center gap-4 p-4 border rounded-lg">
                  <div className="w-24">
                    <span className="font-medium capitalize">{workingHour.day}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={workingHour.isAvailable}
                      onCheckedChange={(checked) => handleWorkingHourChange(workingHour.day, 'isAvailable', checked)}
                    />
                    <span className="text-sm text-muted-foreground">Available</span>
                  </div>

                  {workingHour.isAvailable && (
                    <>
                      <div className="flex items-center gap-2">
                        <Label className="text-sm">From:</Label>
                        <Input
                          type="time"
                          value={workingHour.startTime}
                          onChange={(e) => handleWorkingHourChange(workingHour.day, 'startTime', e.target.value)}
                          className="w-32"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <Label className="text-sm">To:</Label>
                        <Input
                          type="time"
                          value={workingHour.endTime}
                          onChange={(e) => handleWorkingHourChange(workingHour.day, 'endTime', e.target.value)}
                          className="w-32"
                        />
                      </div>
                    </>
                  )}
                </div>
              ))}

              <div className="flex justify-end pt-4 border-t">
                <Button onClick={() => {
                  toast({
                    title: "Working hours updated",
                    description: "Your weekly schedule has been saved"
                  });
                }}>
                  Save Working Hours
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Time Slots */}
        <TabsContent value="slots" className="mt-6">
          <div className="space-y-4">
            {timeSlots.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Clock className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">No time slots</h3>
                  <p className="text-muted-foreground mb-4">Create your first time slot to start accepting bookings</p>
                  <Button onClick={() => setShowSlotForm(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Time Slot
                  </Button>
                </CardContent>
              </Card>
            ) : (
              timeSlots.map((slot) => (
                <Card key={slot.id} className={`${!slot.isAvailable ? 'opacity-60' : ''}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <div className="font-semibold">{formatDate(slot.date)}</div>
                          <div className="text-sm text-muted-foreground">
                            {slot.startTime} - {slot.endTime}
                          </div>
                        </div>

                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2">
                            <Badge variant={slot.isAvailable ? "default" : "secondary"}>
                              {slot.isAvailable ? 'Available' : 'Booked'}
                            </Badge>
                            {slot.isRecurring && (
                              <Badge variant="outline">Recurring</Badge>
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {slot.currentBookings}/{slot.maxBookings} bookings
                          </div>
                        </div>

                        {slot.notes && (
                          <div className="text-sm text-muted-foreground max-w-xs">
                            {slot.notes}
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditSlot(slot)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteSlot(slot.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        {/* Settings */}
        <TabsContent value="settings" className="mt-6">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Booking Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Timezone</Label>
                    <Select value={availability.timezone} onValueChange={(value) => 
                      setAvailability(prev => ({ ...prev, timezone: value }))
                    }>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="EST">Eastern Time (EST)</SelectItem>
                        <SelectItem value="PST">Pacific Time (PST)</SelectItem>
                        <SelectItem value="GMT">Greenwich Mean Time (GMT)</SelectItem>
                        <SelectItem value="CET">Central European Time (CET)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Advance Booking (days)</Label>
                    <Input
                      type="number"
                      value={availability.advanceBookingDays}
                      onChange={(e) => setAvailability(prev => ({ 
                        ...prev, 
                        advanceBookingDays: Number(e.target.value) 
                      }))}
                      min="1"
                      max="90"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Buffer Time (minutes between sessions)</Label>
                  <Select 
                    value={availability.bufferTime.toString()} 
                    onValueChange={(value) => setAvailability(prev => ({ 
                      ...prev, 
                      bufferTime: Number(value) 
                    }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">No buffer</SelectItem>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Cancellation Policy</Label>
                  <textarea
                    value={availability.cancellationPolicy}
                    onChange={(e) => setAvailability(prev => ({ 
                      ...prev, 
                      cancellationPolicy: e.target.value 
                    }))}
                    className="w-full p-3 border rounded-md resize-none"
                    rows={3}
                    placeholder="Describe your cancellation policy..."
                  />
                </div>

                <div className="flex justify-end pt-4 border-t">
                  <Button onClick={() => {
                    toast({
                      title: "Settings updated",
                      description: "Your booking settings have been saved"
                    });
                  }}>
                    Save Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}