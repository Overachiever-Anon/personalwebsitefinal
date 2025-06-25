"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { createClient } from '@/utils/supabase/client';
import { type User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

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
  const [user, setUser] = useState<User | null>(null);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      lastScrollY.current = currentScrollY;
      setScrolled(currentScrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    // Initial check
    supabase.auth.getUser().then(({ data }) => setUser(data.user));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      subscription.unsubscribe();
    };
  }, [supabase.auth]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  return (
        <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-background/90 backdrop-blur-md shadow-md" : "bg-transparent"} ${visible ? 'translate-y-0' : '-translate-y-full'}`}>
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
            <Link key={item.name} href={item.href} className="nav-link">
              {item.name}
            </Link>
          ))}
          
          {/* Language switcher */}
          <Link href="/zh" className="ml-4 px-3 py-2">
            中文
          </Link>
          <div className="ml-4 flex items-center gap-x-2">
            {user ? (
              <>
                <Link href="/admin" className="btn btn-secondary btn-sm">Admin</Link>
                <button onClick={handleLogout} className="btn btn-danger btn-sm">Logout</button>
              </>
            ) : (
              <Link href="/login" className="btn btn-primary btn-sm">Login</Link>
            )}
          </div>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="md:hidden flex items-center"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="sr-only">Open main menu</span>
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg transition-all duration-300 border-t border-border ${mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}>
        <div className="container-main py-2 space-y-1">
          {navigation.map((item) => (
            <Link key={item.name} href={item.href} className="block py-2" onClick={() => setMobileMenuOpen(false)}>
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
          <div className="pt-4 mt-2 border-t border-border flex flex-col space-y-2">
            {user ? (
              <>
                <Link href="/admin" className="btn btn-secondary w-full" onClick={() => setMobileMenuOpen(false)}>Admin</Link>
                <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className="btn btn-danger w-full">Logout</button>
              </>
            ) : (
              <Link href="/login" className="btn btn-primary w-full" onClick={() => setMobileMenuOpen(false)}>Login</Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
