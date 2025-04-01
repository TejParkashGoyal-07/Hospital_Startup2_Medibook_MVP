
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { doctors } from "@/data/mock-data";
import { toast } from "sonner";
import { Edit, Trash2, Plus, CheckCircle, XCircle } from "lucide-react";

// For language support
const translations = {
  english: {
    name: "Name",
    specialty: "Specialty",
    status: "Status",
    actions: "Actions",
    available: "Available",
    unavailable: "Not Available",
    addDoctor: "Add Doctor",
    editDoctor: "Edit Doctor",
    deleteDoctor: "Delete Doctor",
    cancel: "Cancel",
    save: "Save",
    confirm: "Confirm",
    deleteConfirm: "Are you sure you want to delete this doctor?",
    deleteWarning: "This action cannot be undone.",
    addSuccess: "Doctor added successfully",
    updateSuccess: "Doctor updated successfully",
    deleteSuccess: "Doctor deleted successfully",
    doctorName: "Doctor Name",
    doctorSpecialty: "Specialty",
    doctorEmail: "Email",
    doctorPhone: "Phone",
  },
  punjabi: {
    name: "ਨਾਮ",
    specialty: "ਵਿਸ਼ੇਸ਼ਤਾ",
    status: "ਸਥਿਤੀ",
    actions: "ਕਾਰਵਾਈਆਂ",
    available: "ਉਪਲਬਧ",
    unavailable: "ਉਪਲਬਧ ਨਹੀਂ",
    addDoctor: "ਡਾਕਟਰ ਸ਼ਾਮਲ ਕਰੋ",
    editDoctor: "ਡਾਕਟਰ ਸੰਪਾਦਿਤ ਕਰੋ",
    deleteDoctor: "ਡਾਕਟਰ ਹਟਾਓ",
    cancel: "ਰੱਦ ਕਰੋ",
    save: "ਸੁਰੱਖਿਅਤ ਕਰੋ",
    confirm: "ਪੁਸ਼ਟੀ ਕਰੋ",
    deleteConfirm: "ਕੀ ਤੁਸੀਂ ਨਿਸ਼ਚਤ ਹੋ ਕਿ ਤੁਸੀਂ ਇਸ ਡਾਕਟਰ ਨੂੰ ਹਟਾਉਣਾ ਚਾਹੁੰਦੇ ਹੋ?",
    deleteWarning: "ਇਹ ਕਾਰਵਾਈ ਰੱਦ ਨਹੀਂ ਕੀਤੀ ਜਾ ਸਕਦੀ।",
    addSuccess: "ਡਾਕਟਰ ਸਫਲਤਾਪੂਰਵਕ ਸ਼ਾਮਲ ਕੀਤਾ ਗਿਆ",
    updateSuccess: "ਡਾਕਟਰ ਸਫਲਤਾਪੂਰਵਕ ਅਪਡੇਟ ਕੀਤਾ ਗਿਆ",
    deleteSuccess: "ਡਾਕਟਰ ਸਫਲਤਾਪੂਰਵਕ ਹਟਾ ਦਿੱਤਾ ਗਿਆ",
    doctorName: "ਡਾਕਟਰ ਦਾ ਨਾਮ",
    doctorSpecialty: "ਵਿਸ਼ੇਸ਼ਤਾ",
    doctorEmail: "ਈਮੇਲ",
    doctorPhone: "ਫੋਨ",
  }
};

interface DoctorManagementProps {
  language: 'english' | 'punjabi';
}

const DoctorManagement = ({ language }: DoctorManagementProps) => {
  const t = translations[language];
  
  const [doctorList, setDoctorList] = useState(doctors);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    specialty: "",
    email: "",
    phone: "",
    imageUrl: "https://randomuser.me/api/portraits/men/32.jpg", // Default image
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddDoctor = () => {
    // In a real app, this would be an API call
    const newDoctor = {
      id: `doc-${Date.now()}`,
      name: formData.name,
      specialty: formData.specialty,
      email: formData.email,
      phone: formData.phone,
      imageUrl: formData.imageUrl,
      isOnline: true,
      lastAvailabilityUpdate: new Date().toISOString(),
      bio: `Dr. ${formData.name} is a ${formData.specialty}`,
      address: "123 Medical Plaza",
      experience: 5,
      education: ["Medical University"],
      stats: {
        todayAppointments: 0,
        totalPatients: 0,
        averageAppointmentTime: 30,
        completedAppointments: 0
      },
      appointments: []
    };
    
    setDoctorList(prev => [...prev, newDoctor]);
    toast.success(t.addSuccess);
    setIsAddDialogOpen(false);
    resetForm();
  };

  const handleEditDoctor = () => {
    // In a real app, this would be an API call
    const updatedDoctors = doctorList.map(doctor => 
      doctor.id === selectedDoctor.id 
        ? { 
            ...doctor, 
            name: formData.name, 
            specialty: formData.specialty,
            email: formData.email,
            phone: formData.phone
          } 
        : doctor
    );
    
    setDoctorList(updatedDoctors);
    toast.success(t.updateSuccess);
    setIsEditDialogOpen(false);
    resetForm();
  };

  const handleDeleteDoctor = () => {
    // In a real app, this would be an API call
    const filteredDoctors = doctorList.filter(doctor => doctor.id !== selectedDoctor.id);
    setDoctorList(filteredDoctors);
    toast.success(t.deleteSuccess);
    setIsDeleteDialogOpen(false);
  };

  const selectDoctorForEdit = (doctor: any) => {
    setSelectedDoctor(doctor);
    setFormData({
      name: doctor.name,
      specialty: doctor.specialty,
      email: doctor.email || "",
      phone: doctor.phone || "",
      imageUrl: doctor.imageUrl
    });
    setIsEditDialogOpen(true);
  };

  const selectDoctorForDelete = (doctor: any) => {
    setSelectedDoctor(doctor);
    setIsDeleteDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      specialty: "",
      email: "",
      phone: "",
      imageUrl: "https://randomuser.me/api/portraits/men/32.jpg"
    });
    setSelectedDoctor(null);
  };

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              {t.addDoctor}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t.addDoctor}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">{t.doctorName}</Label>
                <Input 
                  id="name" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="specialty">{t.doctorSpecialty}</Label>
                <Input 
                  id="specialty" 
                  name="specialty" 
                  value={formData.specialty} 
                  onChange={handleChange} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{t.doctorEmail}</Label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">{t.doctorPhone}</Label>
                <Input 
                  id="phone" 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleChange} 
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                {t.cancel}
              </Button>
              <Button onClick={handleAddDoctor}>
                {t.save}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {doctorList.map(doctor => (
          <Card key={doctor.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img 
                  src={doctor.imageUrl} 
                  alt={doctor.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-medium">{doctor.name}</h3>
                  <p className="text-sm text-gray-500">{doctor.specialty}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="flex items-center mr-4">
                  {doctor.isOnline ? (
                    <CheckCircle className="h-5 w-5 text-green-500 mr-1" />
                  ) : (
                    <XCircle className="h-5 w-5 text-gray-400 mr-1" />
                  )}
                  <span className="text-sm">
                    {doctor.isOnline ? t.available : t.unavailable}
                  </span>
                </div>
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => selectDoctorForEdit(doctor)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => selectDoctorForDelete(doctor)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Edit Doctor Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.editDoctor}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">{t.doctorName}</Label>
              <Input 
                id="edit-name" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-specialty">{t.doctorSpecialty}</Label>
              <Input 
                id="edit-specialty" 
                name="specialty" 
                value={formData.specialty} 
                onChange={handleChange} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-email">{t.doctorEmail}</Label>
              <Input 
                id="edit-email" 
                name="email" 
                type="email" 
                value={formData.email} 
                onChange={handleChange} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-phone">{t.doctorPhone}</Label>
              <Input 
                id="edit-phone" 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange} 
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              {t.cancel}
            </Button>
            <Button onClick={handleEditDoctor}>
              {t.save}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Doctor Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.deleteDoctor}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>{t.deleteConfirm}</p>
            <p className="text-sm text-gray-500 mt-2">{t.deleteWarning}</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              {t.cancel}
            </Button>
            <Button variant="destructive" onClick={handleDeleteDoctor}>
              {t.confirm}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DoctorManagement;
