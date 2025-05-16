
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '@/firebase.js';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast.js';
import { ShieldCheck, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const logoUrl = "https://storage.googleapis.com/hostinger-horizons-assets-prod/627e2378-4875-48a0-85d7-5743df22300a/8e0faeb55169ea59b66e27483b8bb06d.png";


  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({ title: 'Login bem-sucedido!', description: 'Redirecionando para o painel...', className: 'bg-brand-charcoal text-brand-white border-brand-gold' });
      navigate('/admin/dashboard');
    } catch (error) {
      toast({
        title: 'Erro no Login',
        description: error.message.includes('auth/invalid-credential') || error.message.includes('auth/user-not-found') || error.message.includes('auth/wrong-password')
          ? 'Credenciais inválidas. Verifique seu e-mail e senha.'
          : 'Ocorreu um erro. Tente novamente.',
        variant: 'destructive',
        className: 'bg-red-700 text-white border-red-500'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-12rem)] flex items-center justify-center bg-brand-black p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <Card className="bg-brand-charcoal shadow-2xl border-brand-charcoal/50">
          <CardHeader className="text-center pt-8 pb-6">
             <img src={logoUrl} alt="Quitzau Catálogo Logo" className="mx-auto h-20 w-auto mb-6" />
            <CardTitle className="text-3xl font-bold text-brand-white flex items-center justify-center">
              <ShieldCheck className="mr-3 h-8 w-8 text-brand-gold" />
              Acesso Restrito
            </CardTitle>
            <CardDescription className="text-brand-gray mt-1">Painel de Administração Quitzau Catálogo</CardDescription>
          </CardHeader>
          <CardContent className="px-6 sm:px-8 pb-6">
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <Label htmlFor="email" className="admin-label text-brand-gray">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  required
                  className="admin-input mt-1"
                />
              </div>
              <div>
                <Label htmlFor="password" className="admin-label text-brand-gray">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="admin-input mt-1"
                />
              </div>
              <Button type="submit" className="w-full btn-primary py-3 text-base mt-2" disabled={loading}>
                {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
                {loading ? 'Verificando...' : 'Entrar no Painel'}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="pb-8">
            <p className="text-xs text-brand-gray/70 text-center w-full">
              Este é um sistema de uso exclusivo para administradores.
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default AdminLoginPage;
