
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { doctor as mockDoctor } from "@/data/mock-data";
import AppointmentList from "@/components/doctor/AppointmentList";
import DoctorProfile from "@/components/doctor/DoctorProfile";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Clock, CalendarDays } from "lucide-react";
import PatientQueue from "@/components/doctor/PatientQueue";

// For language support
const translations = {
  english: {
    title: "Doctor Dashboard",
    greeting: "Welcome back",
    availabilityStatus: "Availability Status",
    available: "Available",
    unavailable: "Not Available",
    toggleAvailability: "Toggle Availability",
    appointments: "Appointments",
    patientQueue: "Patient Queue",
    profile: "Profile",
    todayAppointments: "Today's Appointments",
    totalPatients: "Total Patients",
    nextHourAvailability: "Next Hour Availability",
    minutes: "minutes",
    statusOn: "You are now available to patients",
    statusOff: "You are now marked as unavailable",
    defaultStatus: "Your status has been reset to available (default)",
    lastUpdate: "Last update",
  },
  punjabi: {
    title: "ਡਾਕਟਰ ਡੈਸ਼ਬੋਰਡ",
    greeting: "ਵਾਪਸ ਸਵਾਗਤ ਹੈ",
    availabilityStatus: "ਉਪਲਬਧਤਾ ਸਥਿਤੀ",
    available: "ਉਪਲਬਧ",
    unavailable: "ਉਪਲਬਧ ਨਹੀਂ",
    toggleAvailability: "ਉਪਲਬਧਤਾ ਟੌਗਲ ਕਰੋ",
    appointments: "ਅਪੌਇੰਟਮੈਂਟਾਂ",
    patientQueue: "ਮਰੀਜ਼ ਕਤਾਰ",
    profile: "ਪ੍ਰੋਫਾਈਲ",
    todayAppointments: "ਅੱਜ ਦੀਆਂ ਅਪੌਇੰਟਮੈਂਟਾਂ",
    totalPatients: "ਕੁੱਲ ਮਰੀਜ਼",
    nextHourAvailability: "ਅਗਲੇ ਘੰਟੇ ਦੀ ਉਪਲਬਧਤਾ",
    minutes: "ਮਿੰਟ",
    statusOn: "ਤੁਸੀਂ ਹੁਣ ਮਰੀਜ਼ਾਂ ਲਈ ਉਪਲਬਧ ਹੋ",
    statusOff: "ਤੁਸੀਂ ਹੁਣ ਅਣਉਪਲਬਧ ਵਜੋਂ ਚਿੰਨ੍ਹਿਤ ਹੋ",
    defaultStatus: "ਤੁਹਾਡੀ ਸਥਿਤੀ ਉਪਲਬਧ (ਡਿਫੌਲਟ) ਵਿੱਚ ਰੀਸੈੱਟ ਕੀਤੀ ਗਈ ਹੈ",
    lastUpdate: "ਆਖਰੀ ਅਪਡੇਟ",
  }
};

const DoctorDashboard = () => {
  const [name, setName] = useState<string | null>(null);
  const [doctor, setDoctor] = useState(mockDoctor);
  const [language, setLanguage] = useState<'english' | 'punjabi'>('english');
  const t = translations[language];
  const [queue, setQueue] = useState<Array<{id: string, name: string, turnNumber: number}>>([]);
  const [lastUpdateTime, setLastUpdateTime] = useState<Date>(new Date());
  const [timeUntilReset, setTimeUntilReset] = useState<number>(60);
  const [doctorName, setDoctorName] = useState<string | null>(null);

  useEffect(() => {
    const storedDoctorName = localStorage.getItem("doctorName");
    if (storedDoctorName) {
      setDoctorName(storedDoctorName);
    }
  }, []);
  useEffect(() => {
    
  
    //bringDoctorName(email);
    // Generate random patient queue for demo
    const generateRandomQueue = () => {
      const queueSize = Math.floor(Math.random() * 5) + 1;
      const newQueue = Array.from({ length: queueSize }, (_, index) => ({
        id: `patient-${Date.now()}-${index}`,
        name: `Patient ${index + 1}`,
        turnNumber: index + 1
      }));
      setQueue(newQueue);
    };
    
    generateRandomQueue();
    
    // Check if last update was more than an hour ago
    const checkAvailabilityStatus = () => {
      const now = new Date();
      const lastUpdate = new Date(doctor.lastAvailabilityUpdate);
      const hoursPassed = (now.getTime() - lastUpdate.getTime()) / (1000 * 60 * 60);
      
      if (hoursPassed >= 1) {
        // Reset to available if not updated in the last hour
        setDoctor(prev => ({
          ...prev,
          isOnline: true,
          lastAvailabilityUpdate: now.toISOString()
        }));
        toast.info(t.defaultStatus);
      }
      
      // Update countdown timer
      const minutesPassed = (now.getTime() - lastUpdate.getTime()) / (1000 * 60);
      const minutesRemaining = Math.max(0, 60 - minutesPassed);
      setTimeUntilReset(Math.floor(minutesRemaining));
    };
    
    checkAvailabilityStatus();
    
    // Set up interval to check status and countdown
    const statusInterval = setInterval(checkAvailabilityStatus, 60000);
    const countdownInterval = setInterval(() => {
      setTimeUntilReset(prev => Math.max(0, prev - 1));
    }, 60000);
    
    return () => {
      clearInterval(statusInterval);
      clearInterval(countdownInterval);
    };
  }, [doctor.lastAvailabilityUpdate]);
  // const bringDoctorName = async (email) => {
  //   try {
  //     if (!email) {
  //       throw new Error("No email found in localStorage");
  //     }
      
  //     const response = await fetch(`http://localhost:5000/api/auth/doctors/${email}`);
  //     if (!response.ok) {
  //       throw new Error("Failed to fetch doctor's name");
  //     }
  
  //     const data = await response.json();
  //     console.log("Doctor data:", data); // Log the doctor data
  
  //     if (data.name) {
  //       setDoctorName(data.name); // Store the doctor's name
  //     } else {
  //       throw new Error("Doctor name not found in response");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching doctor name:", error);
  //     toast.error(error.message);
  //   }
  // };
  
  
  const toggleAvailability = () => {
    const now = new Date();
    setDoctor(prev => ({
      ...prev,
      isOnline: !prev.isOnline,
      lastAvailabilityUpdate: now.toISOString()
    }));
    setLastUpdateTime(now);
    setTimeUntilReset(60);
    
    toast.success(doctor.isOnline ? t.statusOff : t.statusOn);
  };

  const nextPatient = () => {
    if (queue.length > 0) {
      const updatedQueue = [...queue];
      updatedQueue.shift(); // Remove first patient
      setQueue(updatedQueue);
      toast.success("Called next patient");
    }
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'english' ? 'punjabi' : 'english');
  };

  const formatLastUpdateTime = () => {
    const now = new Date();
    const lastUpdate = new Date(doctor.lastAvailabilityUpdate);
    const minutesPassed = Math.floor((now.getTime() - lastUpdate.getTime()) / (1000 * 60));
    
    if (minutesPassed < 1) return "Just now";
    if (minutesPassed === 1) return "1 minute ago";
    return `${minutesPassed} minutes ago`;
  };

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">{t.title}</h1>
            <p className="text-gray-500">
            {t.greeting}, Dr. {doctorName ? doctorName : "Unknown"}
            </p>
          </div>
          <div>
            <Button 
              variant="outline" 
              onClick={toggleLanguage}
            >
              {language === 'english' ? 'ਪੰਜਾਬੀ' : 'English'}
            </Button>
          </div>
        </div>

        {/* Availability Status Card */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold mb-2">{t.availabilityStatus}</h2>
                <div className="flex items-center">
                  <Badge 
                    className={doctor.isOnline ? 
                      "bg-green-100 text-green-800 border-green-200" : 
                      "bg-gray-100 text-gray-800 border-gray-200"
                    }
                  >
                    {doctor.isOnline ? t.available : t.unavailable}
                  </Badge>
                  <span className="ml-2 text-sm text-gray-500">
                    {t.lastUpdate}: {formatLastUpdateTime()}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {t.nextHourAvailability}: {timeUntilReset} {t.minutes}
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="availability" 
                    checked={doctor.isOnline}
                    onCheckedChange={toggleAvailability}
                  />
                  <Label htmlFor="availability">{t.toggleAvailability}</Label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {t.todayAppointments}
              </CardTitle>
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{doctor.stats.todayAppointments}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {t.totalPatients}
              </CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{doctor.stats.totalPatients}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {t.patientQueue}
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{queue.length}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="queue" className="w-full">
          <TabsList className="w-full mb-6">
            <TabsTrigger value="queue" className="flex-1">{t.patientQueue}</TabsTrigger>
            <TabsTrigger value="appointments" className="flex-1">{t.appointments}</TabsTrigger>
            <TabsTrigger value="profile" className="flex-1">{t.profile}</TabsTrigger>
          </TabsList>

          <TabsContent value="queue">
            <PatientQueue 
              queue={queue} 
              onNextPatient={nextPatient} 
              language={language}
            />
          </TabsContent>

          <TabsContent value="appointments">
            <AppointmentList 
              appointments={doctor.appointments} 
              language={language}
            />
          </TabsContent>

          <TabsContent value="profile">
            <DoctorProfile doctor={doctor} language={language} />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default DoctorDashboard;
