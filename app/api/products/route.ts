import { NextResponse } from "next/server";
import { getMockProducts } from "@/app/lib/products";

// Configure allowed origins
const DEFAULT_ALLOWED = [
  "https://myproject-eta-six.vercel.app",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
];
const ENV_ALLOWED = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map((v) => v.trim())
  .filter(Boolean);
const ALLOWED_SET = new Set<string>([...DEFAULT_ALLOWED, ...ENV_ALLOWED]);

function getAllowedOrigin(request: Request): string | null {
  const origin = request.headers.get("origin");
  if (!origin) return null;

  const isProd = process.env.NODE_ENV === "production";
  if (!isProd) return origin; // reflect in dev for easiest local testing

  // In production: allow configured domains and Vercel preview URLs
  if (ALLOWED_SET.has(origin)) return origin;
  if (/\.vercel\.app$/i.test(origin)) return origin;
  return null;
}

function buildCorsHeaders(request: Request): Headers {
  const headers = new Headers();
  const allowOrigin = getAllowedOrigin(request);

  headers.set("Vary", "Origin");
  headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");

  const requestedHeaders = request.headers.get("access-control-request-headers");
  headers.set(
    "Access-Control-Allow-Headers",
    requestedHeaders || "Content-Type, Authorization"
  );
  headers.set("Access-Control-Max-Age", "86400");

  if (allowOrigin) {
    headers.set("Access-Control-Allow-Origin", allowOrigin);
    headers.set("Access-Control-Allow-Credentials", "true");
  }
  return headers;
}

export async function GET(request: Request) {
  try {
    const products = getMockProducts();
    const headers = buildCorsHeaders(request);
    return NextResponse.json(products, { status: 200, headers });
  } catch (error) {
    const headers = buildCorsHeaders(request);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500, headers });
  }
}

export async function OPTIONS(request: Request) {
  const headers = buildCorsHeaders(request);
  return new NextResponse(null, { status: 204, headers });
}

