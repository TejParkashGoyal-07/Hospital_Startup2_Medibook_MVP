
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";
import Layout from "@/components/layout/Layout";
import { Lock, Mail, UserRound, Stethoscope, ShieldCheck, Phone, Loader2 } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendOTP, verifyOTP } from "@/services/twilioService";

// For language support
const translations = {
  english: {
    patientLogin: "Patient Login",
    doctorLogin: "Doctor Login",
    adminLogin: "Admin Login",
    phoneNumber: "Phone Number",
    enterOTP: "Enter OTP",
    requestOTP: "Request OTP",
    verifyOTP: "Verify OTP",
    email: "Email",
    password: "Password",
    rememberMe: "Remember me",
    forgotPassword: "Forgot password?",
    signIn: "Sign in",
    signInAs: "Sign in as",
    dontHaveAccount: "Don't have an account?",
    createAccount: "Create an account",
    otpSent: "OTP sent to your phone",
    otpVerified: "OTP verified successfully",
    invalidOTP: "Invalid OTP. Please try again.",
    enterPhoneNumber: "Please enter your phone number",
  },
  punjabi: {
    patientLogin: "ਮਰੀਜ਼ ਲੌਗਇਨ",
    doctorLogin: "ਡਾਕਟਰ ਲੌਗਇਨ",
    adminLogin: "ਐਡਮਿਨ ਲੌਗਇਨ",
    phoneNumber: "ਫੋਨ ਨੰਬਰ",
    enterOTP: "OTP ਦਰਜ ਕਰੋ",
    requestOTP: "OTP ਲਈ ਬੇਨਤੀ ਕਰੋ",
    verifyOTP: "OTP ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ",
    email: "ਈਮੇਲ",
    password: "ਪਾਸਵਰਡ",
    rememberMe: "ਮੈਨੂੰ ਯਾਦ ਰੱਖੋ",
    forgotPassword: "ਪਾਸਵਰਡ ਭੁੱਲ ਗਏ?",
    signIn: "ਸਾਈਨ ਇਨ ਕਰੋ",
    signInAs: "ਇਸ ਵਜੋਂ ਸਾਈਨ ਇਨ ਕਰੋ",
    dontHaveAccount: "ਖਾਤਾ ਨਹੀਂ ਹੈ?",
    createAccount: "ਖਾਤਾ ਬਣਾਓ",
    otpSent: "OTP ਤੁਹਾਡੇ ਫੋਨ 'ਤੇ ਭੇਜਿਆ ਗਿਆ",
    otpVerified: "OTP ਸਫਲਤਾਪੂਰਵਕ ਪ੍ਰਮਾਣਿਤ ਕੀਤਾ ਗਿਆ",
    invalidOTP: "ਅਵੈਧ OTP। ਕਿਰਪਾ ਕਰਕੇ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।",
    enterPhoneNumber: "ਕਿਰਪਾ ਕਰਕੇ ਆਪਣਾ ਫੋਨ ਨੰਬਰ ਦਾਖਲ ਕਰੋ",
  }
};

const patientFormSchema = z.object({
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  otp: z.string().length(6, "OTP must be 6 digits"),
});

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState<'english' | 'punjabi'>('english');
  const t = translations[language];

  // For doctor and admin login
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });

  // For patient OTP flow
  const [otpStep, setOtpStep] = useState<'phone' | 'otp'>('phone');
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpValue, setOtpValue] = useState("");
  const [otpSid, setOtpSid] = useState<string | undefined>(undefined);

  const patientForm = useForm<z.infer<typeof patientFormSchema>>({
    resolver: zodResolver(patientFormSchema),
    defaultValues: {
      phoneNumber: "",
      otp: "",
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, rememberMe: checked }));
  };

  const handleRequestOTP = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      toast.error(t.enterPhoneNumber);
      return;
    }

    setIsLoading(true);
    
    try {
      // Call the Twilio service to send OTP
      const result = await sendOTP(phoneNumber);
      
      if (result.success) {
        toast.success(t.otpSent);
        setOtpSid(result.sid); // Save the SID for verification later
        setOtpStep('otp');
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Failed to send OTP. Please try again.");
      console.error("OTP request error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (value: string) => {
    setOtpValue(value);
  };

  const handleVerifyOTP = async () => {
    if (!otpValue || otpValue.length !== 6) {
      toast.error(t.invalidOTP);
      return;
    }

    setIsLoading(true);
    
    try {
      // Call the Twilio service to verify OTP
      const result = await verifyOTP(phoneNumber, otpValue);
      
      if (result.success) {
        toast.success(t.otpVerified);
        // Redirect to patient info form
        navigate('/patient/info');
      } else {
        toast.error(result.message || t.invalidOTP);
      }
    } catch (error) {
      toast.error("Failed to verify OTP. Please try again.");
      console.error("OTP verification error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (role: string) => {
    setIsLoading(true);
    
    try {
      // In a real app, this would be an API call to your backend
      // const response = await fetch('api/auth/login', {...})
      
      // For now, just simulate authentication
      setTimeout(() => {
        if (formData.email && formData.password) {
          toast.success(`Logged in successfully as ${role}`);
          
          if (role === 'doctor') {
            navigate('/doctor/dashboard');
          } else if (role === 'admin') {
            navigate('/admin/dashboard');
          }
        } else {
          toast.error("Please enter both email and password");
        }
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      toast.error("Login failed. Please try again.");
      setIsLoading(false);
    }
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'english' ? 'punjabi' : 'english');
  };

  return (
    <Layout>
      <div className="container max-w-md mx-auto py-12">
        <Card>
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">Medibook By Tej Parkash Goyal</CardTitle>
            <CardDescription>
              {t.signInAs}
            </CardDescription>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={toggleLanguage}
              className="absolute top-4 right-4"
            >
              {language === 'english' ? 'ਪੰਜਾਬੀ' : 'English'}
            </Button>
          </CardHeader>
          <Tabs defaultValue="patient" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="patient" className="flex items-center gap-2">
                <UserRound className="h-4 w-4" />
                {t.patientLogin}
              </TabsTrigger>
              <TabsTrigger value="doctor" className="flex items-center gap-2">
                <Stethoscope className="h-4 w-4" />
                {t.doctorLogin}
              </TabsTrigger>
              <TabsTrigger value="admin" className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" />
                {t.adminLogin}
              </TabsTrigger>
            </TabsList>

            {/* Patient Login with OTP */}
            <TabsContent value="patient">
              <CardContent className="space-y-4 pt-6">
                {otpStep === 'phone' ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone-number">{t.phoneNumber}</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="phone-number" 
                          type="tel" 
                          placeholder="1234567890" 
                          className="pl-10"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                      </div>
                    </div>
                    <Button 
                      type="button" 
                      className="w-full bg-medical-blue hover:bg-blue-600" 
                      onClick={handleRequestOTP}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <span className="flex items-center justify-center">
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </span>
                      ) : t.requestOTP}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="otp">{t.enterOTP}</Label>
                      <div className="flex justify-center py-4">
                        <InputOTP 
                          maxLength={6} 
                          pattern="^[0-9]+$"
                          value={otpValue}
                          onChange={handleOtpChange}
                        >
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        type="button" 
                        variant="outline"
                        className="w-1/2" 
                        onClick={() => setOtpStep('phone')}
                      >
                        Back
                      </Button>
                      <Button 
                        type="button" 
                        className="w-1/2 bg-medical-blue hover:bg-blue-600" 
                        onClick={handleVerifyOTP}
                        disabled={isLoading || otpValue.length !== 6}
                      >
                        {isLoading ? (
                          <span className="flex items-center justify-center">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Verifying...
                          </span>
                        ) : t.verifyOTP}
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </TabsContent>

            {/* Doctor Login */}
            <TabsContent value="doctor">
              <CardContent className="space-y-4 pt-6">
                <div className="space-y-2">
                  <Label htmlFor="doctor-email">{t.email}</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="doctor-email" 
                      name="email"
                      type="email" 
                      placeholder="name@example.com" 
                      className="pl-10"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="doctor-password">{t.password}</Label>
                    <Link to="/forgot-password" className="text-sm text-medical-blue hover:underline">
                      {t.forgotPassword}
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="doctor-password" 
                      name="password"
                      type="password" 
                      className="pl-10" 
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="doctor-remember" 
                    checked={formData.rememberMe}
                    onCheckedChange={handleCheckboxChange}
                  />
                  <label
                    htmlFor="doctor-remember"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {t.rememberMe}
                  </label>
                </div>
                <Button 
                  type="button" 
                  className="w-full bg-medical-teal hover:bg-teal-600" 
                  onClick={() => handleLogin('doctor')}
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : `${t.signInAs} ${t.doctorLogin}`}
                </Button>
              </CardContent>
            </TabsContent>

            {/* Admin Login */}
            <TabsContent value="admin">
              <CardContent className="space-y-4 pt-6">
                <div className="space-y-2">
                  <Label htmlFor="admin-email">{t.email}</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="admin-email" 
                      name="email"
                      type="email" 
                      placeholder="admin@example.com" 
                      className="pl-10"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-password">{t.password}</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="admin-password" 
                      name="password"
                      type="password" 
                      className="pl-10" 
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <Button 
                  type="button" 
                  className="w-full bg-medical-blue hover:bg-blue-600" 
                  onClick={() => handleLogin('admin')}
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : `${t.signInAs} ${t.adminLogin}`}
                </Button>
              </CardContent>
            </TabsContent>
          </Tabs>

          <CardFooter className="flex flex-col space-y-4 pt-6">
            <div className="text-center text-sm">
              {t.dontHaveAccount}{" "}
              <Link to="/signup" className="text-medical-blue hover:underline">
                {t.createAccount}
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default Login;
