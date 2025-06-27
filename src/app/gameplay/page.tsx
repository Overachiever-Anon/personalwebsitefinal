export const dynamic = 'force-dynamic';

import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/utils/supabase/server';


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
  const supabase = await createClient();

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

async function getSteamStats() {
  try {
    const apiKey = process.env.STEAM_API_KEY;
    const steamId = process.env.STEAM_USER_ID;
    console.log('--- Checking Steam Credentials ---');
    console.log('Found STEAM_API_KEY:', !!apiKey && apiKey !== 'YOUR_STEAM_API_KEY');
    console.log('Found STEAM_USER_ID:', !!steamId && steamId !== 'YOUR_64_BIT_STEAM_ID');
    console.log('--------------------------------');

    if (!apiKey || !steamId || apiKey === 'YOUR_STEAM_API_KEY' || steamId === 'YOUR_64_BIT_STEAM_ID') {
      console.warn('Steam API key or User ID is not set in environment variables. Skipping fetch.');
      return {
        totalGames: 'N/A',
        hoursPlayed: 'N/A',
      };
    }

    try {
      const response = await fetch(`http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${apiKey}&steamid=${steamId}&format=json&include_appinfo=true`);
      if (!response.ok) {
        const errorBody = await response.text();
        console.error(`Steam API request failed with status ${response.status}: ${errorBody}`);
        return { totalGames: 'Error', hoursPlayed: 'Error' };
      }
      const data = await response.json();

      if (!data.response || !data.response.games) {
        console.error('Invalid response from Steam API. Your profile may be private.');
        return { totalGames: 'N/A', hoursPlayed: 'N/A' };
      }

      const totalGames = data.response.game_count;
      const totalMinutesPlayed = data.response.games.reduce((sum: number, game: any) => sum + game.playtime_forever, 0);
      const hoursPlayed = Math.round(totalMinutesPlayed / 60);

      return {
        totalGames: totalGames.toLocaleString(),
        hoursPlayed: hoursPlayed.toLocaleString(),
      };
    } catch (error) {
      console.error('Error fetching Steam stats:', error);
      return { totalGames: 'Error', hoursPlayed: 'Error' };
    }
  } catch (error) {
    console.error('Error fetching Steam stats:', error);
    return { totalGames: 'Error', hoursPlayed: 'Error' };
  }
}

export default async function GameplayPage() {
  const gameplayItems = await getGameplayItems();
  const games = [...new Set(gameplayItems.map(clip => clip.game_name))];
  const steamStats = await getSteamStats();
  
  const stats = [
    { label: 'Total Games', value: steamStats.totalGames },
    { label: 'Hours Played', value: steamStats.hoursPlayed ? `${steamStats.hoursPlayed.toLocaleString()}+` : 'N/A' },
    { label: 'Tournaments', value: '12' }, // Static for now
    { label: 'Achievements', value: 'N/A' } // Placeholder
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container-main mb-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">Gameplay Collection</h1>
          <p className="text-text-secondary text-lg text-center mb-8 max-w-2xl mx-auto">
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
            {stats.map((stat, i) => (
              <div key={i} className="text-center p-4">
                <div className="text-2xl md:text-4xl font-bold text-accent mb-2">{stat.value}</div>
                <div className="text-text-secondary text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
          {(steamStats.totalGames === 'N/A' || steamStats.totalGames === 'Error') && (
            <p className="text-center text-text-secondary mt-4 text-sm">
              Could not fetch Steam stats. Please ensure your API key and Steam ID are correct in <code>.env.local</code> and your Steam profile is public.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
