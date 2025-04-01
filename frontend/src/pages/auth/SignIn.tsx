import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import Layout from "@/components/layout/Layout";
import { Mail, Lock, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import axios from "axios";

const SignIn = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { language } = useLanguage();
  const [userType, setUserType] = useState("doctor"); // Default role: Doctor

  const translations = {
    english: {
      title: "Sign In",
      description: "Enter your credentials to access your account",
      email: "Email Address",
      password: "Password",
      signIn: "Sign in as",
      userType: "Sign in as",
      doctor: "Doctor",
      patient: "Patient",
      admin: "Admin"
    },
    punjabi: {
      title: "ਸਾਈਨ ਇਨ",
      description: "ਆਪਣੇ ਖਾਤੇ ਤੱਕ ਪਹੁੰਚਣ ਲਈ ਆਪਣੇ ਵੇਰਵੇ ਦਰਜ ਕਰੋ",
      email: "ਈਮੇਲ ਪਤਾ",
      password: "ਪਾਸਵਰਡ",
      signIn: "ਸਾਈਨ ਇਨ",
      userType: "ਕਿਸ ਤੌਰ ਤੇ ਸਾਈਨ ਇਨ ਕਰੋ",
      doctor: "ਡਾਕਟਰ",
      patient: "ਮਰੀਜ਼",
      admin: "ਐਡਮਿਨ"
    }
  };

  const t = translations[language];

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Button Color Logic
  const roleColors: Record<string, string> = {
    doctor: "bg-blue-600 hover:bg-blue-700",   // Doctor: Blue
    patient: "bg-green-600 hover:bg-green-700", // Patient: Green
    admin: "bg-red-600 hover:bg-red-700"       // Admin: Red
  };

  // Handle Sign In
  const handleSignIn = async () => {
    if (!formData.email || !formData.password) {
      toast.error("Please enter email and password");
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/signin", {
        email: formData.email,
        password: formData.password,
        role: userType
      });

      if (response.data.success) {
        toast.success("Sign-in successful!");
        navigate(`/${userType}/dashboard`);
      } else {
        toast.error(response.data.message || "Invalid credentials");
      }
    } catch (error) {
      toast.error("Sign-in failed. Try again.");
    }
    setIsLoading(false);
  };

  return (
    <Layout>
      <div className="container max-w-md mx-auto py-12">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">{t.title}</CardTitle>
            <CardDescription className="text-center">{t.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* User Role Selection */}
            <div className="space-y-2">
              <Label>{t.userType}</Label>
              <select
                className="w-full p-2 border rounded-md"
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
              >
                <option value="doctor">{t.doctor}</option>
                <option value="patient">{t.patient}</option>
                <option value="admin">{t.admin}</option>
              </select>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email">{t.email}</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="email"
                  name="email"
                  type="email"
                  placeholder="example@email.com"
                  className="pl-10"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password">{t.password}</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="password"
                  name="password"
                  type="password"
                  placeholder="********"
                  className="pl-10"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Sign In Button */}
            <Button 
              type="button" 
              className={`w-full flex justify-center items-center gap-2 ${roleColors[userType]} text-white`}
              onClick={handleSignIn} 
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="animate-spin" /> : `${t.signIn} ${t[userType]}`}
            </Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default SignIn;
