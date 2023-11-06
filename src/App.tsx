import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import AdminLayout from "./components/layout/admin/AdminLayout";
import ClientLayout from "./components/layout/client/ClientLayout";
import FrontLayout from "./components/layout/frontend/FrontLayout";
import DashboardPage from "./pages/admin/DashboardPage";
import EducationPage from "./pages/admin/EducationPage";
import ExperiencesPage from "./pages/admin/ExperiencesPage";
import MessagesPageAdmin from "./pages/admin/MessagesPageAdmin";
import PortfoliosPage from "./pages/admin/PortfoliosPage";
import SkillsAdmin from "./pages/admin/Skills";
import UsersPage from "./pages/admin/UsersPage";
import AccountPage from "./pages/all/AccountPage";
import EducationPageClient from "./pages/client/EducationPageClient";
import SkilsPageClinent from "./pages/client/SkilsPageClinent";
import HomePage from "./pages/public/HomePage";
import LoginPage from "./pages/public/LoginPage";
import RegisterPage from "./pages/public/RegisterPage";
import useAuth from "./zustand/auth";

function App() {
  const { role } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<FrontLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/account" element={<AccountPage />} />
        </Route>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route
          element={
            role === "client" ? <ClientLayout /> : <Navigate to="/login" />
          }
        >
          <Route path="/education/client" element={<EducationPageClient />} />
          <Route path="/skills/client" element={<SkilsPageClinent />} />
        </Route>

        <Route
          element={
            role === "admin" ? <AdminLayout /> : <Navigate to="/login" />
          }
        >
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/experiences" element={<ExperiencesPage />} />
          <Route path="/educations" element={<EducationPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/skills" element={<SkillsAdmin />} />
          <Route path="/portfolios" element={<PortfoliosPage />} />
          <Route path="/messages" element={<MessagesPageAdmin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
