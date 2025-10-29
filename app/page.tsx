"use client";

import ProductCard from "./components/ProductCard";
import ProductCardSkeleton from "./components/ProductCardSkeleton";
import { getProducts } from "./services/products";
import { useTheme } from "@/app/context/ThemeContext";
import { useEffect, useState } from "react";

export default function Home() {
  const { theme } = useTheme();
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <main
      className={`min-h-screen transition-colors duration-500 flex flex-col items-center justify-start px-4 py-10
        ${theme === "dark" ? "bg-black" : "bg-gray-100"}`}
    >
      <h1
        className={`text-2xl sm:text-3xl font-bold mb-8
        ${theme === "dark" ? "text-gray-100" : "text-gray-800"}`}
      >
        Featured Products
      </h1>
      {isLoading ? (
        <div
          className="grid gap-6 justify-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl"
        >
          {Array.from({ length: 3 }).map((_, idx) => (
            <ProductCardSkeleton key={idx} />
          ))}
        </div>
      ) : products.length > 0 ? (
        <div
          className="grid gap-6 justify-items-center
          grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
          w-full max-w-6xl"
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p
          className={`text-center ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}
        >
          No products available.
        </p>
      )}
    </main>
  );
}
