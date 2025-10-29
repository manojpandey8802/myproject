"use client";

import React from "react";

const ProductCardSkeleton: React.FC = () => {
  return (
    <div
      className="relative rounded-xl overflow-hidden shadow-md w-full sm:w-[90%] md:w-[340px] lg:w-[360px] mx-auto border bg-white dark:bg-black border-gray-200 dark:border-gray-700"
      aria-label="Loading product"
    >
      <div className="relative w-full h-56 md:h-64 bg-gray-200 dark:bg-gray-800 animate-pulse" />

      <div className="p-4">
        <div className="h-5 w-3/5 bg-gray-200 dark:bg-gray-800 rounded animate-pulse mb-3" />
        <div className="h-4 w-24 bg-gray-200 dark:bg-gray-800 rounded animate-pulse mb-3" />
        <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded animate-pulse mb-2" />
        
      </div>
    </div>
  );
};

export default ProductCardSkeleton;


