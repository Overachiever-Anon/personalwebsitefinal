// src/app/gallery/page.tsx
import GalleryPage from '@/components/gallery/GalleryPage';

export const metadata = {
  title: 'Gallery | My Personal Website',
  description: 'Gallery of created images and artwork',
};

export default function Gallery() {
  return <GalleryPage />;
}
