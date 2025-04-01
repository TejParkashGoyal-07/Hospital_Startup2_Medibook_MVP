
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DoctorManagement from "@/components/admin/DoctorManagement";
import { Plus, Users, Activity, Settings } from "lucide-react";

// For language support
const translations = {
  english: {
    title: "Admin Dashboard",
    description: "Manage doctors, patients, and system settings",
    doctors: "Doctors",
    patients: "Patients",
    statistics: "Statistics",
    settings: "Settings",
    addDoctor: "Add Doctor",
  },
  punjabi: {
    title: "ਐਡਮਿਨ ਡੈਸ਼ਬੋਰਡ",
    description: "ਡਾਕਟਰਾਂ, ਮਰੀਜ਼ਾਂ ਅਤੇ ਸਿਸਟਮ ਸੈਟਿੰਗਾਂ ਦਾ ਪ੍ਰਬੰਧਨ ਕਰੋ",
    doctors: "ਡਾਕਟਰ",
    patients: "ਮਰੀਜ਼",
    statistics: "ਅੰਕੜੇ",
    settings: "ਸੈਟਿੰਗਾਂ",
    addDoctor: "ਡਾਕਟਰ ਸ਼ਾਮਲ ਕਰੋ",
  }
};

const AdminDashboard = () => {
  const [language, setLanguage] = useState<'english' | 'punjabi'>('english');
  const t = translations[language];

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'english' ? 'punjabi' : 'english');
  };

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">{t.title}</h1>
            <p className="text-gray-500">{t.description}</p>
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              onClick={toggleLanguage}
            >
              {language === 'english' ? 'ਪੰਜਾਬੀ' : 'English'}
            </Button>
          </div>
        </div>

        <Tabs defaultValue="doctors" className="w-full">
          <TabsList className="w-full flex mb-8">
            <TabsTrigger value="doctors" className="flex-1">
              <Users className="mr-2 h-4 w-4" />
              {t.doctors}
            </TabsTrigger>
            <TabsTrigger value="patients" className="flex-1">
              <Users className="mr-2 h-4 w-4" />
              {t.patients}
            </TabsTrigger>
            <TabsTrigger value="statistics" className="flex-1">
              <Activity className="mr-2 h-4 w-4" />
              {t.statistics}
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex-1">
              <Settings className="mr-2 h-4 w-4" />
              {t.settings}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="doctors">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>{t.doctors}</CardTitle>
                  <CardDescription>Manage doctors in the system</CardDescription>
                </div>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  {t.addDoctor}
                </Button>
              </CardHeader>
              <CardContent>
                <DoctorManagement language={language} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="patients">
            <Card>
              <CardHeader>
                <CardTitle>{t.patients}</CardTitle>
                <CardDescription>View and manage patients</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Patient management functionality will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="statistics">
            <Card>
              <CardHeader>
                <CardTitle>{t.statistics}</CardTitle>
                <CardDescription>System statistics and analytics</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Statistics and analytics functionality will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>{t.settings}</CardTitle>
                <CardDescription>Configure system settings</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Settings functionality will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
