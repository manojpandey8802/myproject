import { Product } from "@/app/types/product";

export async function getProducts(): Promise<Product[]> {
  try {
    // Use same-origin to avoid CORS in deployed and local environments
    const res = await fetch(`/api/products`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.error("Failed to fetch products:", res.statusText);
      return [];
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}
