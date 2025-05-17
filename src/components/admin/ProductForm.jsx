
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';

const categories = [
  "Ofertas", "Bovino Primeira", "Bovino Segunda", "Linguiça e Embutido", 
  "Peixes", "Espetos Dia/Dia", "Espeto Gourmet", "Cortes Nobres", "Carneiros", "Miúdos Bovino"
];

const units = ["Kg", "Unidade", "Pacote", "Bandeja"];

const ProductForm = ({ onSubmit, initialData, onCancel, isLoading }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [unit, setUnit] = useState('');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '');
      setDescription(initialData.description || '');
      setPrice(initialData.price !== undefined ? String(initialData.price) : '');
      setCategory(initialData.category || '');
      setImageUrl(initialData.imageUrl || '');
      setUnit(initialData.unit || '');
    } else {
      setName('');
      setDescription('');
      setPrice('');
      setCategory('');
      setImageUrl('');
      setUnit('');
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoading) return;

    const priceNumber = parseFloat(price.replace(',', '.'));
    if (isNaN(priceNumber)) {
      alert("Por favor, insira um preço válido.");
      return;
    }

    onSubmit({ 
      name, 
      description, 
      price: priceNumber, 
      category, 
      imageUrl,
      unit
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="name" className="text-brand-lightgold">Nome do Produto</Label>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required className="admin-input mt-1" />
      </div>
      <div>
        <Label htmlFor="description" className="text-brand-lightgold">Descrição</Label>
        <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="admin-input mt-1 min-h-[100px]" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="price" className="text-brand-lightgold">Preço (R$)</Label>
          <Input id="price" type="text" value={price} onChange={(e) => setPrice(e.target.value.replace(/[^0-9,.]/g, ''))} required className="admin-input mt-1" placeholder="Ex: 29,90" />
        </div>
        <div>
          <Label htmlFor="unit" className="text-brand-lightgold">Unidade de Medida</Label>
          <Select value={unit} onValueChange={setUnit}>
            <SelectTrigger className="admin-input mt-1">
              <SelectValue placeholder="Selecione a unidade" />
            </SelectTrigger>
            <SelectContent className="bg-brand-charcoal border-brand-gray/50 text-brand-white">
              {units.map(u => <SelectItem key={u} value={u} className="hover:bg-brand-gold/20 focus:bg-brand-gold/30">{u}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <Label htmlFor="category" className="text-brand-lightgold">Categoria</Label>
        <Select value={category} onValueChange={setCategory} required>
          <SelectTrigger className="admin-input mt-1">
            <SelectValue placeholder="Selecione uma categoria" />
          </SelectTrigger>
          <SelectContent className="bg-brand-charcoal border-brand-gray/50 text-brand-white">
            {categories.map(cat => <SelectItem key={cat} value={cat} className="hover:bg-brand-gold/20 focus:bg-brand-gold/30">{cat}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="imageUrl" className="text-brand-lightgold">URL da Imagem (Opcional)</Label>
        <Input id="imageUrl" type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="admin-input mt-1" placeholder="https://exemplo.com/imagem.jpg" />
      </div>
      <div className="flex justify-end space-x-4 pt-4">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading} className="btn-secondary">
          Cancelar
        </Button>
        <Button type="submit" disabled={isLoading} className="btn-primary">
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          {initialData ? 'Salvar Alterações' : 'Adicionar Produto'}
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;
