import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/utils/supabase/server';

export const revalidate = 3600;

interface GameplayItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  game_name: string;
  tags: string[];
  thumbnail_url: string;
}

async function getGameplayItems(): Promise<GameplayItem[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('gameplay_items')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching gameplay items:', error);
    return [];
  }

  return data;
}

export default async function GameplayPage() {
  const gameplayItems = await getGameplayItems();
  const games = [...new Set(gameplayItems.map(clip => clip.game_name))];
  
  return (
    <div className="min-h-screen py-12">
      <div className="relative container-main mb-16">
        <div className="absolute -inset-1 bg-gradient-to-r from-secondary to-accent-secondary opacity-30 blur-md"></div>
        <div className="relative bg-card border border-border p-8 rounded-lg">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Gameplay Collection</h1>
          <p className="text-text-secondary text-lg max-w-3xl">
            A showcase of gaming highlights, achievements, and creative gameplay across various titles. From competitive moments to technical demonstrations.
          </p>
        </div>
      </div>
      
      {/* TODO: Implement game filtering */}
      <div className="container-main mb-12">
        <div className="flex flex-wrap gap-3 justify-center md:justify-start">
          <button className="px-4 py-2 rounded-full bg-accent text-text text-sm font-medium">All Games</button>
          {games.map((game) => (
            <button key={game} className="px-4 py-2 rounded-full bg-background/50 text-text-secondary hover:bg-background text-sm font-medium transition-colors">
              {game}
            </button>
          ))}
        </div>
      </div>
      
      <section className="container-main">
        <h2 className="section-heading mb-8">All Gameplay Clips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gameplayItems.map((clip) => (
            <Link 
              key={clip.id} 
              href={`/gameplay/${clip.slug}`}
              className="card overflow-hidden hover:shadow-accent/20 transition-all group"
            >
              <div className="aspect-video relative">
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  <div className="w-12 h-12 rounded-full bg-accent/90 flex items-center justify-center">
                    <svg className="w-6 h-6 text-text" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                  </div>
                </div>
                
                <Image 
                  src={clip.thumbnail_url || '/placeholder-image.jpg'} 
                  alt={clip.title}
                  layout="fill"
                  objectFit="cover"
                  className="bg-background/30"
                />
                
                <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center">
                  <span className="px-2 py-0.5 bg-accent/80 rounded text-xs">
                    {clip.game_name}
                  </span>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-bold mb-1 group-hover:text-accent transition-colors">{clip.title}</h3>
                <p className="text-text-secondary text-sm line-clamp-2">{clip.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
      
      {/* Game Statistics */}
      <section className="container-main mt-16">
        <h2 className="section-heading mb-8">Gaming Stats</h2>
        
        <div className="card p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Total Games', value: '25+' },
              { label: 'Hours Played', value: '5,000+' },
              { label: 'Tournaments', value: '12' },
              { label: 'Achievements', value: '867' }
            ].map((stat, i) => (
              <div key={i} className="text-center p-4">
                <div className="text-2xl md:text-4xl font-bold text-accent mb-2">{stat.value}</div>
                <div className="text-text-secondary text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
