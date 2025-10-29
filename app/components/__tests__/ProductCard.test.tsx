import { render, screen } from "@testing-library/react";
import ProductCard from "../ProductCard";
import { ThemeProvider } from "@/app/context/ThemeContext";
import type { Product } from "@/app/types/product";

// Helper function to render components with theme context
const renderWithTheme = (ui: React.ReactNode) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

// Mock product data
const mockProduct: Product = {
  id: 1,
  title: "Wireless Headphones",
  description: "Experience crystal-clear audio with deep bass and noise cancellation.",
  price: 2499,
  image: "/test-image.jpg",
  stock: 10,
  rating: 4.5,
};

describe("ProductCard Component", () => {
  it("renders all key product details (title, description, price, rating, CTA)", () => {
    renderWithTheme(<ProductCard product={mockProduct} />);

    // Title
    expect(screen.getByText("Wireless Headphones")).toBeInTheDocument();

    // Description
    expect(
      screen.getByText(/Experience crystal-clear audio/i)
    ).toBeInTheDocument();

    // Price
    expect(screen.getByText("₹2499")).toBeInTheDocument();

    // Rating
    expect(screen.getByText(/⭐ 4.5/i)).toBeInTheDocument();

    // Button CTA
    const cta = screen.getByRole("button", { name: /buy now|view more/i });
    expect(cta).toBeInTheDocument();
    expect(cta).not.toBeDisabled();
  });

  it("displays Sale badge when discountPercentage is provided", () => {
    renderWithTheme(
      <ProductCard product={{ ...mockProduct, discountPercentage: 20 }} />
    );

    const saleBadge = screen.getByText(/Sale.*20%/i);
    expect(saleBadge).toBeInTheDocument();
    expect(saleBadge).toHaveClass("bg-rose-600");
  });

  it("disables the button and shows 'Out of Stock' when stock is 0", () => {
    renderWithTheme(<ProductCard product={{ ...mockProduct, stock: 0 }} />);

    // "Out of Stock" label check
    const outOfStockText = screen.getAllByText(/Out of Stock/i);
    expect(outOfStockText.length).toBeGreaterThan(0);

    // Button state check
    const button = screen.getByRole("button", { name: /out of stock/i });
    expect(button).toBeDisabled();
    expect(button).toHaveClass("cursor-not-allowed");
  });
});
