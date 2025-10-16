import { useState } from 'react';
import { Plus, Edit, Trash2, Eye, EyeOff, Clock, Users, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { mockMentorServices } from '@/data/services';
import { MentorService } from '@/types/services';
import { ServiceForm } from './ServiceForm';

export function ServiceManagement() {
  const { toast } = useToast();
  const [services, setServices] = useState<MentorService[]>(mockMentorServices);
  const [selectedService, setSelectedService] = useState<MentorService | null>(null);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');

  const handleToggleService = (serviceId: string, isActive: boolean) => {
    setServices(prev => prev.map(service => 
      service.id === serviceId ? { ...service, isActive } : service
    ));
    
    toast({
      title: isActive ? "Service activated" : "Service deactivated",
      description: isActive 
        ? "Your service is now visible to students"
        : "Your service is hidden from students"
    });
  };

  const handleDeleteService = (serviceId: string) => {
    setServices(prev => prev.filter(service => service.id !== serviceId));
    toast({
      title: "Service deleted",
      description: "The service has been removed from your offerings"
    });
  };

  const handleCreateService = () => {
    setFormMode('create');
    setSelectedService(null);
    setShowServiceForm(true);
  };

  const handleEditService = (service: MentorService) => {
    setFormMode('edit');
    setSelectedService(service);
    setShowServiceForm(true);
  };

  const activeServices = services.filter(s => s.isActive);
  const inactiveServices = services.filter(s => !s.isActive);

  const ServiceCard = ({ service }: { service: MentorService }) => (
    <Card className={`transition-all ${service.isActive ? 'border-primary/20' : 'opacity-60'}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2 flex items-center gap-2">
              {service.title}
              {!service.isActive && <EyeOff className="h-4 w-4 text-muted-foreground" />}
            </CardTitle>
            <Badge variant="secondary" className="mb-2">
              {service.category}
            </Badge>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">
              ${service.price}
            </div>
            <div className="text-xs text-muted-foreground">{service.duration}min</div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {service.description}
        </p>

        {/* Service Details */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{service.duration} minutes</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>{service.maxStudents ? `Max ${service.maxStudents}` : '1-on-1'}</span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <span>${service.price} {service.currency}</span>
          </div>
          <div className="flex items-center gap-2">
            {service.isActive ? (
              <Eye className="h-4 w-4 text-accent" />
            ) : (
              <EyeOff className="h-4 w-4 text-muted-foreground" />
            )}
            <span>{service.isActive ? 'Active' : 'Inactive'}</span>
          </div>
        </div>

        {/* Requirements */}
        {service.requirements && service.requirements.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-2">Requirements:</h4>
            <div className="flex flex-wrap gap-1">
              {service.requirements.slice(0, 2).map((req, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {req}
                </Badge>
              ))}
              {service.requirements.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{service.requirements.length - 2} more
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Active:</span>
            <Switch
              checked={service.isActive}
              onCheckedChange={(checked) => handleToggleService(service.id, checked)}
            />
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleEditService(service)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDeleteService(service.id)}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Service Management</h1>
          <p className="text-muted-foreground">Manage your mentoring services and offerings</p>
        </div>
        
        <Dialog open={showServiceForm} onOpenChange={setShowServiceForm}>
          <DialogTrigger asChild>
            <Button onClick={handleCreateService}>
              <Plus className="h-4 w-4 mr-2" />
              Add New Service
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {formMode === 'create' ? 'Create New Service' : 'Edit Service'}
              </DialogTitle>
            </DialogHeader>
            <ServiceForm
              mode={formMode}
              service={selectedService}
              onSave={(serviceData) => {
                if (formMode === 'create') {
                  const newService: MentorService = {
                    id: `service_${Date.now()}`,
                    mentorId: 'current-mentor-id',
                    title: serviceData.title || '',
                    description: serviceData.description || '',
                    category: serviceData.category || '',
                    duration: serviceData.duration || 60,
                    price: serviceData.price || 50,
                    currency: serviceData.currency || 'USD',
                    isActive: serviceData.isActive ?? true,
                    maxStudents: serviceData.maxStudents,
                    requirements: serviceData.requirements,
                    deliverables: serviceData.deliverables,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                  };
                  setServices(prev => [...prev, newService]);
                  toast({
                    title: "Service created",
                    description: "Your new service is now available to students"
                  });
                } else if (selectedService) {
                  setServices(prev => prev.map(service =>
                    service.id === selectedService.id
                      ? { ...service, ...serviceData, updatedAt: new Date().toISOString() }
                      : service
                  ));
                  toast({
                    title: "Service updated",
                    description: "Your service has been successfully updated"
                  });
                }
                setShowServiceForm(false);
              }}
              onCancel={() => setShowServiceForm(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Services</p>
                <p className="text-2xl font-bold">{services.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <Eye className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Services</p>
                <p className="text-2xl font-bold">{activeServices.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 bg-warning/10 rounded-lg flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg. Price</p>
                <p className="text-2xl font-bold">
                  ${services.length > 0 ? Math.round(services.reduce((sum, s) => sum + s.price, 0) / services.length) : 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                <Clock className="h-5 w-5 text-secondary-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg. Duration</p>
                <p className="text-2xl font-bold">
                  {services.length > 0 ? Math.round(services.reduce((sum, s) => sum + s.duration, 0) / services.length) : 0}m
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Services Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">
            All Services ({services.length})
          </TabsTrigger>
          <TabsTrigger value="active">
            Active ({activeServices.length})
          </TabsTrigger>
          <TabsTrigger value="inactive">
            Inactive ({inactiveServices.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
            {services.length === 0 && (
              <div className="col-span-full text-center py-12">
                <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">No services yet</h3>
                <p className="text-muted-foreground mb-4">Create your first service to start mentoring students</p>
                <Button onClick={handleCreateService}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Service
                </Button>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="active" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
            {activeServices.length === 0 && (
              <div className="col-span-full text-center py-12">
                <EyeOff className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">No active services</h3>
                <p className="text-muted-foreground">Activate your services to make them visible to students</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="inactive" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {inactiveServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
            {inactiveServices.length === 0 && (
              <div className="col-span-full text-center py-12">
                <Eye className="h-12 w-12 mx-auto mb-4 text-accent" />
                <h3 className="text-lg font-semibold mb-2">All services are active</h3>
                <p className="text-muted-foreground">Great! All your services are currently visible to students</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}