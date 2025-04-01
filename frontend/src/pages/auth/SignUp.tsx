import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";
import Layout from "@/components/layout/Layout";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Eye, EyeOff } from "lucide-react"; // Icons for show/hide password

const SignUp = () => {
  
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    userType: "patient",
    agreeToTerms: false,

    // Doctor-specific fields
    specialization: "",
    experience: "",
    availableFrom: "",
    availableTo: "",
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleUserTypeChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      userType: value,
      specialization: "",
      experience: "",
      availableFrom: "",
      availableTo: "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!formData.fullName || !formData.email || !formData.phone || !formData.password) {
      toast.error("Please fill in all required fields");
      return;
    }
  
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
  
    let endpoint = "http://localhost:5000/api/auth/signup";
    let userData: any = {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      userType: formData.userType,
      
    };
    // Function to save email to localStorage
    
    
   
    if (formData.userType === "doctor") {
      const name = formData.fullName;

    // Store email in localStorage if it exists
    
      localStorage.setItem('doctorName', name);
      if (!formData.specialization || !formData.experience || !formData.availableFrom || !formData.availableTo) {
        toast.error("Please fill in all doctor-specific details");
        return;
      }
  
      endpoint = "http://localhost:5000/api/auth/doctors/signup-doctor";
      userData = {
        ...userData,
        specialization: formData.specialization,
        experience: formData.experience,
        availableFrom: formData.availableFrom,
        availableTo: formData.availableTo,
      };
    }
  
    setIsLoading(true);
  
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        toast.success(data.message);
        navigate(formData.userType === "doctor" ? "/dashboard-doctor" :"/dashboard-patient-info");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  
  
  

  return (
    <Layout>
      <div className="container max-w-md mx-auto py-12">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Create an Account</CardTitle>
            <CardDescription className="text-center">Enter your information to create an account</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {/* Name, Email, Phone Fields */}
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" name="fullName" type="text" value={formData.fullName} onChange={handleChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} />
              </div>

              {/* Password Fields */}
              <div className="space-y-2 relative">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input id="password" name="password" type={showPassword ? "text" : "password"} value={formData.password} onChange={handleChange} />
                  <button type="button" className="absolute right-3 top-3" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="space-y-2 relative">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input id="confirmPassword" name="confirmPassword" type={showConfirmPassword ? "text" : "password"} value={formData.confirmPassword} onChange={handleChange} />
                  <button type="button" className="absolute right-3 top-3" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* User Type Selection */}
              <div className="space-y-2">
                <Label>User Type</Label>
                <RadioGroup value={formData.userType} onValueChange={handleUserTypeChange} className="flex gap-4">
                  <RadioGroupItem value="patient" id="patient" />
                  <Label htmlFor="patient">Patient</Label>
                  <RadioGroupItem value="doctor" id="doctor" />
                  <Label htmlFor="doctor">Doctor</Label>
                </RadioGroup>
              </div>

              {/* Doctor-Specific Fields */}
              {formData.userType === "doctor" && (
                <div className="space-y-4 border-t pt-4">
                  <div className="space-y-2">
                    <Label>Specialization</Label>
                    <Input type="text" name="specialization" value={formData.specialization} onChange={handleChange} placeholder="e.g., Cardiologist" />
                  </div>
                  <div className="space-y-2">
                    <Label>Years of Experience</Label>
                    <Input type="number" name="experience" value={formData.experience} onChange={handleChange} placeholder="e.g., 5" />
                  </div>
                  <div className="space-y-2">
                    <Label>Available From</Label>
                    <Input type="time" name="availableFrom" value={formData.availableFrom} onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label>Available To</Label>
                    <Input type="time" name="availableTo" value={formData.availableTo} onChange={handleChange} />
                  </div>
                </div>
              )}

              {/* Terms & Conditions */}
              <div className="flex items-center gap-2">
                <Checkbox name="agreeToTerms" checked={formData.agreeToTerms} onChange={handleChange} />
                <Label>I agree to the terms of service and privacy policy</Label>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" disabled={isLoading}>{isLoading ? "Processing..." : "Create Account"}</Button>
              <div className="text-center text-sm">Already have an account? <Link to="/signin">Sign in</Link></div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </Layout>
  );
};

export default SignUp;
