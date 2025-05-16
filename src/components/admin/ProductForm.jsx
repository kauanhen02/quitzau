
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';

const categories = [
  "Ofertas", "Bovino Primeira", "Cortes Nobres", "Aves", 
  "Suíno", "Peixes", "Espetos Dia/Dia", "Espeto Gourmet", "Carneiros"
];

const units = ["Kg", "Unidade", "Pacote", "Bandeja", "Peça"];

const ProductForm = ({ onSubmit, initialData, onCancel, isLoading }) => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    imageUrl: '',
    unit: 'Kg', 
    stock: '', 
  });

  useEffect(() => {
    if (initialData) {
      setProduct({
        name: initialData.name || '',
        description: initialData.description || '',
        price: initialData.price || '',
        category: initialData.category || '',
        imageUrl: initialData.imageUrl || '',
        unit: initialData.unit || 'Kg',
        stock: initialData.stock === undefined || initialData.stock === null ? '' : String(initialData.stock),
      });
    } else {
      setProduct({ name: '', description: '', price: '', category: '', imageUrl: '', unit: 'Kg', stock: '' });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (value) => {
    setProduct(prev => ({ ...prev, category: value }));
  };

  const handleUnitChange = (value) => {
    setProduct(prev => ({ ...prev, unit: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoading) return;
    const productDataToSubmit = {
      ...product,
      price: parseFloat(product.price.toString().replace(',', '.')) || 0,
      stock: product.stock === '' ? null : parseInt(product.stock, 10),
    };
    onSubmit(productDataToSubmit);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 pt-2 pb-2 max-h-[70vh] overflow-y-auto pr-2">
      <div>
        <Label htmlFor="name" className="admin-label">Nome do Produto</Label>
        <Input id="name" name="name" value={product.name} onChange={handleChange} required className="admin-input mt-1" placeholder="Ex: Picanha Premium"/>
      </div>
      <div>
        <Label htmlFor="description" className="admin-label">Descrição Detalhada</Label>
        <Textarea id="description" name="description" value={product.description} onChange={handleChange} className="admin-input mt-1" rows={3} placeholder="Ex: Corte nobre, macio e suculento..."/>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <Label htmlFor="price" className="admin-label">Preço (R$)</Label>
          <Input id="price" name="price" type="text" value={product.price} onChange={handleChange} required className="admin-input mt-1" placeholder="Ex: 79,90"/>
        </div>
        <div>
          <Label htmlFor="category" className="admin-label">Categoria Principal</Label>
          <Select value={product.category} onValueChange={handleCategoryChange} required>
            <SelectTrigger className="admin-input mt-1">
              <SelectValue placeholder="Selecione uma categoria" />
            </SelectTrigger>
            <SelectContent className="bg-brand-charcoal border-brand-gray/50 text-brand-white">
              {categories.map(cat => (
                <SelectItem key={cat} value={cat} className="hover:bg-brand-gold/20 focus:bg-brand-gold/30">{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <Label htmlFor="unit" className="admin-label">Unidade de Venda</Label>
           <Select value={product.unit} onValueChange={handleUnitChange}>
            <SelectTrigger className="admin-input mt-1">
              <SelectValue placeholder="Selecione uma unidade" />
            </SelectTrigger>
            <SelectContent className="bg-brand-charcoal border-brand-gray/50 text-brand-white">
              {units.map(u => (
                <SelectItem key={u} value={u} className="hover:bg-brand-gold/20 focus:bg-brand-gold/30">{u}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="stock" className="admin-label">Estoque (opcional)</Label>
          <Input id="stock" name="stock" type="number" value={product.stock} onChange={handleChange} className="admin-input mt-1" placeholder="Ex: 50"/>
        </div>
      </div>
      <div>
        <Label htmlFor="imageUrl" className="admin-label">URL da Imagem (opcional)</Label>
        <Input id="imageUrl" name="imageUrl" value={product.imageUrl} onChange={handleChange} placeholder="https://exemplo.com/imagem.jpg" className="admin-input mt-1" />
      </div>
      <DialogFooter className="pt-6">
        {onCancel && <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading} className="btn-secondary px-5 py-2.5">Cancelar</Button>}
        <Button type="submit" className="btn-primary px-5 py-2.5" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isLoading ? (initialData ? 'Salvando...' : 'Adicionando...') : (initialData ? 'Salvar Alterações' : 'Adicionar Produto')}
        </Button>
      </DialogFooter>
    </form>
  );
};

export default ProductForm;
