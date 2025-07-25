import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./AuthContext";
import Dashboard from "./pages/Dashboard";
import HomePage from "./pages/Home";
import SlidingAuthPanel from "./pages/Login";
import Engineering from "./pages/Engineering";
import Medical from "./pages/Medical";
import Analysis from "./pages/Analysis";
import ContactUs from "./pages/ContactUs";
import Leaderboard from "./pages/Leaderboard";
import Settings from "./pages/Settings";
import Header from "./components/common2/Header";
import Sidebar from "./components/common2/Sidebar";
import EnigineeringExams from "./pages/EngineeringExams";
import MedicalExams from "./pages/MedicalExams";
import ExamRules from "./pages/ExamsRules";
import ExamInterface from "./components/Layout2/ExamInterface";
import ExamResult from "./pages/ExamResult";
import TestAnalysisPage from "./components/Layout2/TestAnalysis";

// Dashboard Layout Component
function DashboardLayout({ children }) {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
}

function AppRoutes() {
  const { isLoggedIn, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Or your loading component
  }

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<SlidingAuthPanel />} />
      
      {/* Protected Dashboard Routes */}
      {isLoggedIn && (
        <>
          <Route 
            path="/dashboard" 
            element={
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            } 
          />
          <Route 
            path="/dashboard/engineering" 
            element={
              <DashboardLayout>
                <Engineering />
              </DashboardLayout>
            } 
          />
          <Route 
            path="/dashboard/medical" 
            element={
              <DashboardLayout>
                <Medical />
              </DashboardLayout>
            } 
          />
          <Route 
            path="/dashboard/analysis" 
            element={
              <DashboardLayout>
                <Analysis />
              </DashboardLayout>
            } 
          />
          <Route 
            path="/dashboard/analysis/:testId" 
            element={
              // <DashboardLayout>
                <TestAnalysisPage />
              // </DashboardLayout> 
            } 
          />
          <Route 
            path="/dashboard/leaderboard" 
            element={
              <DashboardLayout>
                <Leaderboard />
              </DashboardLayout>
            } 
          />
          <Route 
            path="/dashboard/contactus" 
            element={
              <DashboardLayout>
                <ContactUs />
              </DashboardLayout>
            } 
          />
          <Route 
            path="/dashboard/Settings" 
            element={
              <DashboardLayout>
                <Settings />
              </DashboardLayout>
            } 
          />
          <Route 
            path="/engineering-exams" 
            element={
              <DashboardLayout>
                <EnigineeringExams />
              </DashboardLayout>
            } 
          />
          <Route 
            path="/medical-exams" 
            element={
              <DashboardLayout>
                <MedicalExams />
              </DashboardLayout>
            } 
          />
          <Route 
            path="/engineering-exams/rules" 
            element={
                <ExamRules />
            } 
          />
          <Route 
            path="/medical-exams/rules" 
            element={
                <ExamRules />
            } 
          />
          <Route 
            path="/engineering-exams/rules/test-page" 
            element={
                <ExamInterface />
            } 
          />
          <Route 
            path="/engineering-exams/rules/test-page/test-result" 
            element={
                <ExamResult />
            } 
          />
        </>
      )}
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;