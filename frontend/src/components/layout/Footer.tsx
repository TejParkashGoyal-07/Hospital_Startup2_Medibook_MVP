
import { CalendarDays } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <CalendarDays className="h-6 w-6 text-medical-blue" />
              <span className="text-xl font-bold text-medical-blue">Medibook By Tej Parkash Goyal</span>
            </Link>
            <p className="mt-4 text-sm text-gray-600">
              Making healthcare accessible through easy online appointment booking.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 mb-4">For Patients</h3>
            <ul className="space-y-2">
              <li><Link to="/doctors" className="text-gray-600 hover:text-medical-blue text-sm">Find Doctors</Link></li>
              <li><Link to="/appointments" className="text-gray-600 hover:text-medical-blue text-sm">My Appointments</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-medical-blue text-sm">Health Blog</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 mb-4">For Doctors</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 hover:text-medical-blue text-sm">Join as a Doctor</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-medical-blue text-sm">Doctor Dashboard</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-medical-blue text-sm">Resources</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 mb-4">Help & Support</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 hover:text-medical-blue text-sm">Contact Us</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-medical-blue text-sm">FAQs</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-medical-blue text-sm">Privacy Policy</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-medical-blue text-sm">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-6 text-center">
          <p className="text-sm text-gray-600">&copy; {new Date().getFullYear()} Medibook By Tej Parkash Goyal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
