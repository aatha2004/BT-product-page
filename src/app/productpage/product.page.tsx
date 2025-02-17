import React from 'react';
import { mainProducts } from '../data/data';
import PriceDisplay from '../pricedisplay/pricedisplay';

const ProductPage: React.FC = () => {
  return (
    <div>
      <h1>{mainProducts[0].name}</h1>
      <img 
        src={mainProducts[0].images[0].url} 
        alt={mainProducts[0].images[0].altText} 
      />
      <PriceDisplay product={mainProducts[0]} />
    </div>
  );
};

export default ProductPage;
