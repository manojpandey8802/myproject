import { NextResponse } from "next/server";
import { getMockProducts } from "@/app/lib/products";

const envAllowed = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const allowedOrigins = new Set<string>([
  "https://myproject-eta-six.vercel.app",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  ...envAllowed,
]);

function buildCorsHeaders(request: Request): Headers {
  const origin = request.headers.get("origin") || "";
  const isProd = process.env.NODE_ENV === "production";
  // In dev: if Origin header exists, reflect it for credentials support; else allow '*'
  const devAllowOrigin = origin ? origin : "*";
  const isVercelPreview = !!origin && /\.vercel\.app$/i.test(origin);
  const allowOrigin = allowedOrigins.has(origin) || (isProd && isVercelPreview)
    ? origin
    : isProd
    ? ""
    : devAllowOrigin;
  const headers = new Headers();
  if (allowOrigin) headers.set("Access-Control-Allow-Origin", allowOrigin);
  headers.set("Vary", "Origin");
  headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
  const requestedHeaders = request.headers.get("access-control-request-headers");
  headers.set(
    "Access-Control-Allow-Headers",
    requestedHeaders || "Content-Type, Authorization"
  );
  headers.set("Access-Control-Max-Age", "86400");
  // Only allow credentials when not using wildcard origin
  if (allowOrigin && allowOrigin !== "*") {
    headers.set("Access-Control-Allow-Credentials", "true");
  }
  return headers;
}

export async function GET(request: Request) {
  try {
    const products = getMockProducts();
    const headers = buildCorsHeaders(request);
    return NextResponse.json(products, { status: 200, headers });
  } catch (err) {
    console.error("API error:", err);
    const headers = buildCorsHeaders(request);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500, headers }
    );
  }
}

export async function OPTIONS(request: Request) {
  const headers = buildCorsHeaders(request);
  return new NextResponse(null, { status: 204, headers });
}

