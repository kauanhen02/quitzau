
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const categories = [
  "Todas", "Ofertas", "Bovino Primeira", "Bovino Segunda", "Linguiça e Embutido", 
  "Peixes", "Espetos Dia/Dia", "Espeto Gourmet", "Cortes Nobres", "Carneiros", "Miúdos Bovino", "Aves", "Suíno"
];

const CategoryFilter = ({ selectedCategory, onSelectCategory }) => {
  return (
    <div className="py-6 mb-8 overflow-x-auto">
      <motion.div 
        className="flex space-x-3 sm:space-x-4 pb-2"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {categories.map((category, index) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 + 0.3 }}
          >
            <Button
              variant="ghost"
              onClick={() => onSelectCategory(category)}
              className={cn(
                "whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ease-in-out transform hover:scale-105",
                selectedCategory === category 
                  ? 'bg-brand-gold text-brand-black shadow-lg ring-2 ring-brand-lightgold' 
                  : 'bg-brand-charcoal text-brand-gray hover:bg-brand-charcoal/70 hover:text-brand-white'
              )}
            >
              {category}
            </Button>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default CategoryFilter;
