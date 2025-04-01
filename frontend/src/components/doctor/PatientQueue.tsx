
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, User } from "lucide-react";

// For language support
const translations = {
  english: {
    patientQueue: "Patient Queue",
    noPatients: "No patients in queue",
    nextPatient: "Next Patient",
    turnNumber: "Turn #",
  },
  punjabi: {
    patientQueue: "ਮਰੀਜ਼ ਕਤਾਰ",
    noPatients: "ਕਤਾਰ ਵਿੱਚ ਕੋਈ ਮਰੀਜ਼ ਨਹੀਂ",
    nextPatient: "ਅਗਲਾ ਮਰੀਜ਼",
    turnNumber: "ਵਾਰੀ #",
  }
};

interface PatientQueueProps {
  queue: Array<{id: string, name: string, turnNumber: number}>;
  onNextPatient: () => void;
  language: 'english' | 'punjabi';
}

const PatientQueue = ({ queue, onNextPatient, language }: PatientQueueProps) => {
  const t = translations[language];

  if (queue.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-gray-500">{t.noPatients}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{t.patientQueue}</h2>
        <Button onClick={onNextPatient} className="bg-medical-teal hover:bg-teal-600">
          <Check className="mr-2 h-4 w-4" />
          {t.nextPatient}
        </Button>
      </div>

      <div className="grid gap-4">
        {queue.map((patient, index) => (
          <Card 
            key={patient.id} 
            className={index === 0 ? "border-green-300 bg-green-50" : ""}
          >
            <CardContent className="pt-6 pb-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    index === 0 ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                  }`}>
                    <User className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">{patient.name}</p>
                    <p className="text-sm text-gray-500">{t.turnNumber}{patient.turnNumber}</p>
                  </div>
                </div>
                {index === 0 && (
                  <Button 
                    size="sm" 
                    onClick={onNextPatient}
                    className="bg-green-500 hover:bg-green-600"
                  >
                    {t.nextPatient}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PatientQueue;
