"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import styles from "./page.module.css";

interface ProductPrice {
  payTodayPrice: number;
  wasPayTodayPrice?: number;
  totalDiscountAmount?: number;
}

interface Product {
  code: string;
  name: string;
  images: { url: string; altText: string }[];
  prices: ProductPrice;
  description: string;
  criteriaMet: number[];
}

const mainProducts: Product[] = [
  {
    code: "amazon-echo-4",
    name: "Amazon Echo (4th Generation)",
    images: [{ url: "/images/alexa.jpg", altText: "Amazon Echo" }],
    prices: {
      payTodayPrice: 99.99,
      wasPayTodayPrice: 129.99,
      totalDiscountAmount: 15.0,
    },
    description: "Smart speaker with Alexa - Charcoal Black",
    criteriaMet: [2],
  },
  {
    code: "apple-watch-ultra",
    name: "Apple Watch Ultra 2",
    images: [{ url: "/images/ultra49.jpg", altText: "Apple Watch" }],
    prices: {
      payTodayPrice: 799.0,
      wasPayTodayPrice: 899.0,
    },
    description: "GPS + Cellular 49mm Titanium Case",
    criteriaMet: [2, 3],
  },
  {
    code: "4tb-ssd",
    name: "4TB SSD",
    images: [{ url: "/images/ssd2.jpg", altText: "4TB SSD" }],
    prices: {
      payTodayPrice: 400.0,
    },
    description: "High-speed 4TB Solid State Drive.",
    criteriaMet: [1],
  },
];

const crossSellProducts: Product[] = [
  {
    code: "Airtag",
    name: "Apple Airtag",
    images: [{ url: "/images/airtag.jpg", altText: "Apple Airtag" }],
    prices: {
      payTodayPrice: 49.99,
      totalDiscountAmount: 5.0,
    },
    description: "Compact smart speaker with Alexa",
    criteriaMet: [4],
  },
  {
    code: "airpods-pro",
    name: "AirPods Pro (2nd Gen)",
    images: [{ url: "/images/airpods.jpg", altText: "AirPods Pro" }],
    prices: {
      payTodayPrice: 249.0,
      wasPayTodayPrice: 299.0,
      totalDiscountAmount: 20.0,
    },
    description: "Active noise cancelling wireless earbuds",
    criteriaMet: [5],
  },
  {
    code: "phone-case",
    name: "Phone Case",
    images: [{ url: "/images/case.jpg", altText: "Phone Case" }],
    prices: {
      payTodayPrice: 20.0,
    },
    description: "Protective phone case",
    criteriaMet: [],
  },
  {
    code: "apple-watch-strap",
    name: "Apple Watch Leather Strap",
    images: [{ url: "/images/strap.jpg", altText: "Apple Watch Strap" }],
    prices: {
      payTodayPrice: 79.99,
      wasPayTodayPrice: 99.99,
      totalDiscountAmount: 10.0,
    },
    description: "Premium leather strap for Apple Watch",
    criteriaMet: [6],
  },
];

const acceptanceCriteriaList = [
  {
    id: 1,
    label: "AC1: Show pay today price on main PDP product",
    description: `Given I am a ee user
    When I land on any PDP which does not have waspaytoday price or discounts
    Then I should be able to see the paytoday price for that product (use payTodayPrice from SF query)`,
  },
  {
    id: 2,
    label: "AC2: Show discount paytoday if the product has WasPayTodayPrice and show savings label",
    description: `Given I am a ee user
    When I land on any PDP that has a WasPayTodayPrice
    Then show the savings label with the discounted price WasPayTodayPrice - PayTodayPrice`,
  },
  {
    id: 3,
    label: "AC3: Show discounted paytodayprice if the product has talon discount campaign",
    description: `GIVEN I am user
    WHEN I land on any PDP that has talon discount campaign(s) applied against it
    THEN the savings tag should reflect the below calculation:
    • (Was price - now price) + (total talon savings)
    AND the pay today price shown should be:
    • Now price - total talon savings(totaldiscountamount)`,
  },
  {
    id: 4,
    label: "AC4: Show pay today price on cross-sell/upsell carousel",
    description: `Given I am a ee user
    When I land on any PDP which has a CS/US carousel
    And the product in CS/US does not have wasPayTodayPrice or talon discount
    Then I should be able to see the paytoday price for that product (use payTodayPrice from SF related productsummary query)`,
  },
  {
    id: 5,
    label: "AC5: Show discount paytoday if the product in CS/US has WasPayTodayPrice and show savings label",
    description: `Given I am a ee user
    When I land on any PDP that has CS/US carousel
    And the product in CS/US has a WasPayTodayPrice
    Then show the savings label with the discounted price WasPayTodayPrice - PayTodayPrice`,
  },
  {
    id: 6,
    label: "AC6: Show discounted paytodayprice if the product in CS/US carousel has talon discount campaign",
    description: `GIVEN I am user
    WHEN I land on any PDP that has products in CS/US
    And the product in CS/US has a talon discount campaign(s) applied against it
    THEN the savings tag should reflect the below calculation:
    • (Was price - now price) + (total talon savings)
    AND the pay today price shown should be:
    • Now price - total talon savings(totaldiscountamount)`,
  },
];

const Accordion = ({ criteria, isMet }: { criteria: any; isMet: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.accordion}>
      <motion.div
        className={styles.accordionHeader}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
      >
        <h3>{criteria.label} - {isMet ? "✅ Met" : "❌ Not Met"}</h3>
      </motion.div>
      {isOpen && (
        <motion.div
          className={styles.accordionContent}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
        >
          <p>{criteria.description}</p>
        </motion.div>
      )}
    </div>
  );
};

const AcceptanceCriteriaChecklist = ({ criteriaMet }: { criteriaMet: number[] }) => {
  return (
    <div className={styles.checklist}>
      <h2>Acceptance Criteria Check</h2>
      {acceptanceCriteriaList.map(criteria => (
        <Accordion key={criteria.id} criteria={criteria} isMet={criteriaMet.includes(criteria.id)} />
      ))}
    </div>
  );
};

const PriceDisplay = ({ product }: { product: Product }) => {
  const [showCalculations, setShowCalculations] = useState(false);
  const { payTodayPrice, wasPayTodayPrice, totalDiscountAmount } = product.prices;
  const hasWas = !!wasPayTodayPrice;
  const hasTalon = !!totalDiscountAmount;

  const wasNowDifference = hasWas ? wasPayTodayPrice - payTodayPrice : 0;
  const talonSavings = totalDiscountAmount || 0;
  const combinedSavings = wasNowDifference + talonSavings;
  const finalPrice = payTodayPrice - talonSavings;

  return (
    <motion.div className={styles.priceContainer} layout transition={{ duration: 0.3 }}>
      <div className={styles.priceStack}>
        {hasWas && (
          <motion.div className={styles.priceRow} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className={styles.alignedRow}>
              <span className={styles.priceLabel}>Was:</span>
              <span className={styles.originalPrice}>£{wasPayTodayPrice!.toFixed(2)}</span>
            </div>
          </motion.div>
        )}

        <motion.div className={styles.priceRow} initial={{ x: -20 }} animate={{ x: 0 }}>
          <div className={styles.alignedRow}>
            <span className={styles.priceLabel}>{hasWas ? 'Now:' : 'Price:'}</span>
            <span className={styles.currentPrice}>£{payTodayPrice.toFixed(2)}</span>
          </div>
          {hasWas && <span className={styles.priceReduction}>(Save £{(wasPayTodayPrice! - payTodayPrice).toFixed(2)})</span>}
        </motion.div>

        {hasTalon && (
          <motion.div className={styles.priceRow} initial={{ scale: 0.9 }} animate={{ scale: 1 }}>
            <div className={styles.alignedRow}>
              <span className={styles.priceLabel}>Talon Savings:</span>
              <span className={styles.talonSavings}>-£{totalDiscountAmount!.toFixed(2)}</span>
            </div>
          </motion.div>
        )}

        <motion.div className={styles.finalPriceRow} initial={{ y: 10 }} animate={{ y: 0 }}>
          <div className={styles.alignedRow}>
            <span className={styles.priceLabel}>You Pay:</span>
            <span className={styles.finalPrice}>£{finalPrice.toFixed(2)}</span>
          </div>
        </motion.div>

        {(hasWas || hasTalon) && (
          <div className={styles.calculationsToggle}>
            <button 
              onClick={() => setShowCalculations(!showCalculations)}
              className={styles.toggleButton}
            >
              {showCalculations ? 'Hide Calculations' : 'Show Calculations'}
            </button>
          </div>
        )}

        <AnimatePresence>
          {showCalculations && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={styles.calculationsBox}
            >
              {hasWas && (
                <div className={styles.calculationRow}>
                  <span>wasPayTodayPrice - payTodayPrice:</span>
                  <span className={styles.calculationResult}>
                    £{wasPayTodayPrice!.toFixed(2)} - £{payTodayPrice.toFixed(2)} = £{wasNowDifference.toFixed(2)}
                  </span>
                </div>
              )}
              {hasTalon && (
                <div className={styles.calculationRow}>
                  <span>totalDiscountAmount:</span>
                  <span className={styles.calculationResult}>-£{talonSavings.toFixed(2)}</span>
                </div>
              )}
              <div className={styles.calculationTotal}>
                <span>totalCombinedSavings (AC3):</span>
                <span className={styles.calculationResult}>£{combinedSavings.toFixed(2)}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default function ProductPage() {
  const [activeView, setActiveView] = useState<number | 'cross-sell'>(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");

  const currentProduct = typeof activeView === 'number' ? mainProducts[activeView] : null;

  return (
    <div className={`${styles.container} ${isDarkMode ? styles.darkMode : ""}`}>
      <motion.button
        className={styles.themeToggle}
        onClick={() => setIsDarkMode(!isDarkMode)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isDarkMode ? "🌞" : "🌙"}
      </motion.button>

      <div className={styles.selectorContainer}>
        <select 
          value={selectedProduct}
          onChange={(e) => {
            if (e.target.value === "cross-sell") {
              setActiveView('cross-sell');
            } else {
              const index = mainProducts.findIndex(p => p.code === e.target.value);
              setActiveView(index);
              setSelectedProduct(e.target.value);
            }
          }}
          className={styles.productSelector}
        >
          <option value="">Browse Products ▼</option>
          {mainProducts.map(product => (
            <option key={product.code} value={product.code}>{product.name}</option>
          ))}
          <option value="cross-sell">Recommended Accessories</option>
        </select>
      </div>

      <AnimatePresence mode="wait">
        {activeView !== 'cross-sell' && currentProduct ? (
          <motion.main
            key={currentProduct.code}
            className={styles.productGrid}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <motion.div className={styles.productImageContainer}>
              <Image
                src={currentProduct.images[0].url}
                alt={currentProduct.images[0].altText}
                fill
                style={{ objectFit: "contain", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
              />
            </motion.div>

            <motion.div className={styles.productInfo} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h1 className={styles.productName}>{currentProduct.name}</h1>
              <PriceDisplay product={currentProduct} />
              <p className={styles.description}>{currentProduct.description}</p>
              <motion.button
                className={styles.addToCartButton}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Add to Cart
              </motion.button>
            </motion.div>
          </motion.main>
        ) : (
          <motion.section
            key="cross-sell"
            className={styles.crossSell}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <h2 className={styles.crossSellTitle}>Recommended Accessories</h2>
            <div className={styles.carousel}>
              {crossSellProducts.map(product => (
                <motion.div key={product.code} className={styles.carouselItem} whileHover={{ y: -5 }}>
                  <div className={styles.carouselImageContainer}>
                    <Image
                      src={product.images[0].url}
                      alt={product.images[0].altText}
                      width={280}
                      height={210}
                      style={{ objectFit: "contain", width: "100%", height: "auto" }}
                    />
                  </div>
                  <div className={styles.carouselProductInfo}>
                    <h3 className={styles.carouselProductName}>{product.name}</h3>
                    <PriceDisplay product={product} />
                    <motion.button
                      className={styles.addToCartButton}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Add to Cart
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
            <AcceptanceCriteriaChecklist criteriaMet={[4, 5, 6]} />
          </motion.section>
        )}
      </AnimatePresence>

      {currentProduct && <AcceptanceCriteriaChecklist criteriaMet={currentProduct.criteriaMet} />}
    </div>
  );
}