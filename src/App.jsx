
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider.jsx';
import HomePage from '@/pages/HomePage.jsx';
import AdminLoginPage from '@/pages/AdminLoginPage.jsx';
import AdminDashboardPage from '@/pages/AdminDashboardPage.jsx';
import Navbar from '@/components/catalog/Navbar.jsx';
import Footer from '@/components/catalog/Footer.jsx';
import { auth } from '@/firebase.js';
import { onAuthStateChanged } from 'firebase/auth';

function ProtectedRoute({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-brand-black">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-brand-gold"></div>
        <p className="ml-4 text-brand-white text-lg">Carregando...</p>
      </div>
    );
  }

  return user ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="quitzau-catalog-theme">
      <Router>
        <div className="flex flex-col min-h-screen bg-brand-black">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<AdminLoginPage />} />
              <Route 
                path="/admin/dashboard" 
                element={
                  <ProtectedRoute>
                    <AdminDashboardPage />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
