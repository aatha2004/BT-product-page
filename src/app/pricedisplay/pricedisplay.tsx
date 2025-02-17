import React from 'react';
import styles from './pricedisplay.module.css';

interface PriceDisplayProps {
  product: {
    prices: {
      payTodayPrice: number;
      originalPrice: number;
      totalDiscount: number;
    };
  };
}

const PriceDisplay: React.FC<PriceDisplayProps> = ({ product }) => {
  const { payTodayPrice, originalPrice, totalDiscount } = product.prices;
  const currentPrice = payTodayPrice.toFixed(2);
  const originalPriceFormatted = originalPrice.toFixed(2);
  const discount = totalDiscount.toFixed(2);

  return (
    <div className={styles.priceContainer}>
      <div className={styles.priceRow}>
        <span className={styles.priceLabel}>Price:</span>
        <span className={styles.currentPrice}>£{currentPrice}</span>
        <span className={styles.originalPrice}>£{originalPriceFormatted}</span>
      </div>
      <button className={styles.addToCartButton}>Add to Cart</button>
      {totalDiscount > 0 && (
        <div className={styles.discountBadge}>
          Save £{discount}
        </div>
      )}
    </div>
  );
};

export default PriceDisplay;
