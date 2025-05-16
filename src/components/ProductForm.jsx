import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';

const ProductForm = ({ product, onSave, onCancel, categories }) => {
  const [name, setName] = useState(product ? product.name : '');
  const [price, setPrice] = useState(product ? product.price.toString() : '');
  const [category, setCategory] = useState(product ? product.category : categories[0]);
  const [imageUrl, setImageUrl] = useState(product ? product.imageUrl : '');
  const [imagePlaceholder, setImagePlaceholder] = useState(product ? product.imagePlaceholder : 'Abstract product image');
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price || !category ) {
      toast({ title: "Erro", description: "Por favor, preencha todos os campos obrigatórios (Nome, Preço, Categoria).", variant: "destructive" });
      return;
    }
    if (!imagePlaceholder && !imageUrl) {
        toast({ title: "Erro", description: "Por favor, forneça uma Descrição da Imagem se a URL da Imagem estiver vazia.", variant: "destructive" });
        return;
    }
    const priceValue = parseFloat(price.replace(',', '.'));
    if (isNaN(priceValue) || priceValue <= 0) {
      toast({ title: "Erro", description: "Por favor, insira um preço válido.", variant: "destructive" });
      return;
    }
    onSave({ ...product, name, price: priceValue, category, imageUrl, imagePlaceholder });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="category">Categoria</Label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger id="category" className="bg-white dark:bg-slate-700">
            <SelectValue placeholder="Selecione uma categoria" />
          </SelectTrigger>
          <SelectContent>
            {categories.map(cat => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="name">Nome do Produto</Label>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex: Picanha Angus" className="bg-white dark:bg-slate-700"/>
      </div>
      <div>
        <Label htmlFor="price">Preço (R$)</Label>
        <Input id="price" type="text" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Ex: 79,90" className="bg-white dark:bg-slate-700"/>
      </div>
      <div>
        <Label htmlFor="imageUrl">URL da Imagem (Opcional)</Label>
        <Input id="imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://exemplo.com/imagem.jpg" className="bg-white dark:bg-slate-700"/>
      </div>
      <div>
        <Label htmlFor="imagePlaceholder">Descrição da Imagem (para imagem automática)</Label>
        <Input id="imagePlaceholder" value={imagePlaceholder} onChange={(e) => setImagePlaceholder(e.target.value)} placeholder="Ex: Corte nobre de picanha na grelha" className="bg-white dark:bg-slate-700"/>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" variant="outline" onClick={onCancel}>Cancelar</Button>
        </DialogClose>
        <Button type="submit" className="bg-black hover:bg-gray-800 text-white">Salvar Produto</Button>
      </DialogFooter>
    </form>
  );
};

export default ProductForm;