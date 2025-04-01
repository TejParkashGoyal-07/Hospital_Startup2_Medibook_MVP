
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from 'sonner';
import { Doctor } from '@/data/mock-data';

// For language support
const translations = {
  english: {
    doctorProfile: "Doctor Profile",
    editProfile: "Edit Profile",
    cancel: "Cancel",
    fullName: "Full Name",
    specialty: "Specialty",
    email: "Email",
    phoneNumber: "Phone Number",
    address: "Address",
    biography: "Biography",
    saveChanges: "Save Changes",
    experience: "Years Experience",
    education: "Education"
  },
  punjabi: {
    doctorProfile: "ਡਾਕਟਰ ਪ੍ਰੋਫਾਈਲ",
    editProfile: "ਪ੍ਰੋਫਾਈਲ ਸੰਪਾਦਿਤ ਕਰੋ",
    cancel: "ਰੱਦ ਕਰੋ",
    fullName: "ਪੂਰਾ ਨਾਮ",
    specialty: "ਵਿਸ਼ੇਸ਼ਤਾ",
    email: "ਈਮੇਲ",
    phoneNumber: "ਫੋਨ ਨੰਬਰ",
    address: "ਪਤਾ",
    biography: "ਜੀਵਨੀ",
    saveChanges: "ਤਬਦੀਲੀਆਂ ਸੁਰੱਖਿਅਤ ਕਰੋ",
    experience: "ਸਾਲਾਂ ਦਾ ਤਜਰਬਾ",
    education: "ਸਿੱਖਿਆ"
  }
};

interface DoctorProfileProps {
  doctor: Doctor;
  language: 'english' | 'punjabi';
}

const DoctorProfile = ({ doctor, language }: DoctorProfileProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: doctor.name,
    specialty: doctor.specialty,
    bio: doctor.bio,
    email: doctor.email,
    phone: doctor.phone,
    address: doctor.address
  });

  const t = translations[language];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would update the doctor's profile in the database
    toast.success("Profile updated successfully");
    setIsEditing(false);
    
    // In a real application, we would update the server
    // fetch('/api/doctors/profile', { method: 'PUT', body: JSON.stringify(formData) })
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{t.doctorProfile}</span>
          <Button 
            variant="outline" 
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? t.cancel : t.editProfile}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">{t.fullName}</Label>
                <Input 
                  id="name" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="specialty">{t.specialty}</Label>
                <Input 
                  id="specialty" 
                  name="specialty" 
                  value={formData.specialty} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{t.email}</Label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">{t.phoneNumber}</Label>
                <Input 
                  id="phone" 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">{t.address}</Label>
                <Input 
                  id="address" 
                  name="address" 
                  value={formData.address} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="bio">{t.biography}</Label>
                <Textarea 
                  id="bio" 
                  name="bio" 
                  value={formData.bio} 
                  onChange={handleChange} 
                  className="min-h-32" 
                  required 
                />
              </div>
            </div>
            <Button type="submit" className="mt-4">{t.saveChanges}</Button>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center">
              <img 
                src={doctor.imageUrl} 
                alt={doctor.name} 
                className="w-24 h-24 rounded-full object-cover mr-6" 
              />
              <div>
                <h2 className="text-xl font-bold">{doctor.name}</h2>
                <p className="text-medical-teal">{doctor.specialty}</p>
                <p className="text-gray-500">{doctor.experience} {t.experience}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 mt-6">
              <div>
                <h3 className="font-semibold text-gray-500">{t.email}</h3>
                <p>{doctor.email}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-500">{t.phoneNumber}</h3>
                <p>{doctor.phone}</p>
              </div>
              <div className="md:col-span-2">
                <h3 className="font-semibold text-gray-500">{t.address}</h3>
                <p>{doctor.address}</p>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-500 mb-2">{t.biography}</h3>
              <p className="text-gray-700">{doctor.bio}</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-500 mb-2">{t.education}</h3>
              <ul className="list-disc list-inside space-y-1">
                {doctor.education.map((edu, index) => (
                  <li key={index} className="text-gray-700">{edu}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DoctorProfile;
