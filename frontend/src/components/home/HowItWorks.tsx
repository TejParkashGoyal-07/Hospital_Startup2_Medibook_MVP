
import { Calendar, Search, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: <Search className="h-10 w-10 text-medical-blue" />,
    title: "Find a Doctor",
    description: "Search for specialists by specialty, location, or availability to find the perfect match for your needs."
  },
  {
    icon: <Calendar className="h-10 w-10 text-medical-blue" />,
    title: "Book an Appointment",
    description: "Select a convenient time slot from the doctor's available schedule and book instantly."
  },
  {
    icon: <CheckCircle className="h-10 w-10 text-medical-blue" />,
    title: "Get Care",
    description: "Visit the doctor at the scheduled time, whether it's an in-person or virtual appointment."
  }
];

const HowItWorks = () => {
  return (
    <section className="py-16 bg-medical-gray-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Booking an appointment with Medibook By Tej Parkash Goyal is simple and straightforward. Just follow these steps:
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-lg shadow-sm flex flex-col items-center text-center"
            >
              <div className="mb-6">{step.icon}</div>
              <h3 className="text-xl font-medium text-gray-900 mb-4">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
