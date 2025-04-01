
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarCheck, MapPin, Star } from "lucide-react";
import { Link } from "react-router-dom";

// User-friendly specialty mapping
const specialtyMapping: Record<string, string> = {
  "Cardiologist": "Heart's Doctor (Cardiologist)",
  "Neurologist": "Brain's Doctor (Neurologist)",
  "Dermatologist": "Skin's Doctor (Dermatologist)",
  "Orthopedic Surgeon": "Bone's Doctor (Orthopedic Surgeon)",
  "Pediatrician": "Children's Doctor (Pediatrician)",
  "Gynecologist": "Women's Health Doctor (Gynecologist)",
  "Ophthalmologist": "Eye's Doctor (Ophthalmologist)",
  "ENT Specialist": "Ear, Nose & Throat Doctor (ENT Specialist)",
  "Psychiatrist": "Mental Health Doctor (Psychiatrist)",
  "Urologist": "Urinary System Doctor (Urologist)"
};

// Helper function to get user-friendly specialty name
const getUserFriendlySpecialty = (specialty: string): string => {
  return specialtyMapping[specialty] || specialty;
};

export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  location: string;
  rating: number;
  reviews: number;
  experience: string;
  availability: string;
  price: string;
  image: string;
}

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard = ({ doctor }: DoctorCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <div className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <Avatar className="h-20 w-20">
              <img src={doctor.image} alt={doctor.name} />
            </Avatar>
            
            <div className="flex-1">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <h3 className="font-medium text-lg text-gray-900">{doctor.name}</h3>
                <Badge className="bg-medical-sky text-white hover:bg-medical-sky">{getUserFriendlySpecialty(doctor.specialty)}</Badge>
              </div>
              
              <div className="flex items-center mt-1 text-sm">
                <Star size={14} className="text-yellow-500 mr-1" />
                <span className="font-medium">{doctor.rating}</span>
                <span className="text-gray-500 ml-1">({doctor.reviews} reviews)</span>
              </div>
              
              <div className="flex items-center mt-1 text-sm text-gray-500">
                <MapPin size={14} className="mr-1" />
                <span>{doctor.location}</span>
              </div>
              
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                <div className="flex items-center">
                  <span className="font-medium mr-2">Experience:</span>
                  <span className="text-gray-600">{doctor.experience}</span>
                </div>
                <div className="flex items-center text-medical-blue">
                  <CalendarCheck size={14} className="mr-1" />
                  <span>{doctor.availability}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-4 border-t border-gray-100">
            <div className="text-lg font-medium">
              {doctor.price} <span className="text-sm text-gray-500 font-normal">per visit</span>
            </div>
            <Button 
              className="bg-medical-blue hover:bg-blue-600 text-white"
              asChild
            >
              <Link to={`/doctors/${doctor.id}`}>Book Appointment</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DoctorCard;
