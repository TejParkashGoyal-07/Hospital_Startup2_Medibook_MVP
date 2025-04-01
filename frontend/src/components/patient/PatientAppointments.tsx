
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { patient, Appointment } from "@/data/mock-data";
import { Calendar, Clock, Stethoscope } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

// For language support
const translations = {
  english: {
    noAppointments: "You don't have any appointments yet.",
    upcoming: "Upcoming",
    completed: "Completed",
    canceled: "Canceled",
    scheduled: "Scheduled",
    doctor: "Doctor",
    cancelAppointment: "Cancel Appointment",
    reschedule: "Reschedule",
    appointmentCanceled: "Appointment canceled successfully",
  },
  punjabi: {
    noAppointments: "ਤੁਹਾਡੇ ਕੋਲ ਅਜੇ ਕੋਈ ਅਪੌਇੰਟਮੈਂਟ ਨਹੀਂ ਹੈ।",
    upcoming: "ਆਉਣ ਵਾਲੀ",
    completed: "ਪੂਰੀ ਹੋਈ",
    canceled: "ਰੱਦ ਕੀਤੀ",
    scheduled: "ਨਿਰਧਾਰਿਤ",
    doctor: "ਡਾਕਟਰ",
    cancelAppointment: "ਅਪੌਇੰਟਮੈਂਟ ਰੱਦ ਕਰੋ",
    reschedule: "ਰੀਸ਼ੈਡਿਊਲ",
    appointmentCanceled: "ਅਪੌਇੰਟਮੈਂਟ ਸਫਲਤਾਪੂਰਵਕ ਰੱਦ ਕੀਤੀ ਗਈ",
  }
};

interface PatientAppointmentsProps {
  language: 'english' | 'punjabi';
}

const PatientAppointments = ({ language }: PatientAppointmentsProps) => {
  const t = translations[language];
  const [appointments, setAppointments] = useState<Appointment[]>(patient.appointments);

  const handleCancel = (id: string) => {
    const updatedAppointments = appointments.map(appointment => 
      appointment.id === id 
        ? { ...appointment, status: 'canceled' as const } 
        : appointment
    );
    setAppointments(updatedAppointments);
    toast.success(t.appointmentCanceled);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">{t.scheduled}</Badge>;
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 border-green-200">{t.completed}</Badge>;
      case 'canceled':
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">{t.canceled}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  if (appointments.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-gray-500">{t.noAppointments}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {appointments.map((appointment) => (
        <Card key={appointment.id} className="mb-4">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Stethoscope className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">{t.doctor}</p>
                    <h3 className="font-medium text-lg">Dr. Smith</h3>
                  </div>
                  {getStatusBadge(appointment.status)}
                </div>
                <p className="text-gray-500 mb-2">{appointment.reason}</p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span>{appointment.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span>{appointment.time}</span>
                  </div>
                </div>
              </div>
              
              {appointment.status === 'scheduled' && (
                <div className="mt-4 md:mt-0 flex gap-2 items-start md:items-end">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-gray-200 text-gray-500 hover:bg-gray-50"
                  >
                    {t.reschedule}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-red-200 text-red-500 hover:bg-red-50"
                    onClick={() => handleCancel(appointment.id)}
                  >
                    {t.cancelAppointment}
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PatientAppointments;
