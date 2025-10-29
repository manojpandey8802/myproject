"use client";

import Image from "next/image";
import ThemeToggleButton from "./ThemeToggleButton";
import { Call, Mail, Skype, Web } from "../constant/image";

export default function Header() {
  const icons = [
    { src: Call, alt: "Call Us", label: "Call" },
    { src: Mail, alt: "Email Us", label: "Mail" },
    { src: Skype, alt: "Connect on Skype", label: "Skype" },
    { src: Web, alt: "Visit Website", label: "Website" },
  ];

  return (
    <header
      className="
        w-full sticky top-0 z-50
        dark:bg-gray-950
        text-gray-900 dark:text-gray-100
        shadow-sm dark:shadow-[0_1px_10px_rgba(255,255,255,0.05)]
        transition-colors duration-500
      "
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Left: Logo */}
        <div className="flex items-center gap-2">
            <span className="text-xl md:text-xs font-semibold text-gray-600 dark:text-gray-100">
            My Product
            </span>

        </div>


        {/* Right: Theme Toggle + Icons */}
        <div className="flex items-center gap-4">
          {/* Dark / Light Mode Toggle */}
          <ThemeToggleButton />

          {/* Contact Icons */}
          <ul className="flex items-center gap-3 sm:gap-4">
            {icons.map((icon, index) => (
                <li key={index}>
                <button
                    aria-label={icon.label}
                    className="hover:opacity-80 transition-opacity duration-200"
                >
                    <Image
                    src={icon.src}
                    alt={icon.alt}
                    width={18}  
                    height={18}
                    className="sm:w-[22px] sm:h-[22px] invert-0 dark:invert transition-all duration-300"
                    />
                </button>
                </li>
            ))}
            </ul>

        </div>
      </div>
    </header>
  );
}
