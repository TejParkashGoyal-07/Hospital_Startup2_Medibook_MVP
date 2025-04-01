
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface LanguageSelectorProps {
  className?: string;
}

const LanguageSelector = ({ className = "" }: LanguageSelectorProps) => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'english' ? 'punjabi' : 'english');
  };

  return (
    <Button 
      variant="ghost" 
      size="sm" 
      onClick={toggleLanguage}
      className={`flex items-center gap-1 px-2 py-1 h-8 ${className}`}
    >
      <Globe className="h-3.5 w-3.5" />
      {language === 'english' ? 'ਪੰਜਾਬੀ' : 'English'}
    </Button>
  );
};

export default LanguageSelector;
