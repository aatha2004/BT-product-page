export type Product = {
  id: string;
  code: string;
  name: string;
  images: {
    url: string;
    altText: string;
  }[];
  prices: {
    payTodayPrice: number;
    originalPrice?: number;
    totalDiscount?: number;
  };
};
