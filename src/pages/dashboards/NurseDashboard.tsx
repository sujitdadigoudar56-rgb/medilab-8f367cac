import { Routes, Route } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { DashboardDataProvider } from "@/hooks/useDashboardData";
import NurseHome from "./nurse/NurseHome";
import Patients from "./nurse/Patients";
import Vitals from "./nurse/Vitals";
import WardInfo from "./nurse/WardInfo";
import Observations from "./nurse/Observations";
import Profile from "./shared/Profile";

const NurseDashboard = () => (
  <DashboardLayout>
    <DashboardDataProvider>
      <Routes>
        <Route index element={<NurseHome />} />
        <Route path="patients" element={<Patients />} />
        <Route path="vitals" element={<Vitals />} />
        <Route path="ward" element={<WardInfo />} />
        <Route path="observations" element={<Observations />} />
        <Route path="profile" element={<Profile />} />
      </Routes>
    </DashboardDataProvider>
  </DashboardLayout>
);

export default NurseDashboard;
