
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { doctors } from "@/data/mock-data";
import { Clock, MapPin, Phone, Mail, User, Users } from "lucide-react";

// For language support
const translations = {
  english: {
    noDoctors: "No doctors found matching your criteria.",
    available: "Available",
    notAvailable: "Not Available",
    defaultAvailable: "Available (Default)",
    bookAppointment: "Book Appointment",
    experience: "years experience",
    currentPatients: "Patients in queue",
    estimatedWait: "Est. wait time",
    minutes: "min",
  },
  punjabi: {
    noDoctors: "ਤੁਹਾਡੇ ਮਾਪਦੰਡਾਂ ਨਾਲ ਮੇਲ ਖਾਂਦੇ ਕੋਈ ਡਾਕਟਰ ਨਹੀਂ ਮਿਲੇ।",
    available: "ਉਪਲਬਧ",
    notAvailable: "ਉਪਲਬਧ ਨਹੀਂ",
    defaultAvailable: "ਉਪਲਬਧ (ਡਿਫੌਲਟ)",
    bookAppointment: "ਅਪੌਇੰਟਮੈਂਟ ਬੁੱਕ ਕਰੋ",
    experience: "ਸਾਲ ਦਾ ਤਜਰਬਾ",
    currentPatients: "ਕਤਾਰ ਵਿੱਚ ਮਰੀਜ਼",
    estimatedWait: "ਅਨੁਮਾਨਿਤ ਉਡੀਕ ਸਮਾਂ",
    minutes: "ਮਿੰਟ",
  }
};

interface DoctorListProps {
  onBookAppointment: (doctorId: string) => void;
  showOnlyAvailable: boolean;
  language: 'english' | 'punjabi';
}

const DoctorList = ({ onBookAppointment, showOnlyAvailable, language }: DoctorListProps) => {
  const t = translations[language];
  const [filteredDoctors, setFilteredDoctors] = useState(doctors);
  const [queueSizes, setQueueSizes] = useState<{[key: string]: number}>({});

  useEffect(() => {
    let filtered = [...doctors];
    
    // Filter by availability if required
    if (showOnlyAvailable) {
      filtered = filtered.filter(doctor => doctor.isOnline);
    }

    // Sort by availability (online first)
    filtered.sort((a, b) => {
      if (a.isOnline && !b.isOnline) return -1;
      if (!a.isOnline && b.isOnline) return 1;
      return 0;
    });

    setFilteredDoctors(filtered);
    
    // Generate random queue sizes for doctors
    const newQueueSizes: {[key: string]: number} = {};
    doctors.forEach(doctor => {
      newQueueSizes[doctor.id] = Math.floor(Math.random() * 10);
    });
    setQueueSizes(newQueueSizes);
  }, [showOnlyAvailable]);

  const getAvailabilityStatus = (doctor: any) => {
    // Check if the doctor's availability was updated within the last hour
    const lastUpdate = new Date(doctor.lastAvailabilityUpdate);
    const now = new Date();
    const hoursPassed = (now.getTime() - lastUpdate.getTime()) / (1000 * 60 * 60);
    
    if (hoursPassed >= 1) {
      // Default to available if not updated in the last hour
      return { status: true, text: t.defaultAvailable };
    }
    
    return { 
      status: doctor.isOnline, 
      text: doctor.isOnline ? t.available : t.notAvailable 
    };
  };

  if (filteredDoctors.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-gray-500">{t.noDoctors}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      {filteredDoctors.map((doctor) => {
        const availability = getAvailabilityStatus(doctor);
        const queueSize = queueSizes[doctor.id] || 0;
        const estimatedWaitTime = queueSize * 15; // 15 minutes per patient
        
        return (
          <Card key={doctor.id} className="overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/4 p-6 flex justify-center items-start">
                <img
                  src={doctor.imageUrl}
                  alt={doctor.name}
                  className="w-32 h-32 object-cover rounded-full"
                />
              </div>
              <div className="w-full md:w-3/4 p-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                  <div>
                    <h3 className="text-xl font-bold">{doctor.name}</h3>
                    <p className="text-gray-500">{doctor.specialty}</p>
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      availability.status
                        ? "bg-green-100 text-green-800 border-green-200"
                        : "bg-gray-100 text-gray-800 border-gray-200"
                    }
                  >
                    {availability.text}
                  </Badge>
                </div>

                <p className="text-gray-700 mb-4 line-clamp-2">{doctor.bio}</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{doctor.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{doctor.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{doctor.experience} {t.experience}</span>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mt-4">
                  <div className="flex gap-4">
                    {availability.status && (
                      <>
                        <div className="text-center">
                          <div className="flex items-center">
                            <Users className="h-4 w-4 text-blue-500 mr-1" />
                            <span className="font-bold text-lg">{queueSize}</span>
                          </div>
                          <p className="text-xs text-gray-500">{t.currentPatients}</p>
                        </div>
                        
                        <div className="text-center">
                          <div className="font-bold text-lg">{estimatedWaitTime} {t.minutes}</div>
                          <p className="text-xs text-gray-500">{t.estimatedWait}</p>
                        </div>
                      </>
                    )}
                  </div>

                  <Button
                    onClick={() => onBookAppointment(doctor.id)}
                    className="w-full md:w-auto bg-medical-blue hover:bg-blue-600"
                    disabled={!availability.status}
                  >
                    {t.bookAppointment}
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default DoctorList;
