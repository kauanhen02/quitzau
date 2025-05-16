
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogIn, LogOut, ShieldCheck } from 'lucide-react';
import { auth } from '@/firebase.js';
import { signOut } from 'firebase/auth';
import { useToast } from '@/components/ui/use-toast.js';
import { motion } from 'framer-motion';

const logoUrl = "https://storage.googleapis.com/hostinger-horizons-assets-prod/627e2378-4875-48a0-85d7-5743df22300a/8e0faeb55169ea59b66e27483b8bb06d.png";

const Navbar = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = React.useState(auth.currentUser);

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast({ title: 'Logout realizado com sucesso!', className: 'bg-brand-charcoal text-brand-white border-brand-gold' });
      navigate('/');
    } catch (error) {
      toast({ title: 'Erro ao fazer logout', description: error.message, variant: 'destructive' });
    }
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-brand-black/80 backdrop-blur-md text-brand-white shadow-lg sticky top-0 z-50 border-b border-brand-charcoal/50"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          <Link to="/" className="flex items-center">
            <img src={logoUrl} alt="Quitzau Catálogo Logo" className="h-16 w-auto transition-transform duration-300 hover:scale-105" />
          </Link>
          <div className="flex items-center space-x-3 sm:space-x-4">
            {user ? (
              <>
                <Button variant="ghost" onClick={() => navigate('/admin/dashboard')} className="text-brand-gray hover:text-brand-gold hover:bg-brand-charcoal/50 px-3 py-2 rounded-md text-sm font-medium">
                  <ShieldCheck className="mr-1.5 h-5 w-5" />
                  Painel
                </Button>
                <Button variant="ghost" onClick={handleLogout} className="text-brand-gray hover:text-brand-gold hover:bg-brand-charcoal/50 px-3 py-2 rounded-md text-sm font-medium">
                  <LogOut className="mr-1.5 h-5 w-5" />
                  Sair
                </Button>
              </>
            ) : (
              <Button variant="ghost" onClick={() => navigate('/login')} className="text-brand-gray hover:text-brand-gold hover:bg-brand-charcoal/50 px-3 py-2 rounded-md text-sm font-medium">
                <LogIn className="mr-1.5 h-5 w-5" />
                Admin
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
