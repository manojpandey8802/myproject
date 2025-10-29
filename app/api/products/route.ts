import { NextResponse } from "next/server";
import { getMockProducts } from "@/app/lib/products";

export async function GET() {
  const products = getMockProducts();
  return NextResponse.json(products, { status: 200 });
}


