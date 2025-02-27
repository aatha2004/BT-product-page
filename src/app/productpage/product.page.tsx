import React from 'react';
import Image from 'next/image';
import { mainProducts } from '../data/data';
import PriceDisplay from '../pricedisplay/pricedisplay';
import styles from './productpage.module.css';

const ProductPage: React.FC = () => {
  return (
    <div>
      <h1>{mainProducts[0].name}</h1>
      {mainProducts[0].images.map((image, index) => (
          <Image
            key={index}
            src={image.url}
            alt={image.altText}
            className={styles.productImage}
            width={500}
            height={500}
            priority
          />
      ))}

      <PriceDisplay product={mainProducts[0]} />
    </div>
  );
};

export default ProductPage;
