
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CalendarDays, Menu, X } from 'lucide-react';
import { useState } from 'react';
import LanguageSelector from '../common/LanguageSelector';
import { useLanguage } from '@/contexts/LanguageContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language } = useLanguage();

  // Translations
  const translations = {
    english: {
      home: "Home",
      findDoctors: "Find Doctors",
      myAppointments: "My Appointments",
      signIn: "Sign In",
      signUp: "Sign Up"
    },
    punjabi: {
      home: "ਹੋਮ",
      findDoctors: "ਡਾਕਟਰ ਲੱਭੋ",
      myAppointments: "ਮੇਰੀਆਂ ਅਪੌਇੰਟਮੈਂਟਾਂ",
      signIn: "ਸਾਈਨ ਇਨ",
      signUp: "ਸਾਈਨ ਅੱਪ"
    }
  };

  const t = translations[language];

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <CalendarDays className="h-6 w-6 text-medical-blue" />
              <span className="text-xl font-bold text-medical-blue">Medibook By Tej Parkash Goyal</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-medical-blue transition-colors">
              {t.home}
            </Link>
            <Link to="/doctors" className="text-gray-700 hover:text-medical-blue transition-colors">
              {t.findDoctors}
            </Link>
            <Link to="/appointments" className="text-gray-700 hover:text-medical-blue transition-colors">
              {t.myAppointments}
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <LanguageSelector />
            <Link to="/signin">
              <Button variant="outline" className="border-medical-blue text-medical-blue hover:bg-medical-blue hover:text-white">
                {t.signIn}
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-medical-blue text-white hover:bg-blue-600">
                {t.signUp}
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            <Link 
              to="/" 
              className="block py-2 text-gray-700 hover:text-medical-blue transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t.home}
            </Link>
            <Link 
              to="/doctors" 
              className="block py-2 text-gray-700 hover:text-medical-blue transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t.findDoctors}
            </Link>
            <Link 
              to="/appointments" 
              className="block py-2 text-gray-700 hover:text-medical-blue transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t.myAppointments}
            </Link>
            <div className="pt-2 flex flex-col space-y-2">
              <LanguageSelector className="self-start mb-2" />
              <Link to="/signin" className="w-full" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" className="border-medical-blue text-medical-blue hover:bg-medical-blue hover:text-white w-full">
                  {t.signIn}
                </Button>
              </Link>
              <Link to="/signup" className="w-full" onClick={() => setIsMenuOpen(false)}>
                <Button className="bg-medical-blue text-white hover:bg-blue-600 w-full">
                  {t.signUp}
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
