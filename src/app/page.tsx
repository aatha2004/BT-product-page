"use client";
import React, { useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";

interface Product {
  code: string;
  name: string;
  images: { url: string; altText: string }[];
  prices: {
    payTodayPrice: number;
    wasPayTodayPrice?: number;
    totalDiscountAmount?: number;
  };
  description: string;
}

interface AcceptanceCriteria {
  id: number;
  label: string;
  met: boolean;
}

const mainProducts: Product[] = [
  {
    code: "amazon-echo-4",
    name: "Amazon Echo (4th Generation)",
    images: [{ url: "/images/echo.jpg", altText: "Amazon Echo" }],
    prices: {
      payTodayPrice: 99.99,
      wasPayTodayPrice: 129.99,
      totalDiscountAmount: 15.00
    },
    description: "Smart speaker with Alexa - Charcoal Black"
  },
  {
    code: "apple-watch-ultra",
    name: "Apple Watch Ultra 2",
    images: [{ url: "/images/titanuimapplewatch.jpg", altText: "Apple Watch" }],
    prices: {
      payTodayPrice: 799.00,
      wasPayTodayPrice: 899.00
    },
    description: "GPS + Cellular 49mm Titanium Case"
  }
];

const crossSellProducts: Product[] = [
  {
    code: "echo-dot",
    name: "Echo Dot (5th Gen)",
    images: [{ url: "/images/echo-dot.jpg", altText: "Echo Dot" }],
    prices: {
      payTodayPrice: 49.99,
      totalDiscountAmount: 5.00
    },
    description: "Compact smart speaker with Alexa"
  },
  {
    code: "airpods-pro",
    name: "AirPods Pro (2nd Gen)",
    images: [{ url: "/images/airpods-pro.jpg", altText: "AirPods Pro" }],
    prices: {
      payTodayPrice: 249.00,
      wasPayTodayPrice: 299.00,
      totalDiscountAmount: 20.00
    },
    description: "Active noise cancelling wireless earbuds"
  }
];

const AcceptanceCriteriaChecklist = ({ activeTab }: { activeTab: number }) => {
  const getCriteria = (): AcceptanceCriteria[] => {
    if (activeTab === 0 || activeTab === 1) {
      const product = mainProducts[activeTab];
      return [
        {
          id: 1,
          label: "AC1: Base price display",
          met: !product.prices.wasPayTodayPrice && !product.prices.totalDiscountAmount
        },
        {
          id: 2,
          label: "AC2: WasPrice savings",
          met: !!product.prices.wasPayTodayPrice
        },
        {
          id: 3,
          label: "AC3: Talon discounts",
          met: !!product.prices.totalDiscountAmount
        }
      ];
    }
    
    return [
      {
        id: 4,
        label: "AC4: CS/US base pricing",
        met: crossSellProducts.some(p => !p.prices.wasPayTodayPrice && !p.prices.totalDiscountAmount)
      },
      {
        id: 5,
        label: "AC5: CS/US WasPrice",
        met: crossSellProducts.some(p => !!p.prices.wasPayTodayPrice)
      },
      {
        id: 6,
        label: "AC6: CS/US Talon",
        met: crossSellProducts.some(p => !!p.prices.totalDiscountAmount)
      }
    ];
  };

  return (
    <div className={styles.checklist}>
      <h2>Acceptance Criteria Check</h2>
      <ul>
        {getCriteria().map(criteria => (
          <li
            key={criteria.id}
            className={criteria.met ? styles.checklistItemMet : styles.checklistItemNotMet}
          >
            {criteria.label} - {criteria.met ? "✅ Met" : "❌ Not Met"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function ProductPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const getDisplayPrice = (product: Product): number => {
    return product.prices.payTodayPrice - (product.prices.totalDiscountAmount || 0);
  };

  const calculateSavings = (product: Product): string => {
    let savings = 0;
    if (product.prices.wasPayTodayPrice) {
      savings += product.prices.wasPayTodayPrice - product.prices.payTodayPrice;
    }
    if (product.prices.totalDiscountAmount) {
      savings += product.prices.totalDiscountAmount;
    }
    return savings.toFixed(2);
  };

  const currentProduct = activeTab < 2 ? mainProducts[activeTab] : null;

  return (
    <div className={`${styles.container} ${isDarkMode ? styles.darkMode : ''}`}>
      {/* Theme Toggle */}
      <button 
        className={styles.themeToggle}
        onClick={() => setIsDarkMode(!isDarkMode)}
        aria-label="Toggle dark mode"
      >
        {isDarkMode ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" strokeWidth="2"/>
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="5" strokeWidth="2"/>
            <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.73 1.42l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42m12.73-1.42l1.42-1.42" strokeWidth="2"/>
          </svg>
        )}
      </button>

      {/* Navigation Tabs */}
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 0 ? styles.activeTab : ''}`}
          onClick={() => setActiveTab(0)}
        >
          Echo
        </button>
        <button
          className={`${styles.tab} ${activeTab === 1 ? styles.activeTab : ''}`}
          onClick={() => setActiveTab(1)}
        >
          Watch
        </button>
        <button
          className={`${styles.tab} ${activeTab === 2 ? styles.activeTab : ''}`}
          onClick={() => setActiveTab(2)}
        >
          Cross-Sell
        </button>
      </div>

      {/* Main Content */}
      {activeTab < 2 && currentProduct ? (
        <main className={styles.mainProduct}>
          <div className={styles.productGrid}>
            <div className={styles.productImageContainer}>
              <Image
                src={currentProduct.images[0].url}
                alt={currentProduct.images[0].altText}
                width={600}
                height={600}
                priority
              />
            </div>
            
            <div className={styles.productInfo}>
              <h1 className={styles.productName}>{currentProduct.name}</h1>
              
              <div className={styles.pricing}>
                <span className={styles.currentPrice}>
                  £{getDisplayPrice(currentProduct).toFixed(2)}
                </span>
                {currentProduct.prices.wasPayTodayPrice && (
                  <span className={styles.originalPrice}>
                    £{currentProduct.prices.wasPayTodayPrice.toFixed(2)}
                  </span>
                )}
              </div>

              <div className={styles.savingsDetails}>
                <p>Total Savings: £{calculateSavings(currentProduct)}</p>
                {currentProduct.prices.wasPayTodayPrice && (
                  <p className={styles.savingsBreakdown}>
                    Price Reduction: £
                    {(currentProduct.prices.wasPayTodayPrice - currentProduct.prices.payTodayPrice).toFixed(2)}
                  </p>
                )}
                {currentProduct.prices.totalDiscountAmount && (
                  <p className={styles.savingsBreakdown}>
                    Talon Savings: £
                    {currentProduct.prices.totalDiscountAmount.toFixed(2)}
                  </p>
                )}
              </div>

              <p className={styles.description}>{currentProduct.description}</p>
              <button className={styles.savingsButton}>Add to Cart</button>
            </div>
          </div>
        </main>
      ) : (
        <section className={styles.crossSell}>
          <h2>Recommended Accessories</h2>
          <div className={styles.carousel}>
            {crossSellProducts.map(product => (
              <div key={product.code} className={styles.carouselItem}>
                <Image
                  src={product.images[0].url}
                  alt={product.images[0].altText}
                  width={300}
                  height={300}
                />
                <h3>{product.name}</h3>
                <div className={styles.pricing}>
                  <span className={styles.currentPrice}>
                    £{getDisplayPrice(product).toFixed(2)}
                  </span>
                  {product.prices.wasPayTodayPrice && (
                    <span className={styles.originalPrice}>
                      £{product.prices.wasPayTodayPrice.toFixed(2)}
                    </span>
                  )}
                </div>
                {product.prices.totalDiscountAmount && (
                  <div className={styles.talonBadge}>
                    Talon Savings: £{product.prices.totalDiscountAmount.toFixed(2)}
                  </div>
                )}
                <button className={styles.savingsButton}>Add to Cart</button>
              </div>
            ))}
          </div>
        </section>
      )}

      <AcceptanceCriteriaChecklist activeTab={activeTab} />
    </div>
  );
}