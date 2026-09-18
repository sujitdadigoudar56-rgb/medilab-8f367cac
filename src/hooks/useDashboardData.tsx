import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { apiGet } from "@/lib/api";

export interface PersonRef {
  _id: string;
  fullName: string;
  email: string;
}

export interface TestRef {
  _id: string;
  name: string;
  price: number;
  report: string;
}

export interface PackageRef {
  _id: string;
  name: string;
  price: number;
}

export interface AppointmentItem {
  _id: string;
  patient?: PersonRef;
  doctor?: PersonRef;
  test?: TestRef;
  package?: PackageRef;
  date: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  type: "test" | "consultation";
  amount: number;
  paymentStatus: string;
  createdAt: string;
}

export interface PrescriptionItem {
  _id: string;
  patient: PersonRef;
  doctor: string;
  date: string;
  medicines: { name: string; dosage?: string; duration?: string }[];
  notes?: string;
}

export interface VitalsItem {
  _id: string;
  patient: PersonRef;
  nurse?: PersonRef;
  bloodPressure?: string;
  temperature?: string;
  pulse?: string;
  spO2?: string;
  timestamp: string;
}

export interface ActivityItem {
  _id: string;
  user?: PersonRef & { role?: string };
  action: string;
  details?: string;
  timestamp: string;
}

export interface DashboardData {
  prescriptions?: PrescriptionItem[];
  appointments?: AppointmentItem[];
  vitals?: VitalsItem[];
  recentActivity?: ActivityItem[];
  recentAppointments?: AppointmentItem[];
  doctors?: PersonRef[];
  nurses?: PersonRef[];
  patients?: PersonRef[];
}

interface DashboardDataContextType {
  data: DashboardData;
  loading: boolean;
  refetch: () => void;
}

const DashboardDataContext = createContext<DashboardDataContextType>({
  data: {},
  loading: true,
  refetch: () => {},
});

export const DashboardDataProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<DashboardData>({});
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(() => {
    setLoading(true);
    apiGet<DashboardData>("/data/dashboard")
      .then(setData)
      .catch((err) => console.error("Failed to load dashboard data:", err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <DashboardDataContext.Provider value={{ data, loading, refetch: fetchData }}>
      {children}
    </DashboardDataContext.Provider>
  );
};

export const useDashboardData = () => useContext(DashboardDataContext);
