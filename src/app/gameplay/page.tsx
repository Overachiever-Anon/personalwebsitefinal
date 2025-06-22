import Link from 'next/link';
import Image from 'next/image';

interface GameplayClip {
  id: string;
  title: string;
  description: string;
  game: string;
  tags: string[];
  thumbnailUrl: string;
  videoUrl: string;
  date: string;  // ISO date string format
  duration: string; // e.g., "2:34"
  featured: boolean;
}

const gameplayClips: GameplayClip[] = [
  {
    id: 'apex-legends-squad-wipe',
    title: 'Epic Squad Wipe in Apex Legends Finals',
    description: 'Clutch 1v3 situation in the final circle of a tournament match, showcasing positioning and strategic weapon usage.',
    game: 'Apex Legends',
    tags: ['Tournament', 'FPS', 'Battle Royale'],
    thumbnailUrl: '/gameplay/apex-thumb.jpg',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder
    date: '2024-06-01',
    duration: '1:42',
    featured: true
  },
  {
    id: 'elden-ring-boss',
    title: 'Defeating Malenia Without Taking Damage',
    description: 'Perfect no-hit run against one of the hardest bosses in Elden Ring using a minimalist build.',
    game: 'Elden Ring',
    tags: ['Souls-like', 'Boss Fight', 'Challenge Run'],
    thumbnailUrl: '/gameplay/elden-ring-thumb.jpg',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder
    date: '2024-05-12',
    duration: '3:18',
    featured: true
  },
  {
    id: 'valorant-ace',
    title: 'Valorant Ace with Ghost Only',
    description: 'Economic round ace using only the Ghost pistol, demonstrating precise aim and positioning.',
    game: 'Valorant',
    tags: ['Tactical FPS', 'Competitive', 'Pistol Round'],
    thumbnailUrl: '/gameplay/valorant-thumb.jpg',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder
    date: '2024-04-23',
    duration: '0:48',
    featured: false
  },
  {
    id: 'minecraft-redstone',
    title: 'Advanced Redstone Computer Implementation',
    description: 'Demonstration of a fully functional 8-bit computer built using Minecraft redstone mechanics.',
    game: 'Minecraft',
    tags: ['Redstone', 'Engineering', 'Creative'],
    thumbnailUrl: '/gameplay/minecraft-thumb.jpg',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder
    date: '2024-03-15',
    duration: '5:27',
    featured: false
  },
  {
    id: 'rocket-league-aerial',
    title: 'Freestyle Aerial Goal Compilation',
    description: 'A collection of complex aerial maneuvers and goals from competitive Rocket League matches.',
    game: 'Rocket League',
    tags: ['Sports', 'Competitive', 'Aerial Mechanics'],
    thumbnailUrl: '/gameplay/rocket-league-thumb.jpg',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder
    date: '2024-02-28',
    duration: '2:15',
    featured: false
  },
  {
    id: 'zelda-speedrun',
    title: 'Legend of Zelda: TOTK - Any% Speedrun',
    description: 'Any% speedrun of Tears of the Kingdom utilizing advanced movement tech and glitches.',
    game: 'The Legend of Zelda: TOTK',
    tags: ['Speedrun', 'Action Adventure', 'Open World'],
    thumbnailUrl: '/gameplay/zelda-thumb.jpg',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder
    date: '2024-01-10',
    duration: '38:24',
    featured: false
  }
];

export default function GameplayPage() {
  // Separate featured and regular clips
  const featuredClips = gameplayClips.filter(clip => clip.featured);
  const regularClips = gameplayClips.filter(clip => !clip.featured);
  
  // Get unique game names for filtering
  const games = [...new Set(gameplayClips.map(clip => clip.game))];
  
  return (
    <div className="min-h-screen py-12">
      {/* Page Header */}
      <div className="relative container-main mb-16">
        <div className="absolute -inset-1 bg-gradient-to-r from-secondary to-accent-secondary opacity-30 blur-md"></div>
        <div className="relative bg-card border border-border p-8 rounded-lg">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Gameplay Collection</h1>
          <p className="text-text-secondary text-lg max-w-3xl">
            A showcase of gaming highlights, achievements, and creative gameplay across various titles.
            From competitive moments to technical demonstrations.
          </p>
        </div>
      </div>
      
      {/* Game Filter */}
      <div className="container-main mb-12">
        <div className="flex flex-wrap gap-3 justify-center md:justify-start">
          <button className="px-4 py-2 rounded-full bg-accent text-text text-sm font-medium">
            All Games
          </button>
          {games.map((game) => (
            <button 
              key={game} 
              className="px-4 py-2 rounded-full bg-background/50 text-text-secondary hover:bg-background text-sm font-medium transition-colors"
            >
              {game}
            </button>
          ))}
        </div>
      </div>
      
      {/* Featured Clips */}
      {featuredClips.length > 0 && (
        <section className="container-main mb-16">
          <h2 className="section-heading mb-8">Featured Clips</h2>
          
          <div className="grid grid-cols-1 gap-8">
            {featuredClips.map((clip) => (
              <Link 
                key={clip.id} 
                href={`/gameplay/${clip.id}`}
                className="relative group"
              >
                <div className="card overflow-hidden">
                  <div className="aspect-video relative">
                    {/* Video thumbnail with play overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10"></div>
                    <div className="absolute inset-0 flex items-center justify-center z-20">
                      <div className="w-16 h-16 rounded-full bg-accent/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <svg className="w-8 h-8 text-text" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                    
                    {/* Placeholder div for thumbnail */}
                    <div className="w-full h-full bg-background/30 flex items-center justify-center">
                      <span className="text-6xl">🎮</span>
                    </div>
                    
                    {/* Video metadata */}
                    <div className="absolute bottom-4 left-4 right-4 z-20">
                      <div className="flex justify-between items-center">
                        <span className="px-2 py-1 bg-background/80 rounded text-xs">
                          {clip.duration}
                        </span>
                        <span className="px-2 py-1 bg-accent/80 rounded text-xs font-medium">
                          {clip.game}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">
                      {clip.title}
                    </h3>
                    <p className="text-text-secondary mb-4">
                      {clip.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {clip.tags.map((tag, i) => (
                        <span 
                          key={i}
                          className="px-2 py-0.5 bg-background/50 rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
      
      {/* Regular Clips */}
      <section className="container-main">
        <h2 className="section-heading mb-8">All Gameplay Clips</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularClips.map((clip) => (
            <Link 
              key={clip.id} 
              href={`/gameplay/${clip.id}`}
              className="card overflow-hidden hover:shadow-accent/20 transition-all group"
            >
              <div className="aspect-video relative">
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  <div className="w-12 h-12 rounded-full bg-accent/90 flex items-center justify-center">
                    <svg className="w-6 h-6 text-text" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                
                {/* Placeholder div for thumbnail */}
                <div className="w-full h-full bg-background/30 flex items-center justify-center">
                  <span className="text-4xl">{clip.game.charAt(0)}</span>
                </div>
                
                {/* Video metadata */}
                <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center">
                  <span className="px-2 py-0.5 bg-background/80 rounded text-xs">
                    {clip.duration}
                  </span>
                  <span className="px-2 py-0.5 bg-accent/80 rounded text-xs">
                    {clip.game}
                  </span>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-bold mb-1 group-hover:text-accent transition-colors">
                  {clip.title}
                </h3>
                <p className="text-text-secondary text-sm line-clamp-2">
                  {clip.description}
                </p>
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
