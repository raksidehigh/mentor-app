import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { Header } from "./components/Header";
import MentorDashboard from "./pages/MentorDashboard";
import MentorProfile from "./pages/mentor/MentorProfile";
// import { MessageCenter } from "./components/mentor/messaging/MessageCenter";
// import { ServiceManagement } from "./components/mentor/services/ServiceManagement";
import { AvailabilityManagement } from "./components/mentor/availability/AvailabilityManagement";
import { ChatSystem } from "./components/mentor/ChatSystem";
import { TrainingCenter } from "./components/mentor/TrainingCenter";
import { SessionExperience } from "./components/mentor/SessionExperience";
import { ViewAsStudent } from "./components/mentor/ViewAsStudent";
import Settings from "./pages/Settings";
import SignIn from "./pages/SignIn";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename="/new-design-dashboards/mentor-dashboard">
          <Routes>
            <Route path="/view-as-student" element={<ViewAsStudent onBack={() => window.history.back()} />} />
            <Route path="/*" element={
              <div className="min-h-screen bg-background">
                <Header />
                <main className="flex-1">
                  <Routes>
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    <Route path="/dashboard" element={<MentorDashboard />} />
                    <Route path="/profile" element={
                      <div className="page-enter">
                        <MentorProfile />
                      </div>
                    } />
                    {/* <Route path="/services" element={<ServiceManagement />} /> */}
                    <Route path="/availability" element={
                      <div className="page-enter">
                        <AvailabilityManagement />
                      </div>
                    } />
                    <Route path="/messages" element={
                      <div className="container mx-auto px-4 py-6 page-enter">
                        <div className="mb-6 content-enter">
                          <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
                          <p className="text-muted-foreground">Communicate with your students</p>
                        </div>
                        <div className="card-enter stagger-1">
                          <ChatSystem />
                        </div>
                      </div>
                    } />
                    <Route path="/training" element={<TrainingCenter />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/session/:sessionId" element={
                      <SessionExperience 
                        sessionId="123"
                        studentName="Sarah Johnson"
                        studentAvatar="/assets/student-1.png"
                        topic="Career Guidance Session"
                        duration={60}
                        onEndSession={() => window.history.back()}
                      />
                    } />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
              </div>
            } />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
