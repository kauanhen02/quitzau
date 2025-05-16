import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, DollarSign, Tag, Image as ImageIcon } from 'lucide-react';

const ProductCard = ({ product, index, isAdmin, onEdit, onDelete, formatPrice, cardVariants }) => {
  return (
    <motion.div custom={index} variants={cardVariants}>
      <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-[1.02] bg-card rounded-xl border-transparent shadow-lg dark:border-slate-700">
        <div className="relative w-full h-56 bg-muted/30">
          {product.imageUrl ? (
            <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-slate-200 dark:bg-slate-700">
               <img  alt={product.imagePlaceholder || product.name} className="w-full h-full object-cover absolute inset-0" src="https://images.unsplash.com/photo-1684347417348-d261d03c60ef" />
            </div>
          )}
        </div>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-bold text-foreground group-hover:text-black dark:group-hover:text-white transition-colors">{product.name}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-2xl font-semibold text-black dark:text-white flex items-center">
            <DollarSign className="h-5 w-5 mr-1 opacity-70"/>
            {formatPrice(product.price)}
          </p>
           <p className="text-xs text-muted-foreground mt-1 flex items-center">
            <Tag className="h-3 w-3 mr-1 opacity-70"/>
            {product.category}
          </p>
        </CardContent>
        {isAdmin && (
          <CardFooter className="flex justify-end gap-2 p-4 bg-muted/20 dark:bg-slate-700/30">
            <Button variant="outline" size="sm" onClick={() => onEdit(product)} className="hover:bg-slate-200 dark:hover:bg-slate-600 hover:text-accent-foreground transition-colors">
              <Edit className="mr-1 h-4 w-4" /> Editar
            </Button>
            <Button variant="destructive" size="sm" onClick={() => onDelete(product.id)} className="hover:opacity-80 transition-opacity">
              <Trash2 className="mr-1 h-4 w-4" /> Excluir
            </Button>
          </CardFooter>
        )}
      </Card>
    </motion.div>
  );
};

export default ProductCard;