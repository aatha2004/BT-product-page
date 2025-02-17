// src/components/Functions/productFunctions.ts

interface ProductPrice {
    payTodayPrice: number;
    wasPayTodayPrice?: number;
    totalDiscountAmount?: number;
  }
  
  export const calculateFinalPrice = (prices: ProductPrice): number => {
    const { payTodayPrice, totalDiscountAmount } = prices;
    const talonSavings = totalDiscountAmount || 0;
    return payTodayPrice - talonSavings;
  };
  
  export const calculateSavings = (prices: ProductPrice): { wasNowDifference: number; talonSavings: number } => {
    const { payTodayPrice, wasPayTodayPrice, totalDiscountAmount } = prices;
    const hasWas = !!wasPayTodayPrice;
    const wasNowDifference = hasWas ? wasPayTodayPrice - payTodayPrice : 0;
    const talonSavings = totalDiscountAmount || 0;
  
    return { wasNowDifference, talonSavings };
  };
