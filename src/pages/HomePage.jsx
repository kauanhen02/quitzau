import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import useLocalStorage from '@/hooks/useLocalStorage';
import { PlusCircle, ShoppingBag } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import ProductForm from '@/components/ProductForm';

const CATEGORIES = [
  'Bovina',
  'Suína',
  'Frango',
  'Cordeiro',
  'Peixes',
  'Carne Moída',
  'Miúdos',
];

const initialProductsData = [];

const HomePage = () => {
  const [products, setProducts] = useLocalStorage('products', initialProductsData);
  const { isAdmin } = useAuth();
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleAddProduct = (newProduct) => {
    const productWithId = { ...newProduct, id: Date.now().toString() };
    setProducts(prevProducts => [...prevProducts, productWithId]);
    toast({ title: "Sucesso!", description: "Produto adicionado com sucesso." });
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleEditProduct = (updatedProduct) => {
    setProducts(prevProducts =>
      prevProducts.map(p => (p.id === updatedProduct.id ? updatedProduct : p))
    );
    toast({ title: "Sucesso!", description: "Produto atualizado com sucesso." });
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      setProducts(prevProducts => prevProducts.filter(p => p.id !== productId));
      toast({ title: "Sucesso!", description: "Produto excluído com sucesso.", variant: "destructive" });
    }
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };
  
  const openAddModal = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const formatPrice = (price) => {
    return `R$ ${price.toFixed(2).replace('.', ',')}`;
  };
  
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-black dark:text-white text-center sm:text-left">Quitzau Catálogo</h1>
        {isAdmin && (
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button onClick={openAddModal} className="w-full sm:w-auto bg-black hover:bg-gray-800 text-white transition-all duration-300 ease-in-out transform hover:scale-105">
                <PlusCircle className="mr-2 h-5 w-5" /> Adicionar Produto
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px] bg-white dark:bg-slate-800 rounded-xl shadow-2xl border-border">
              <DialogHeader>
                <DialogTitle className="text-2xl font-semibold text-foreground">
                  {editingProduct ? 'Editar Produto' : 'Adicionar Novo Produto'}
                </DialogTitle>
              </DialogHeader>
              <ProductForm
                product={editingProduct}
                onSave={editingProduct ? handleEditProduct : handleAddProduct}
                onCancel={() => { setIsModalOpen(false); setEditingProduct(null); }}
                categories={CATEGORIES}
              />
            </DialogContent>
          </Dialog>
        )}
      </div>

      <Tabs defaultValue={CATEGORIES[0]} className="w-full">
        <TabsList className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 bg-slate-200 dark:bg-slate-700 p-1 rounded-lg shadow-inner h-auto md:h-10">
          {CATEGORIES.map(category => (
            <TabsTrigger 
              key={category} 
              value={category} 
              className="data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:shadow-md rounded-md transition-all duration-300 ease-in-out px-2 py-1.5 text-xs sm:text-sm h-full text-slate-700 dark:text-slate-300"
            >
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
        {CATEGORIES.map(category => (
          <TabsContent key={category} value={category}>
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6"
              initial="hidden"
              animate="visible"
            >
              {products.filter(p => p.category === category).map((product, index) => (
                <ProductCard 
                  key={product.id}
                  product={product}
                  index={index}
                  isAdmin={isAdmin}
                  onEdit={openEditModal}
                  onDelete={handleDeleteProduct}
                  formatPrice={formatPrice}
                  cardVariants={cardVariants}
                />
              ))}
              {products.filter(p => p.category === category).length === 0 && (
                 <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="col-span-full flex flex-col items-center justify-center py-16 text-center bg-muted/20 rounded-lg"
                 >
                  <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
                  <p className="text-xl font-medium text-muted-foreground">Nenhum produto encontrado nesta categoria.</p>
                  {isAdmin && <p className="text-sm text-muted-foreground mt-2">Adicione novos produtos usando o botão "Adicionar Produto".</p>}
                </motion.div>
              )}
            </motion.div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default HomePage;