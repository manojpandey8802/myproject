"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Product } from "../types/product";
import { useTheme } from "@/app/context/ThemeContext";
import Rating from "./Rating";

type ProductCardProps = {
  product: Product;
  onViewMore?: (product: Product) => void;
};

const ProductCard = React.memo(({ product, onViewMore }: ProductCardProps) => {
  const { theme } = useTheme();
  const isOutOfStock = (product.stock ?? 0) <= 0;

  return (
    <motion.div
  whileHover={{ scale: 1.03 }}
  transition={{ type: "spring", stiffness: 220, damping: 18 }}
  className={`relative rounded-xl overflow-hidden shadow-md hover:shadow-lg 
    transition-transform duration-300 w-full sm:w-[90%] md:w-[340px] lg:w-[360px] mx-auto border
    ${theme === "dark" ? "bg-black border-gray-700" : "bg-white border-gray-200"}`}
  aria-label={`Product card for ${product.title}`}
>

      {/* Status Badges */}
      {((product.discountPercentage && !isOutOfStock) || isOutOfStock) && (
        <div className="absolute top-2 left-2 flex gap-2">
          {product.discountPercentage && !isOutOfStock ? (
            <span className="bg-rose-600 text-white text-xs px-2 py-1 rounded-md font-semibold shadow">
              {typeof product.discountPercentage === "number" && product.discountPercentage > 0
                ? `Sale • ${product.discountPercentage}%`
                : "Sale"}
            </span>
          ) : null}
          {isOutOfStock ? (
            <span className="bg-gray-500 dark:bg-gray-600 text-white text-xs px-2 py-1 rounded-md font-semibold shadow">
              Out of Stock
            </span>
          ) : null}
        </div>
      )}

      {/* Product Image */}
      <figure className="relative w-full h-56 md:h-64">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 400px"
        />
      </figure>

      {/* Product Details */}
      <div className="p-4 text-center flex flex-col justify-between">
        <h2
          className={`text-lg md:text-xl font-bold mb-1 ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}
        >
          {product.title}
        </h2>

        {/* Rating */}
        <Rating value={product.rating} />

        {/* Description */}
        <p
          className={`text-sm mb-3 line-clamp-2 ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}
        >
          {product.description}
        </p>

        {/* Price */}
        <p
          className={`font-semibold mb-4 ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}
        >
          ₹{product.price}
        </p>

        {/* Button */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => !isOutOfStock && onViewMore?.(product)}
          className={`w-full py-2 rounded-md font-medium text-white transition-colors duration-300
            ${
              isOutOfStock
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#2563eb] hover:bg-[#1d4ed8] dark:bg-[#3b82f6] dark:hover:bg-[#2563eb] cursor-pointer"
            }`}
          disabled={isOutOfStock}
          aria-disabled={isOutOfStock}
          aria-label={isOutOfStock ? "Out of Stock" : "View More"}
        >
          {isOutOfStock ? "Out of Stock" : "Buy Now"}
        </motion.button>
      </div>
    </motion.div>
  );
});

export default ProductCard;
