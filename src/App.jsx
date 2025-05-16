import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import HomePage from '@/pages/HomePage';
import Footer from '@/components/Footer';
import LoginPage from '@/pages/LoginPage';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

function AppContent() {
  const { isAdmin, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-black text-white">
        <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold text-2xl text-white">
              <img src={logo} alt="Quitzau Logo" className="h-12" />
            </span>
          </Link>
          <nav className="flex items-center gap-4">
            {isAdmin ? (
              <Button variant="ghost" onClick={logout} className="text-sm font-medium text-slate-300 hover:text-white">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            ) : (
              <Button asChild variant="outline" className="transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105 bg-white text-black hover:bg-slate-100">
                <Link to="/login">Admin Login</Link>
              </Button>
            )}
          </nav>
        </div>
      </header>
      
      <main className="flex-1 container max-w-screen-2xl py-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={isAdmin ? <Navigate to="/" /> : <LoginPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      
      <Toaster />
      <Footer />
    </div>
  );
}

import logo from '@/assets/logo.png';
function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;