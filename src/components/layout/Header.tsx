"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "Code", href: "/code" },
  { name: "Research", href: "/research" },
  { name: "Blog", href: "/blog" },
  { name: "Gameplay", href: "/gameplay" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-background/90 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <nav className="container-main py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-x-2">
          <div className="relative w-8 h-8 overflow-hidden">
            <div className="absolute inset-0 border-2 border-accent rounded-full animate-glow"></div>
          </div>
          <span className="font-bold text-xl">Portfolio</span>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center gap-x-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="nav-link"
            >
              {item.name}
            </Link>
          ))}
          
          {/* Language switcher */}
          <Link href="/zh" className="ml-4 px-3 py-2">
            中文
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="md:hidden flex items-center"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg transition-all duration-300 border-t border-border ${
          mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="container-main py-2 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <Link 
            href="/zh" 
            className="block py-2 mt-2 border-t border-border"
            onClick={() => setMobileMenuOpen(false)}
          >
            中文
          </Link>
        </div>
      </div>
    </header>
  );
}
