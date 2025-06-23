import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';

export const revalidate = 3600;

async function getGameplayItem(slug: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('gameplay_items')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) {
    notFound();
  }

  return data;
}

// Generate static paths for existing gameplay clips
export async function generateStaticParams() {
  const supabase = createClient();
  const { data: items } = await supabase.from('gameplay_items').select('slug');
  return items?.map(({ slug }) => ({ slug })) || [];
}

// Helper to convert regular YouTube URL to embeddable URL
const getEmbedUrl = (url: string) => {
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname === 'youtu.be') {
      return `https://www.youtube.com/embed/${urlObj.pathname.slice(1)}`;
    } else if (urlObj.hostname === 'www.youtube.com' || urlObj.hostname === 'youtube.com') {
      const videoId = urlObj.searchParams.get('v');
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    }
    return url; // Return original URL if it's not a recognizable YouTube link
  } catch (error) {
    console.error('Invalid video URL:', error);
    return '';
  }
};

export default async function GameplayDetailPage({ params }: { params: { slug: string } }) {
  const item = await getGameplayItem(params.slug);
  const embedUrl = getEmbedUrl(item.video_url);

  return (
    <div className="container-main py-12">
      <div className="max-w-4xl mx-auto">
        {/* Video Player */}
        <div className="aspect-video mb-8 bg-background/50 rounded-lg overflow-hidden border border-border">
          {embedUrl ? (
            <iframe
              width="100%"
              height="100%"
              src={embedUrl}
              title={item.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-text-secondary">Could not load video.</p>
            </div>
          )}
        </div>

        {/* Clip Details */}
        <div className="bg-card border border-border p-8 rounded-lg">
          <h1 className="text-3xl font-bold mb-2">{item.title}</h1>
          <div className="flex items-center gap-4 mb-4 text-sm text-text-secondary">
            <span className="px-3 py-1 bg-accent/20 text-accent rounded-full font-medium">
              {item.game_name}
            </span>
            <span>•</span>
            <span>{item.platform || 'N/A'}</span>
          </div>

          <p className="text-lg text-text-secondary mb-6">
            {item.description}
          </p>

          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag: string, i: number) => (
                <span key={i} className="px-3 py-1 bg-background/70 rounded-full text-xs">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
