export interface Product {
  id: string;
  code: string;
  name: string;
  images: Array<{
    url: string;
    altText: string;
  }>;
  prices: {
    payTodayPrice: number;
    originalPrice: number;
    totalDiscount: number;
  };
}

export const mainProducts: Product[] = [
  {
    id: '1',
    code: 'test',
    name: 'Test Product',
    images: [{
      url: process.env.NODE_ENV === 'production' 
        ? 'https://bt-product-page.vercel.app/test-image.jpg' 
        : '/test-image.jpg',
      altText: 'Test product image'
    }],
    prices: {
      payTodayPrice: 99.99,
      originalPrice: 129.99,
      totalDiscount: 30.00
    }
  }
];
