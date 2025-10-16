import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MessageCircle, Calendar, Briefcase, User, Menu, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';

export function Header() {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const unreadMessages = 3;

  const navigationItems = [
    {
      to: '/dashboard',
      icon: User,
      label: 'Dashboard',
      badge: null
    },
    {
      to: '/profile',
      icon: Briefcase,
      label: 'Profile',
      badge: null
    },
    {
      to: '/services',
      icon: Calendar,
      label: 'Services',
      badge: null
    },
    {
      to: '/availability',
      icon: Clock,
      label: 'Availability',
      badge: null
    },
    {
      to: '/messages',
      icon: MessageCircle,
      label: 'Messages',
      badge: unreadMessages > 0 ? unreadMessages : null
    }
  ];

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const NavItems = () => (
    <>
      {navigationItems.map((item) => {
        const Icon = item.icon;
        const active = isActive(item.to);
        
        return (
          <Link
            key={item.to}
            to={item.to}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors relative ${
              active 
                ? 'bg-primary text-primary-foreground' 
                : 'hover:bg-secondary text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Icon className="h-4 w-4" />
            <span className="font-medium">{item.label}</span>
            {item.badge && (
              <Badge 
                variant="destructive" 
                className="h-5 w-5 p-0 text-xs flex items-center justify-center"
              >
                {item.badge}
              </Badge>
            )}
          </Link>
        );
      })}
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-2">
            <img 
              src="/assets/logo.png" 
              alt="EDUMENTOR" 
              className="h-8"
            />
            <span className="font-semibold text-lg">Mentor</span>
          </Link>

          {!isMobile && (
            <nav className="flex items-center gap-2">
              <NavItems />
            </nav>
          )}

          {isMobile && (
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="relative">
                  <Menu className="h-5 w-5" />
                  {unreadMessages > 0 && (
                    <Badge 
                      variant="destructive" 
                      className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs flex items-center justify-center"
                    >
                      {unreadMessages}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <div className="flex items-center justify-between mb-6">
                  <span className="font-semibold">Navigation</span>
                </div>
                <nav className="flex flex-col gap-2">
                  <NavItems />
                </nav>
              </SheetContent>
            </Sheet>
          )}

          <div className="flex items-center gap-4">
            {!isMobile && (
              <Button variant="ghost" size="sm" asChild>
                <Link to="/signin">Sign Out</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
