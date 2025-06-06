
import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { db } from '@/firebase.js';
import { collection, getDocs } from 'firebase/firestore';
import ProductCard from '@/components/catalog/ProductCard.jsx';
import CategoryFilter from '@/components/catalog/CategoryFilter.jsx';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input.jsx';
import { Search, Loader2 } from 'lucide-react';

const HomePage = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  
  const getCategoryFromUrl = useCallback(() => {
    const queryParams = new URLSearchParams(location.search);
    return queryParams.get('category') || "Todas";
  }, [location.search]);

  const [selectedCategory, setSelectedCategory] = useState(getCategoryFromUrl());

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const productsCollection = collection(db, "products");
        const productsSnapshot = await getDocs(productsCollection);
        const productsList = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setAllProducts(productsList);
        // Initialize filteredProducts with all products or based on URL category
        const initialCategory = getCategoryFromUrl();
        let initialFiltered = productsList;
        if (initialCategory !== "Todas") {
          initialFiltered = productsList.filter(product => product.category === initialCategory);
        }
        setFilteredProducts(initialFiltered);

      } catch (error) {
        console.error("Erro ao buscar produtos: ", error);
        setFilteredProducts([]); // Ensure it's an empty array on error
      }
      setLoading(false);
    };
    fetchProducts();
  }, [getCategoryFromUrl]); // Added getCategoryFromUrl to ensure initial load respects URL

  useEffect(() => {
    // Update selectedCategory if URL changes (e.g. browser back/forward)
    const categoryFromUrl = getCategoryFromUrl();
    if (categoryFromUrl !== selectedCategory) {
        setSelectedCategory(categoryFromUrl);
    }
  }, [location.search, selectedCategory, getCategoryFromUrl]);

  useEffect(() => {
    let currentProducts = [...allProducts];

    if (selectedCategory !== "Todas") {
      currentProducts = currentProducts.filter(product => product.category === selectedCategory);
    }

    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      currentProducts = currentProducts.filter(product =>
        (product.name && product.name.toLowerCase().includes(lowerSearchTerm)) ||
        (product.description && product.description.toLowerCase().includes(lowerSearchTerm))
      );
    }
    setFilteredProducts(currentProducts);
  }, [selectedCategory, searchTerm, allProducts]);

  const handleCategorySelect = useCallback((category) => {
    setSelectedCategory(category); 
    const newSearchParams = new URLSearchParams(location.search);
    if (category === "Todas") {
      newSearchParams.delete('category');
    } else {
      newSearchParams.set('category', category);
    }
    navigate(`${location.pathname}?${newSearchParams.toString()}`, { replace: true });
  }, [navigate, location.search, location.pathname]);
  
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  if (loading && allProducts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center flex flex-col items-center justify-center min-h-[calc(100vh-12rem)]">
        <Loader2 className="h-12 w-12 animate-spin text-brand-gold mb-4" />
        <p className="text-xl text-brand-white">Carregando o melhor da carne...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <motion.div 
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brand-white mb-4 tracking-tight">
          Catálogo <span className="text-brand-gold">Premium</span>
        </h1>
        <p className="text-lg text-brand-gray max-w-2xl mx-auto">
          Descubra a excelência em carnes selecionadas, com a tradição e qualidade que só a Quitzau oferece.
        </p>
      </motion.div>

      <div className="mb-10 flex flex-col sm:flex-row gap-6 items-center sticky top-24 z-40 bg-brand-black/80 backdrop-blur-sm p-4 rounded-lg shadow-lg">
        <div className="relative flex-grow w-full sm:w-auto">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-brand-gray h-5 w-5" />
          <Input 
            type="text"
            placeholder="O que você procura hoje?"
            value={searchTerm}
            onChange={handleSearchChange}
            className="pl-12 pr-4 py-3 w-full admin-input text-base focus:bg-brand-charcoal/70"
          />
        </div>
      </div>
      
      <CategoryFilter selectedCategory={selectedCategory} onSelectCategory={handleCategorySelect} />

      {filteredProducts.length === 0 && !loading ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16 bg-brand-charcoal/30 rounded-lg"
        >
          <img  alt="Prato vazio elegante" className="mx-auto mb-6 w-40 h-40 opacity-60" src="https://images.unsplash.com/photo-1576867757602-739d3a7efc48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGVtcHR5JTIwcGxhdGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" />
          <p className="text-2xl font-semibold text-brand-white mb-2">Nenhum corte encontrado.</p>
          <p className="text-brand-gray">
            Tente ajustar sua busca ou explore outras categorias
            {selectedCategory !== "Todas" && ` em "${selectedCategory}"`}
            {searchTerm && ` com o termo "${searchTerm}"`}.
          </p>
        </motion.div>
      ) : (
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.07 } },
            hidden: {},
          }}
        >
          {filteredProducts.map(product => (
            <motion.div key={product.id} variants={{ visible: { opacity: 1, y: 0, scale: 1 }, hidden: { opacity: 0, y: 20, scale: 0.95 } }}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default HomePage;
