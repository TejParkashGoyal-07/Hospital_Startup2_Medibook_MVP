import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const CompleteProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const [formData, setFormData] = useState({
    disease: "",
    doctor: "",
    age: "",
    gender: "Male",
  });

  const [doctors, setDoctors] = useState([]);
  const [diseases, setDiseases] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch doctors and diseases from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const doctorsRes = await axios.get("http://localhost:5000/doctors");
        const diseasesRes = await axios.get("http://localhost:5000/diseases");

        setDoctors(doctorsRes.data);
        setDiseases(diseasesRes.data);
      } catch (error) {
        toast.error("Failed to load data");
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdateProfile = async () => {
    if (!formData.disease || !formData.doctor || !formData.age || !formData.gender) {
      toast.error("Please complete all fields");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/auth/update-profile", { email, ...formData });
      toast.success(response.data.message);
      navigate("/dashboard");
    } catch (error) {
      toast.error("Failed to update profile");
    }
    setIsLoading(false);
  };

  return (
    <div className="container max-w-md mx-auto py-12">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Complete Your Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Select Disease</Label>
            <select name="disease" value={formData.disease} onChange={handleChange} className="w-full p-2 border rounded-md">
              <option value="" disabled>Select a disease</option>
              {diseases.map((disease) => (
                <option key={disease.id} value={disease.name}>
                  {disease.name}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label>Organ Specialist</Label>
            <select name="doctor" value={formData.doctor} onChange={handleChange} className="w-full p-2 border rounded-md">
              <option value="" disabled>Select a specialist</option>
              {doctors.map((doctor) => (
                <option key={doctor.id} value={doctor.name}>
                  {doctor.name} - {doctor.specialization}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label>Age</Label>
            <Input type="number" name="age" value={formData.age} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label>Gender</Label>
            <select name="gender" value={formData.gender} onChange={handleChange} className="w-full p-2 border rounded-md">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <Button onClick={handleUpdateProfile} className="w-full" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save & Continue"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompleteProfile;
