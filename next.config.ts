import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'i.pinimg.com',  // Pinterest images
      'images.unsplash.com', // Unsplash images
      'https://ilygfbycnnhojzxlobmu.supabase.co', // Replace with your actual Supabase URL
      'localhost'
    ],
  },
};

export default nextConfig;
