import { useEffect } from "react";
import { Routes, Route, Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./routes/ProtectedRoute";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Camps from "./pages/Camps";
import CampDetails from "./pages/CampDetails";
import CampRegistration from "./pages/CampRegistration";
import MyRegistrations from "./pages/MyRegistrations";
import AssistanceRequest from "./pages/AssistanceRequest";
import TrackRequests from "./pages/TrackRequests";
import Campaigns from "./pages/Campaigns";
import DonationForm from "./pages/DonationForm";
import MyDonations from "./pages/MyDonations";
import AdminDashboard from "./pages/AdminDashboard";
import Feedback from "./pages/Feedback";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant"
    });
  }, [pathname]);

  return null;
}

function MainLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

function App() {
  return (
    <>
      <ScrollToTop />

      <Routes>

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route element={<MainLayout />}>

          <Route path="/" element={<Home />} />
          <Route path="/camps" element={<Camps />} />
          <Route path="/camp/:id" element={<CampDetails />} />
          <Route path="/campaigns" element={<Campaigns />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route
            path="/camp-register/:id"
            element={
              <ProtectedRoute allowedRoles={["Patient"]}>
                <CampRegistration />
              </ProtectedRoute>
            }/>

          <Route
            path="/my-registrations"
            element={
              <ProtectedRoute allowedRoles={["Patient"]}>
                <MyRegistrations />
              </ProtectedRoute>
            }/>

          <Route
            path="/assistance-request"
            element={
              <ProtectedRoute allowedRoles={["Patient"]}>
                <AssistanceRequest />
              </ProtectedRoute>
            }/>

          <Route
            path="/track-requests"
            element={
              <ProtectedRoute allowedRoles={["Patient"]}>
                <TrackRequests />
              </ProtectedRoute>
            }/>

          <Route
            path="/donate/:id"
            element={
              <ProtectedRoute allowedRoles={["Donor"]}>
                <DonationForm />
              </ProtectedRoute>
            }/>

          <Route
            path="/my-donations"
            element={
              <ProtectedRoute allowedRoles={["Donor"]}>
                <MyDonations />
              </ProtectedRoute>
            }/>

          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }/>

        </Route>
      </Routes>
    </>
  );
}

export default App;