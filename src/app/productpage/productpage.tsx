import React from 'react';
import Image from 'next/image';
import { mainProducts } from '../data/data';
import PriceDisplay from '../pricedisplay/pricedisplay';

const ProductPage: React.FC = () => {
  return mainProducts[0] ? (
    <div>
      <h1>{mainProducts[0].name}</h1>
      <Image 
        src={mainProducts[0].images[0]?.url} 
        alt={mainProducts[0].images[0]?.altText || 'Product image'} 
        width={480} 
        height={320}
        style={{ 
          width: '80%', 
          height: 'auto',
          margin: '0 auto',
          display: 'block' 
        }}
      />
      <PriceDisplay product={mainProducts[0]} />
    </div>
  ) : <div>No product found</div>;

};

export default ProductPage;
