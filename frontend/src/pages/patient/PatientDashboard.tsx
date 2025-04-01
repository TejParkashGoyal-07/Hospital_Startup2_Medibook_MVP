
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { doctors } from "@/data/mock-data";
import DoctorList from "@/components/patient/DoctorList";
import PatientAppointments from "@/components/patient/PatientAppointments";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// For language support
const translations = {
  english: {
    title: "Patient Dashboard",
    greeting: "Hello",
    findDoctors: "Find Doctors",
    myAppointments: "My Appointments",
    showOnlyAvailable: "Show only available doctors",
    bookAppointment: "Book an Appointment",
    yourTurn: "Your Turn",
    waitingFor: "You are waiting for",
    peopleAhead: "people ahead of you",
    currentDoctor: "Current Doctor",
    estimatedWait: "Estimated wait time",
    minutes: "minutes",
  },
  punjabi: {
    title: "ਮਰੀਜ਼ ਡੈਸ਼ਬੋਰਡ",
    greeting: "ਹੈਲੋ",
    findDoctors: "ਡਾਕਟਰ ਲੱਭੋ",
    myAppointments: "ਮੇਰੀਆਂ ਅਪੌਇੰਟਮੈਂਟਾਂ",
    showOnlyAvailable: "ਸਿਰਫ ਉਪਲਬਧ ਡਾਕਟਰ ਦਿਖਾਓ",
    bookAppointment: "ਅਪੌਇੰਟਮੈਂਟ ਬੁੱਕ ਕਰੋ",
    yourTurn: "ਤੁਹਾਡੀ ਵਾਰੀ",
    waitingFor: "ਤੁਸੀਂ ਉਡੀਕ ਕਰ ਰਹੇ ਹੋ",
    peopleAhead: "ਲੋਕ ਤੁਹਾਡੇ ਅੱਗੇ",
    currentDoctor: "ਮੌਜੂਦਾ ਡਾਕਟਰ",
    estimatedWait: "ਅਨੁਮਾਨਿਤ ਉਡੀਕ ਸਮਾਂ",
    minutes: "ਮਿੰਟ",
  }
};

const PatientDashboard = () => {
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);
  const [language, setLanguage] = useState<'english' | 'punjabi'>('english');
  const t = translations[language];
  const [patientInfo, setPatientInfo] = useState<any>(null);
  const [turnNumber, setTurnNumber] = useState<number | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [peopleAhead, setPeopleAhead] = useState(0);

  useEffect(() => {
    // Load patient info from local storage
    const storedInfo = localStorage.getItem('patientInfo');
    if (storedInfo) {
      setPatientInfo(JSON.parse(storedInfo));
    }

    // Simulate getting a turn number
    if (!turnNumber && selectedDoctor) {
      const newTurnNumber = Math.floor(Math.random() * 10) + 1;
      setTurnNumber(newTurnNumber);
      
      // Simulate people ahead based on turn number
      setPeopleAhead(newTurnNumber - 1);
      
      // Simulate queue moving
      const interval = setInterval(() => {
        setPeopleAhead(prev => {
          if (prev <= 0) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 10000); // Decrease by 1 every 10 seconds
      
      return () => clearInterval(interval);
    }
  }, [selectedDoctor]);

  const handleBookAppointment = (doctorId: string) => {
    const doctor = doctors.find(doc => doc.id === doctorId);
    setSelectedDoctor(doctor);
    
    // Assign a turn number if we don't have one yet
    if (!turnNumber) {
      const newTurnNumber = Math.floor(Math.random() * 10) + 1;
      setTurnNumber(newTurnNumber);
      setPeopleAhead(newTurnNumber - 1);
    }
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'english' ? 'punjabi' : 'english');
  };

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">{t.title}</h1>
            {patientInfo && (
              <p className="text-gray-500">
                {t.greeting}, {patientInfo.name}
              </p>
            )}
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

        {turnNumber && selectedDoctor && (
          <Card className="mb-6 bg-blue-50 border-blue-200">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold mb-2">{t.yourTurn}: #{turnNumber}</h2>
                  <p className="text-gray-700">
                    {t.waitingFor} {peopleAhead} {t.peopleAhead}
                  </p>
                  <p className="text-gray-700 mt-1">
                    {t.currentDoctor}: {selectedDoctor.name}
                  </p>
                </div>
                <div className="mt-4 md:mt-0 text-center">
                  <div className="text-4xl font-bold text-blue-600">{peopleAhead * 15}</div>
                  <div className="text-sm text-gray-500">{t.estimatedWait} ({t.minutes})</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="findDoctors" className="w-full">
          <TabsList className="w-full mb-6">
            <TabsTrigger value="findDoctors" className="flex-1">{t.findDoctors}</TabsTrigger>
            <TabsTrigger value="appointments" className="flex-1">{t.myAppointments}</TabsTrigger>
          </TabsList>

          <TabsContent value="findDoctors">
            <div className="flex items-center mb-4 justify-end">
              <Switch
                id="available-only"
                checked={showOnlyAvailable}
                onCheckedChange={setShowOnlyAvailable}
              />
              <Label htmlFor="available-only" className="ml-2">
                {t.showOnlyAvailable}
              </Label>
            </div>
            
            <DoctorList 
              onBookAppointment={handleBookAppointment} 
              showOnlyAvailable={showOnlyAvailable}
              language={language}
            />
          </TabsContent>

          <TabsContent value="appointments">
            <PatientAppointments language={language} />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default PatientDashboard;
