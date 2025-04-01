
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Appointment } from "@/data/mock-data";
import { toast } from "sonner";
import { Calendar, Clock, User, Check, X } from "lucide-react";

// For language support
const translations = {
  english: {
    noAppointments: "No upcoming appointments found.",
    complete: "Complete",
    cancel: "Cancel",
    appointmentCompleted: "Appointment marked as completed",
    appointmentCanceled: "Appointment canceled",
  },
  punjabi: {
    noAppointments: "ਕੋਈ ਆਉਣ ਵਾਲੀਆਂ ਅਪੌਇੰਟਮੈਂਟਾਂ ਨਹੀਂ ਮਿਲੀਆਂ।",
    complete: "ਪੂਰਾ ਕਰੋ",
    cancel: "ਰੱਦ ਕਰੋ",
    appointmentCompleted: "ਅਪੌਇੰਟਮੈਂਟ ਪੂਰੀ ਹੋਈ ਵਜੋਂ ਚਿੰਨ੍ਹਿਤ",
    appointmentCanceled: "ਅਪੌਇੰਟਮੈਂਟ ਰੱਦ ਕੀਤੀ ਗਈ",
  }
};

interface AppointmentListProps {
  appointments: Appointment[];
  language: 'english' | 'punjabi';
}

const AppointmentList = ({ appointments, language = 'english' }: AppointmentListProps) => {
  const t = translations[language];

  const handleComplete = (id: string) => {
    toast.success(t.appointmentCompleted);
    // In a real app, this would update the appointment status via API
  };

  const handleCancel = (id: string) => {
    toast.info(t.appointmentCanceled);
    // In a real app, this would update the appointment status via API
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
    <>
      {appointments.map((appointment) => (
        <Card key={appointment.id} className="mb-4">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <User className="h-5 w-5 text-gray-500" />
                  <h3 className="font-medium text-lg">{appointment.patientName}</h3>
                  <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                    {appointment.status}
                  </Badge>
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
              <div className="mt-4 md:mt-0 flex md:flex-col gap-2 items-start md:items-end">
                <Button
                  size="sm"
                  className="bg-green-500 hover:bg-green-600 text-white"
                  onClick={() => handleComplete(appointment.id)}
                >
                  <Check className="mr-1 h-4 w-4" /> {t.complete}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-red-200 text-red-500 hover:bg-red-50"
                  onClick={() => handleCancel(appointment.id)}
                >
                  <X className="mr-1 h-4 w-4" /> {t.cancel}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default AppointmentList;
