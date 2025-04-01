
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarClock, MapPin, Star } from "lucide-react";
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

// Mock data for featured doctors
const featuredDoctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    location: "New York",
    rating: 4.9,
    reviews: 124,
    availability: "Available Today",
    image: "https://randomuser.me/api/portraits/women/32.jpg"
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Neurologist",
    location: "Chicago",
    rating: 4.8,
    reviews: 98,
    availability: "Available Tomorrow",
    image: "https://randomuser.me/api/portraits/men/44.jpg"
  },
  {
    id: 3,
    name: "Dr. Emily Wilson",
    specialty: "Dermatologist",
    location: "Los Angeles",
    rating: 4.7,
    reviews: 86,
    availability: "Available Today",
    image: "https://randomuser.me/api/portraits/women/68.jpg"
  },
  {
    id: 4,
    name: "Dr. James Rodriguez",
    specialty: "Orthopedic Surgeon",
    location: "Boston",
    rating: 4.9,
    reviews: 112,
    availability: "Available Tomorrow",
    image: "https://randomuser.me/api/portraits/men/75.jpg"
  }
];

const FeaturedDoctors = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Specialists</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Connect with our top-rated doctors who are experts in their fields and committed to providing the best care possible.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredDoctors.map((doctor) => (
            <Card key={doctor.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <Link to={`/doctors/${doctor.id}`}>
                <div className="p-6 flex flex-col items-center text-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <img src={doctor.image} alt={doctor.name} />
                  </Avatar>
                  <h3 className="font-medium text-lg text-gray-900">{doctor.name}</h3>
                  <p className="text-medical-teal font-medium">{getUserFriendlySpecialty(doctor.specialty)}</p>
                  
                  <div className="flex items-center mt-2 text-sm text-gray-500">
                    <MapPin size={14} className="mr-1" />
                    <span>{doctor.location}</span>
                  </div>
                  
                  <div className="flex items-center mt-1 text-sm">
                    <Star size={14} className="text-yellow-500 mr-1" />
                    <span className="font-medium">{doctor.rating}</span>
                    <span className="text-gray-500 ml-1">({doctor.reviews} reviews)</span>
                  </div>
                  
                  <div className="flex items-center mt-3 text-sm text-medical-blue">
                    <CalendarClock size={14} className="mr-1" />
                    <span>{doctor.availability}</span>
                  </div>
                </div>
              </Link>
              
              <div className="px-6 pb-6 pt-2">
                <Button 
                  className="w-full bg-medical-blue hover:bg-blue-600 text-white"
                  asChild
                >
                  <Link to={`/doctors/${doctor.id}`}>Book Appointment</Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button 
            variant="outline"
            className="border-medical-blue text-medical-blue hover:bg-medical-blue hover:text-white"
            asChild
          >
            <Link to="/doctors">View All Doctors</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDoctors;
