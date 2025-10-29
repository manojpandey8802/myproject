import { Product } from "../types/product";
import { Wireless, Smartwatch, bluetoothSpeaker} from "../constant/image";

export function getMockProducts(): Product[] {
  return [
    {
      id: 1,
      title: "Wireless Headphones",
      description:
        "Experience crystal-clear sound with deep bass and active noise cancellation. Ideal for travel or work.",
      price: 2499,
      image: Wireless.src,
      stock: 10,
      rating: 4.5,
    },
    {
      id: 2,
      title: "Smart Fitness Watch",
      description:
        "Track your heart rate, steps, and workouts with a sleek, water-resistant smartwatch.",
      price: 3999,
      image: Smartwatch.src,
      stock: 0,
      discountPercentage: 15,
      rating: 4.2,
    },
    {
      id: 3,
      title: "Bluetooth Speaker",
      description:
        "Compact and powerful portable speaker with rich bass and up to 12 hours of battery life.",
      price: 1799,
      image: bluetoothSpeaker.src,
      stock: 15,
      rating: 4.7,
      discountPercentage: 10,
    },
  
  ];
}
