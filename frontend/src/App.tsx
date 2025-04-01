
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import PatientDashboard from "./pages/patient/PatientDashboard";
import Login from "./pages/auth/Login";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp"; // Using actual file name SignUp.tsx
import PatientInfo from "./pages/patient/PatientInfo";
import AdminDashboard from "./pages/admin/AdminDashboard";
import { LanguageProvider } from "./contexts/LanguageContext";
import CompleteProfile from "./components/patient/CompleteProfile";
import PatientDisease from "./pages/patient/PateintDiseaseForm";


const queryClient = new QueryClient();

const App = () => (
  
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        
        <Toaster 
        
        />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
            <Route path="/patient-dashboard" element={<PatientDashboard />} />
            <Route path="/patient/info" element={<PatientInfo />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/complete-profile" element={<CompleteProfile />} />
            <Route path="/dashboard-doctor" element={<DoctorDashboard />} />
            <Route path="/dashboard-patient" element={<PatientDashboard />} />
            <Route path="/dashboard-patient-info" element={<PatientInfo />} />
            <Route path='/patient-disease' element={<PatientDisease/>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
