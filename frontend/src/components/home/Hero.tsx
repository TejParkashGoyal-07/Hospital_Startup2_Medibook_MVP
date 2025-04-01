
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-blue-50 to-cyan-50 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Find the Right Doctor & Book an Appointment
            </h1>
            <p className="text-lg text-gray-600 max-w-lg">
              Consult with top doctors online for any health concern. Easy scheduling, trusted healthcare professionals.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                className="bg-medical-blue hover:bg-blue-600 text-white px-6 py-6 h-auto"
                asChild
              >
                <Link to="/doctors">Find Doctors</Link>
              </Button>
              <Button 
                variant="outline" 
                className="border-medical-blue text-medical-blue hover:bg-medical-blue hover:text-white px-6 py-6 h-auto"
                asChild
              >
                <Link to="/appointments">My Appointments</Link>
              </Button>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex">
                <span className="text-medical-cyan font-semibold">4.8/5</span> Rating
              </div>
              <div className="h-4 w-px bg-gray-300"></div>
              <div>100+ Doctors</div>
              <div className="h-4 w-px bg-gray-300"></div>
              <div>10K+ Patients</div>
            </div>
          </div>
          <div className="md:w-1/2">
            <img 
              src="https://img.freepik.com/free-photo/young-female-doctor-white-coat-with-stethoscope-smiling-friendly_1303-17841.jpg" 
              alt="Doctor with patient" 
              className="rounded-lg shadow-lg w-full max-w-md mx-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
