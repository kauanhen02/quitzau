
import React from 'react';

const logoUrl = "https://storage.googleapis.com/hostinger-horizons-assets-prod/627e2378-4875-48a0-85d7-5743df22300a/8e0faeb55169ea59b66e27483b8bb06d.png";

const Footer = () => {
  return (
    <footer className="bg-brand-black border-t border-brand-charcoal/50 text-brand-gray py-12">
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-center items-center mb-6">
           <img src={logoUrl} alt="Quitzau Catálogo Logo" className="h-20 w-auto opacity-80" />
        </div>
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Quitzau Catálogo. Todos os direitos reservados.
        </p>
        <p className="text-xs text-brand-gray/70 mt-2">
          Tradição e qualidade em carnes desde 1999.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
