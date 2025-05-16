
import React, { useState, useEffect, useCallback } from 'react';
import { db } from '@/firebase.js';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import ProductCard from '@/components/catalog/ProductCard.jsx';
import ProductForm from '@/components/admin/ProductForm.jsx';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast.js';
import { PlusCircle, Edit, Trash2, AlertTriangle, Loader2, PackageSearch } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";


const AdminDashboardPage = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const { toast } = useToast();

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const productsCollection = collection(db, "products");
      const productsSnapshot = await getDocs(productsCollection);
      const productsList = productsSnapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() }));
      setProducts(productsList);
    } catch (error) {
      toast({ title: "Erro ao buscar produtos", description: error.message, variant: "destructive", className: 'bg-red-700 text-white border-red-500' });
    }
    setIsLoading(false);
  }, [toast]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleFormSubmit = async (productData) => {
    setIsSubmitting(true);
    try {
      if (editingProduct) {
        const productRef = doc(db, "products", editingProduct.id);
        await updateDoc(productRef, productData);
        toast({ title: "Produto atualizado com sucesso!", className: 'bg-brand-charcoal text-brand-white border-brand-gold' });
      } else {
        await addDoc(collection(db, "products"), productData);
        toast({ title: "Produto adicionado com sucesso!", className: 'bg-brand-charcoal text-brand-white border-brand-gold' });
      }
      setIsFormOpen(false);
      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      toast({ title: "Erro ao salvar produto", description: error.message, variant: "destructive", className: 'bg-red-700 text-white border-red-500' });
    }
    setIsSubmitting(false);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleDeleteProduct = async (productId) => {
    setIsSubmitting(true);
    try {
      await deleteDoc(doc(db, "products", productId));
      toast({ title: "Produto excluído com sucesso!", className: 'bg-brand-charcoal text-brand-white border-brand-gold' });
      fetchProducts();
    } catch (error) {
      toast({ title: "Erro ao excluir produto", description: error.message, variant: "destructive", className: 'bg-red-700 text-white border-red-500' });
    }
     setIsSubmitting(false);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4"
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-brand-white tracking-tight">Gerenciamento de Produtos</h1>
        <Button onClick={() => { setEditingProduct(null); setIsFormOpen(true); }} className="btn-primary px-6 py-3 text-base">
          <PlusCircle className="mr-2 h-5 w-5" /> Adicionar Produto
        </Button>
      </motion.div>

      <Dialog open={isFormOpen} onOpenChange={(isOpen) => { if (!isSubmitting) setIsFormOpen(isOpen); }}>
        <DialogContent className="sm:max-w-[620px] bg-brand-charcoal border-brand-gray/30 text-brand-white">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-2xl font-semibold">{editingProduct ? 'Editar Produto Existente' : 'Adicionar Novo Produto ao Catálogo'}</DialogTitle>
            <DialogDescription className="text-brand-gray">
              {editingProduct ? 'Altere os detalhes do produto abaixo.' : 'Preencha os detalhes do novo produto.'}
            </DialogDescription>
          </DialogHeader>
          <ProductForm 
            onSubmit={handleFormSubmit} 
            initialData={editingProduct} 
            onCancel={() => { if (!isSubmitting) setIsFormOpen(false); }}
            isLoading={isSubmitting}
          />
        </DialogContent>
      </Dialog>

      {isLoading && products.length === 0 ? (
         <div className="text-center py-16 flex flex-col items-center">
          <Loader2 className="h-12 w-12 animate-spin text-brand-gold mb-4" />
          <p className="text-xl text-brand-white">Carregando produtos do catálogo...</p>
        </div>
      ) : products.length === 0 ? (
         <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20 bg-brand-charcoal/50 rounded-xl shadow-lg"
          >
          <PackageSearch className="mx-auto mb-6 w-24 h-24 text-brand-gold opacity-50" />
          <h2 className="text-3xl font-semibold text-brand-white mb-3">Seu catálogo está vazio.</h2>
          <p className="text-brand-gray mb-8 max-w-md mx-auto">Comece adicionando seus produtos para exibi-los aos seus clientes.</p>
          <Button onClick={() => { setEditingProduct(null); setIsFormOpen(true); }} className="btn-primary px-8 py-3 text-lg">
            <PlusCircle className="mr-2 h-5 w-5" /> Adicionar Primeiro Produto
          </Button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
          <AnimatePresence>
            {products.map(product => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <ProductCard 
                  product={product} 
                  isAdmin 
                  onEdit={handleEditProduct} 
                  onDelete={(productId) => {
                     const prodToDelete = products.find(p => p.id === productId);
                     if (prodToDelete) {
                        document.getElementById(`delete-trigger-${productId}`).click();
                     }
                  }}
                />
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button id={`delete-trigger-${product.id}`} className="hidden">Trigger Delete</button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-brand-charcoal border-brand-gray/30 text-brand-white">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="flex items-center text-xl">
                        <AlertTriangle className="text-red-500 mr-3 h-7 w-7" />
                        Confirmar Exclusão
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-brand-gray pt-2">
                        Tem certeza que deseja excluir o produto <strong className="text-brand-lightgold">"{product.name}"</strong>? Esta ação não pode ser desfeita e o produto será removido permanentemente do catálogo.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="mt-4">
                      <AlertDialogCancel className="btn-secondary px-4 py-2" disabled={isSubmitting}>Cancelar</AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={() => handleDeleteProduct(product.id)} 
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Trash2 className="mr-2 h-4 w-4" />}
                        Excluir Produto
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default AdminDashboardPage;
