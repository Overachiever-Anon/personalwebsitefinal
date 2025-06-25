"use client";

import dynamic from 'next/dynamic';

// Dynamically import the Header component with SSR disabled.
// This ensures it only renders on the client-side.
const Header = dynamic(() => import('@/components/layout/Header'), {
  ssr: false,
});

// This component acts as a client-side boundary for the Header.
export default function ClientHeader() {
  return <Header />;
}
