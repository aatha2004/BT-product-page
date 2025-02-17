import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductPage from './productpage';
import { mainProducts } from '../data/data';

// Mock a specific product for  testing

//  Mock the data module to avoid relying on real data
test("renders product page with product details", () => {
  // Ensure test data exists
  if (!mainProducts.length) {
    throw new Error('No products found in test data');
  }
  
  render(<ProductPage />);
  
  const testProduct = mainProducts[0];
  expect(screen.getByText(testProduct.name)).toBeInTheDocument();
  expect(screen.getByAltText(testProduct.images[0].altText)).toBeInTheDocument();
  expect(screen.getByText(/£\s*99\.99/)).toBeInTheDocument();
});
