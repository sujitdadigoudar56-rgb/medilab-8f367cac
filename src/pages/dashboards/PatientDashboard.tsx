import { Routes, Route } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { DashboardDataProvider } from "@/hooks/useDashboardData";
import PatientHome from "./patient/PatientHome";
import BookAppointment from "./patient/BookAppointment";
import Prescriptions from "./patient/Prescriptions";
import MedicalHistory from "./patient/MedicalHistory";
import Reports from "./patient/Reports";
import Messages from "./patient/Messages";
import Profile from "./shared/Profile";

const PatientDashboard = () => (
  <DashboardLayout>
    <DashboardDataProvider>
      <Routes>
        <Route index element={<PatientHome />} />
        <Route path="appointments" element={<BookAppointment />} />
        <Route path="prescriptions" element={<Prescriptions />} />
        <Route path="history" element={<MedicalHistory />} />
        <Route path="reports" element={<Reports />} />
        <Route path="messages" element={<Messages />} />
        <Route path="profile" element={<Profile />} />
      </Routes>
    </DashboardDataProvider>
  </DashboardLayout>
);

export default PatientDashboard;
