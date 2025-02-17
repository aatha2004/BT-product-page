import 'jest';
import '@testing-library/jest-dom';
import React from 'react';
import { describe, it, expect } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import PriceDisplay from './pricedisplay';
import type { Product } from '../data/data';

describe('PriceDisplay', () => {
  it('renders current price correctly', () => {
    const testProduct: Product = {
      id: 'test-id',
      code: 'test',
      name: 'Test Product',
      images: [{
        url: '/test-image.jpg',
        altText: 'Test product image'
      }],
      prices: {
        payTodayPrice: 99.99,
        originalPrice: 129.99,
        totalDiscount: 30.00
      }
    };

    render(<PriceDisplay product={testProduct} />);
    
    expect(screen.getByText(/£99\.99/)).toBeInTheDocument();
    expect(screen.getByText(/£129\.99/)).toBeInTheDocument();
    expect(screen.getByText(/Save £30\.00/)).toBeInTheDocument();
  });
});
