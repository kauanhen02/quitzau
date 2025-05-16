
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tag, Edit, Trash2, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductCard = ({ product, isAdmin, onEdit, onDelete }) => {
  const formatPrice = (price) => {
    if (typeof price === 'number') {
      return price.toFixed(2).replace('.', ',');
    }
    return price || '0,00';
  };

  const imageUrl = product.imageUrl || "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3RlYWt8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60";


  return (
    <motion.div 
      className="product-card group"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ translateY: -5, boxShadow: "0 10px 20px rgba(212, 175, 55, 0.1)" }}
    >
      <CardHeader className="p-0 relative">
        <div className="aspect-[4/3] overflow-hidden rounded-t-lg">
          <img  
            alt={product.name || "Imagem do produto"} 
            className="object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-110"
            src={imageUrl} />
        </div>
        {product.category && (
          <div className="absolute top-3 right-3 bg-brand-gold text-brand-black text-xs font-semibold px-3 py-1 rounded-full shadow-md">
            {product.category}
          </div>
        )}
      </CardHeader>
      <CardContent className="p-5 flex-grow flex flex-col justify-between">
        <div>
          <CardTitle className="text-lg font-bold text-brand-white mb-2 truncate group-hover:text-brand-gold transition-colors" title={product.name}>
            {product.name || 'Nome Indisponível'}
          </CardTitle>
          {product.description && (
            <CardDescription className="text-sm text-brand-gray mb-3 h-12 overflow-hidden text-ellipsis">
              {product.description}
            </CardDescription>
          )}
        </div>
        <div className="flex items-baseline text-2xl font-extrabold text-brand-gold mt-2">
          <DollarSign className="w-5 h-5 mr-1 opacity-80" />
          {formatPrice(product.price)}
          {product.unit && <span className="text-sm text-brand-gray font-normal ml-1">/{product.unit}</span>}
        </div>
      </CardContent>
      {isAdmin && (
        <CardFooter className="p-4 border-t border-brand-charcoal/50 flex gap-3">
          <Button variant="outline" size="sm" onClick={() => onEdit(product)} className="flex-1 btn-outline-gold text-xs">
            <Edit className="w-3.5 h-3.5 mr-1.5" /> Editar
          </Button>
          <Button variant="destructive" size="sm" onClick={() => onDelete(product.id)} className="flex-1 bg-red-700/80 hover:bg-red-700 text-white text-xs">
            <Trash2 className="w-3.5 h-3.5 mr-1.5" /> Excluir
          </Button>
        </CardFooter>
      )}
    </motion.div>
  );
};

export default ProductCard;
