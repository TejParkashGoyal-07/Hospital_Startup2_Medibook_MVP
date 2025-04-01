
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import Layout from "@/components/layout/Layout";
import { Loader2 } from "lucide-react";

// For language support
const translations = {
  english: {
    title: "Complete Your Profile",
    description: "Please provide your information to continue",
    name: "Full Name",
    namePlaceholder: "Enter your full name",
    age: "Age",
    agePlaceholder: "Enter your age",
    gender: "Gender",
    male: "Male",
    female: "Female",
    other: "Other",
    continue: "Continue to Dashboard",
    submitting: "Submitting...",
    success: "Profile created successfully!",
    error: "Please fill all required fields",
  },
  punjabi: {
    title: "ਆਪਣੀ ਪ੍ਰੋਫਾਈਲ ਪੂਰੀ ਕਰੋ",
    description: "ਜਾਰੀ ਰੱਖਣ ਲਈ ਕਿਰਪਾ ਕਰਕੇ ਆਪਣੀ ਜਾਣਕਾਰੀ ਪ੍ਰਦਾਨ ਕਰੋ",
    name: "ਪੂਰਾ ਨਾਮ",
    namePlaceholder: "ਆਪਣਾ ਪੂਰਾ ਨਾਮ ਦਰਜ ਕਰੋ",
    age: "ਉਮਰ",
    agePlaceholder: "ਆਪਣੀ ਉਮਰ ਦਰਜ ਕਰੋ",
    gender: "ਲਿੰਗ",
    male: "ਪੁਰਸ਼",
    female: "ਔਰਤ",
    other: "ਹੋਰ",
    continue: "ਡੈਸ਼ਬੋਰਡ 'ਤੇ ਜਾਰੀ ਰੱਖੋ",
    submitting: "ਜਮ੍ਹਾਂ ਕੀਤਾ ਜਾ ਰਿਹਾ ਹੈ...",
    success: "ਪ੍ਰੋਫਾਈਲ ਸਫਲਤਾਪੂਰਵਕ ਬਣਾਈ ਗਈ!",
    error: "ਕਿਰਪਾ ਕਰਕੇ ਸਾਰੇ ਜ਼ਰੂਰੀ ਖੇਤਰ ਭਰੋ",
  }
};

const PatientInfo = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState<'english' | 'punjabi'>('english');
  const t = translations[language];
  
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGenderChange = (value: string) => {
    setFormData(prev => ({ ...prev, gender: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.age || !formData.gender) {
      toast.error(t.error);
      return;
    }
    
    setIsLoading(true);
    
    // In a real app, this would be an API call to save the patient information
    setTimeout(() => {
      // Save patient info to local storage for persistence
      localStorage.setItem('patientInfo', JSON.stringify(formData));
      
      toast.success(t.success);
      navigate('/patient/dashboard');
      setIsLoading(false);
    }, 1500);
  };
  
  const toggleLanguage = () => {
    setLanguage(prev => prev === 'english' ? 'punjabi' : 'english');
  };
  const PatientDiseaseCalled=()=>{
    navigate('/patient-disease');
  }
  return (
    <Layout>
      <div className="container max-w-md mx-auto py-12">
        <Card>
          <CardHeader className="space-y-1">
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl font-bold">{t.title}</CardTitle>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={toggleLanguage}
              >
                {language === 'english' ? 'ਪੰਜਾਬੀ' : 'English'}
              </Button>
            </div>
            <CardDescription>
              {t.description}
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">{t.name}</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder={t.namePlaceholder}
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="age">{t.age}</Label>
                <Input
                  id="age"
                  name="age"
                  type="number"
                  placeholder={t.agePlaceholder}
                  value={formData.age}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label>{t.gender}</Label>
                <RadioGroup 
                  value={formData.gender} 
                  onValueChange={handleGenderChange}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">{t.male}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">{t.female}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other">{t.other}</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
            
            <CardFooter>
              <Button onClick={PatientDiseaseCalled}
                type="submit" 
                className="w-full bg-medical-blue hover:bg-blue-600"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t.submitting}
                  </span>
                ) : (
                  t.continue
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </Layout>
  );
};

export default PatientInfo;
