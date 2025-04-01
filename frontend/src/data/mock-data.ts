
// Mock data for doctor dashboard
export interface Appointment {
  id: string;
  patientName: string;
  date: string;
  time: string;
  reason: string;
  status: 'scheduled' | 'completed' | 'canceled';
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  imageUrl: string;
  isOnline: boolean;
  lastAvailabilityUpdate: string; // Timestamp of last availability update
  bio: string;
  email: string;
  phone: string;
  address: string;
  experience: number;
  education: string[];
  stats: {
    todayAppointments: number;
    totalPatients: number;
    averageAppointmentTime: number;
    completedAppointments: number;
  };
  appointments: Appointment[];
}

// Sample doctor data
export const doctor: Doctor = {
  id: "1",
  name: "Dr. Sarah Johnson",
  specialty: "Cardiologist",
  imageUrl: "https://randomuser.me/api/portraits/women/76.jpg",
  isOnline: true,
  lastAvailabilityUpdate: new Date().toISOString(), // Current time as initial value
  bio: "Dr. Sarah Johnson is a board-certified cardiologist with over 10 years of experience in treating various heart conditions. She specializes in preventive cardiology and heart disease management.",
  email: "sarah.johnson@example.com",
  phone: "(123) 456-7890",
  address: "123 Medical Center Blvd, Suite 450, Healthcare City",
  experience: 10,
  education: [
    "MD, Harvard Medical School",
    "Residency in Internal Medicine, Mayo Clinic",
    "Fellowship in Cardiology, Johns Hopkins Hospital"
  ],
  stats: {
    todayAppointments: 8,
    totalPatients: 2547,
    averageAppointmentTime: 30,
    completedAppointments: 12564
  },
  appointments: [
    {
      id: "app-1",
      patientName: "John Smith",
      date: "2023-06-15",
      time: "10:00 AM",
      reason: "Chest pain and shortness of breath",
      status: "scheduled"
    },
    {
      id: "app-2",
      patientName: "Emma Davis",
      date: "2023-06-15",
      time: "11:30 AM",
      reason: "Annual heart checkup",
      status: "scheduled"
    },
    {
      id: "app-3",
      patientName: "Michael Brown",
      date: "2023-06-15",
      time: "2:00 PM",
      reason: "Post-surgery follow-up",
      status: "scheduled"
    },
    {
      id: "app-4",
      patientName: "Sophia Williams",
      date: "2023-06-16",
      time: "9:00 AM",
      reason: "Blood pressure monitoring",
      status: "scheduled"
    }
  ]
};

// Sample doctors list for patient dashboard
export const doctors = [
  doctor,
  {
    id: "2",
    name: "Dr. James Wilson",
    specialty: "Neurologist",
    imageUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    isOnline: false,
    lastAvailabilityUpdate: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    bio: "Dr. James Wilson is a neurologist specializing in the treatment of disorders affecting the nervous system.",
    email: "james.wilson@example.com",
    phone: "(123) 456-7891",
    address: "456 Neurology Center, Medical District",
    experience: 15,
    education: [
      "MD, Stanford Medical School",
      "Residency in Neurology, Massachusetts General Hospital"
    ],
    stats: {
      todayAppointments: 6,
      totalPatients: 1850,
      averageAppointmentTime: 45,
      completedAppointments: 8970
    },
    appointments: []
  },
  {
    id: "3",
    name: "Dr. Emily Chen",
    specialty: "Pediatrician",
    imageUrl: "https://randomuser.me/api/portraits/women/42.jpg",
    isOnline: true,
    lastAvailabilityUpdate: new Date().toISOString(),
    bio: "Dr. Emily Chen is a compassionate pediatrician with a focus on childhood development and preventive care.",
    email: "emily.chen@example.com",
    phone: "(123) 456-7892",
    address: "789 Children's Medical Plaza, Kidsville",
    experience: 8,
    education: [
      "MD, Johns Hopkins Medical School",
      "Residency in Pediatrics, Children's Hospital of Philadelphia"
    ],
    stats: {
      todayAppointments: 12,
      totalPatients: 3210,
      averageAppointmentTime: 25,
      completedAppointments: 15760
    },
    appointments: []
  }
];

// Mock patient data for demo purposes
export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  appointments: Appointment[];
}

export const patient: Patient = {
  id: "p1",
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "(123) 555-7890",
  appointments: [
    {
      id: "app-5",
      patientName: "John Doe",
      date: "2023-06-20",
      time: "2:30 PM",
      reason: "Annual physical examination",
      status: "scheduled"
    },
    {
      id: "app-6",
      patientName: "John Doe",
      date: "2023-05-10",
      time: "10:15 AM",
      reason: "Follow-up on lab results",
      status: "completed"
    }
  ]
};
