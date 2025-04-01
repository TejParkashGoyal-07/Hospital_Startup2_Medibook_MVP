import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import Layout from "@/components/layout/Layout";
import { Loader2 } from "lucide-react";

// Language support
const translations = {
  english: {
    title: "Report Your Disease",
    description: "Please provide details about your health condition",
    diseaseName: "Disease Name",
    diseaseNamePlaceholder: "Enter the name of the disease",
    description: "Description",
    descriptionPlaceholder: "Describe your symptoms",
    continue: "Submit & Continue",
    submitting: "Submitting...",
    success: "Disease information saved successfully!",
    error: "Please fill all required fields",
  },
  punjabi: {
    title: "ਆਪਣੀ ਬੀਮਾਰੀ ਦੀ ਜਾਣਕਾਰੀ ਦਿਓ",
    description: "ਕਿਰਪਾ ਕਰਕੇ ਆਪਣੇ ਸਿਹਤ ਸੰਬੰਧੀ ਹਾਲਾਤ ਬਾਰੇ ਵੇਰਵਾ ਦਿਓ",
    diseaseName: "ਬੀਮਾਰੀ ਦਾ ਨਾਂ",
    diseaseNamePlaceholder: "ਬੀਮਾਰੀ ਦਾ ਨਾਂ ਦਾਖਲ ਕਰੋ",
    description: "ਵੇਰਵਾ",
    descriptionPlaceholder: "ਆਪਣੇ ਲੱਛਣਾਂ ਨੂੰ ਵਰਣਨ ਕਰੋ",
    continue: "ਜਮ੍ਹਾਂ ਕਰੋ ਅਤੇ ਜਾਰੀ ਰੱਖੋ",
    submitting: "ਜਮ੍ਹਾਂ ਕੀਤਾ ਜਾ ਰਿਹਾ ਹੈ...",
    success: "ਬੀਮਾਰੀ ਦੀ ਜਾਣਕਾਰੀ ਸਫਲਤਾਪੂਰਵਕ ਸੰਭਾਲੀ ਗਈ!",
    error: "ਕਿਰਪਾ ਕਰਕੇ ਸਾਰੇ ਜ਼ਰੂਰੀ ਖੇਤਰ ਭਰੋ",
  }
};

const PatientDisease = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState<'english' | 'punjabi'>('english');
  const t = translations[language];

  const [formData, setFormData] = useState({
    diseaseName: "",
    description: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.diseaseName || !formData.description) {
      toast.error(t.error);
      return;
    }

    setIsLoading(true);

    // In a real app, this would be an API call to save the disease information
    setTimeout(() => {
      // Save disease info to local storage (replace this with API call later)
      localStorage.setItem('patientDisease', JSON.stringify(formData));

      toast.success(t.success);
      navigate('/patient/dashboard');
      setIsLoading(false);
    }, 1500);
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'english' ? 'punjabi' : 'english');
  };
  const DashboardCalled=()=>{
    navigate("/dashboard-patient");
  }
  return (
    <Layout>
      <div className="container max-w-md mx-auto py-12">
        <Card>
          <CardHeader className="space-y-1">
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl font-bold">{t.title}</CardTitle>
              <Button variant="outline" size="sm" onClick={toggleLanguage}>
                {language === 'english' ? 'ਪੰਜਾਬੀ' : 'English'}
              </Button>
            </div>
            <CardDescription>{t.description}</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="diseaseName">{t.diseaseName}</Label>
                <Input
                  id="diseaseName"
                  name="diseaseName"
                  placeholder={t.diseaseNamePlaceholder}
                  value={formData.diseaseName}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">{t.description}</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder={t.descriptionPlaceholder}
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
            </CardContent>

            <CardFooter>
              <Button type="submit" className="w-full bg-medical-blue hover:bg-blue-600" onClick={DashboardCalled}disabled={isLoading}>
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

export default PatientDisease;
