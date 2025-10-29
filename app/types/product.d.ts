export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    image: string;
    stock: number;
    discountPercentage?: number;
    rating: number;
  }
  