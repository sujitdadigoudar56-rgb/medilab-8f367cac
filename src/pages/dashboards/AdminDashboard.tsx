import { Routes, Route } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { DashboardDataProvider } from "@/hooks/useDashboardData";
import AdminHome from "./admin/AdminHome";
import Doctors from "./admin/Doctors";
import Nurses from "./admin/Nurses";
import Patients from "./admin/Patients";
import Appointments from "./admin/Appointments";
import Payments from "./admin/Payments";
import Departments from "./admin/Departments";
import Reports from "./admin/Reports";
import UserManagement from "./admin/UserManagement";

const AdminDashboard = () => (
  <DashboardLayout>
    <DashboardDataProvider>
      <Routes>
        <Route index element={<AdminHome />} />
        <Route path="doctors" element={<Doctors />} />
        <Route path="nurses" element={<Nurses />} />
        <Route path="patients" element={<Patients />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="payments" element={<Payments />} />
        <Route path="departments" element={<Departments />} />
        <Route path="reports" element={<Reports />} />
        <Route path="users" element={<UserManagement />} />
      </Routes>
    </DashboardDataProvider>
  </DashboardLayout>
);

export default AdminDashboard;
