import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { 
  User, Bell, Shield, CreditCard, Globe, 
  ArrowLeft, Save
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Settings() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-6 space-y-6 page-enter">
      {/* Header */}
      <div className="flex items-center space-x-4 content-enter">
        <Button variant="ghost" onClick={() => navigate(-1)} className="button-scale">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage your account preferences and settings</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Account Settings */}
        <Card className="card-hover card-enter stagger-1">
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="h-5 w-5 mr-2" />
              Account Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" defaultValue="John Doe" className="hover-scale" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" defaultValue="john.doe@example.com" className="hover-scale" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" defaultValue="+1 (555) 123-4567" className="hover-scale" />
            </div>
            <Button className="w-full button-scale">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="card-hover card-enter stagger-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="h-5 w-5 mr-2" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive booking updates via email</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>SMS Notifications</Label>
                <p className="text-sm text-muted-foreground">Get session reminders via SMS</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Marketing Emails</Label>
                <p className="text-sm text-muted-foreground">Receive promotional content</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Security */}
        <Card className="card-hover card-enter stagger-3">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              Privacy & Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Profile Visibility</Label>
                <p className="text-sm text-muted-foreground">Show profile to students</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Online Status</Label>
                <p className="text-sm text-muted-foreground">Show when you're online</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <Button variant="outline" className="w-full button-scale">
              Change Password
            </Button>
            <Button variant="outline" className="w-full button-scale">
              Two-Factor Authentication
            </Button>
          </CardContent>
        </Card>

        {/* Payment Settings */}
        <Card className="card-hover card-enter stagger-4">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CreditCard className="h-5 w-5 mr-2" />
              Payment Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Payout Method</Label>
              <div className="p-3 border rounded-lg hover-scale">
                <p className="font-medium">Bank Transfer</p>
                <p className="text-sm text-muted-foreground">****1234</p>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Currency</Label>
              <Input defaultValue="USD" className="hover-scale" />
            </div>
            <Button variant="outline" className="w-full button-scale">
              Update Payment Method
            </Button>
          </CardContent>
        </Card>

        {/* Language & Region */}
        <Card className="card-hover card-enter stagger-5">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="h-5 w-5 mr-2" />
              Language & Region
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Language</Label>
              <Input defaultValue="English" className="hover-scale" />
            </div>
            <div className="space-y-2">
              <Label>Time Zone</Label>
              <Input defaultValue="Pacific Standard Time (PST)" className="hover-scale" />
            </div>
            <div className="space-y-2">
              <Label>Date Format</Label>
              <Input defaultValue="MM/DD/YYYY" className="hover-scale" />
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-red-200 card-hover card-enter stagger-1">
          <CardHeader>
            <CardTitle className="text-red-600">Danger Zone</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50 button-scale">
              Deactivate Account
            </Button>
            <Button variant="destructive" className="w-full button-scale">
              Delete Account
            </Button>
            <p className="text-xs text-muted-foreground">
              These actions cannot be undone. Please be certain.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
