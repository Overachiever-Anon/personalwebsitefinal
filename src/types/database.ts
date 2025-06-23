export interface Project {
  id: number;
  created_at: string;
  title: string;
  description: string | null;
  repo_url: string | null;
  live_url: string | null;
  is_featured: boolean;
}

export interface BlogPost {
  id: number;
  created_at: string;
  title: string;
  content: string | null;
  slug: string;
  is_published: boolean;
  snippet: string | null;
}

export interface ResearchNote {
  id: number;
  created_at: string;
  title: string;
  content: string | null;
}

export interface LolGameplay {
  id: number;
  created_at: string;
  champion: string | null;
  description: string | null;
  video_embed_url: string;
}
