import { Routes, Route } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { DashboardDataProvider } from "@/hooks/useDashboardData";
import DoctorHome from "./doctor/DoctorHome";
import Appointments from "./doctor/Appointments";
import MyPatients from "./doctor/MyPatients";
import Prescriptions from "./doctor/Prescriptions";
import Reports from "./doctor/Reports";
import Profile from "./shared/Profile";

const DoctorDashboard = () => (
  <DashboardLayout>
    <DashboardDataProvider>
      <Routes>
        <Route index element={<DoctorHome />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="patients" element={<MyPatients />} />
        <Route path="prescriptions" element={<Prescriptions />} />
        <Route path="reports" element={<Reports />} />
        <Route path="profile" element={<Profile />} />
      </Routes>
    </DashboardDataProvider>
  </DashboardLayout>
);

export default DoctorDashboard;
