import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { LogIn, ShieldAlert } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('E-mail e senha incorretas, por favor contate um administrador');
    const success = login(email, password);
    if (success) {
      toast({
        title: "Login bem-sucedido!",
        description: "Bem-vindo, Admin!",
      });
      navigate('/');
    } else {
      setError('E-mail e senha incorretas, por favor contate um administrador');
      toast({
        title: "Falha no Login",
        description: "Verifique suas credenciais e tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center py-12"
    >
      <Card className="w-full max-w-md shadow-2xl bg-card rounded-xl border-transparent">
        <CardHeader className="space-y-1 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-block p-3 bg-gradient-to-br from-primary to-accent rounded-full mx-auto mb-4"
          >
            <LogIn className="h-8 w-8 text-primary-foreground" />
          </motion.div>
          <CardTitle className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-accent">
            Acesso Administrativo
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Entre com suas credenciais de administrador.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="Senha"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="focus:ring-primary/80 focus:border-primary/80"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="focus:ring-primary/80 focus:border-primary/80"
              />
            </div>
            {error && (
              <motion.p 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-sm font-medium text-destructive flex items-center bg-destructive/10 p-3 rounded-md"
              >
                <ShieldAlert className="h-5 w-5 mr-2"/>
                {error}
              </motion.p>
            )}
            <Button type="submit" className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-lg py-3 transition-all duration-300 ease-in-out transform hover:scale-105 text-white">
              Entrar
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center text-xs text-muted-foreground">
           
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default LoginPage;