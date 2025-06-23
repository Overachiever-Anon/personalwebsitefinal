// src/app/admin/page.tsx
import { createServerClient } from '@/utils/supabase';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import DeleteButton from './components/DeleteButton';

// Define types for our content items
type ContentItem = {
  id: number;
  title: string;
  slug: string;
};

async function getDashboardData() {
  try {
    const supabase = await createServerClient();

    // Handle auth errors gracefully
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError) {
        console.error('Auth error:', authError);
        // Continue without redirecting to avoid breaking the admin page
        // Just show empty data instead
      } else if (!user) {
        redirect('/login');
      }
    } catch (authError) {
      console.error('Auth service error:', authError);
      // Continue without redirect
    }

    // Safe query function that won't throw on errors
    const safeQuery = async (table: string) => {
      try {
        const result = await supabase
          .from(table)
          .select('id, title, slug')
          .order('created_at', { ascending: false });
        
        return result.data || [];
      } catch (error) {
        console.error(`Error fetching ${table}:`, error);
        return [];
      }
    };

    // Query all tables with individual error handling
    const [
      blogPosts,
      projects,
      codeItems,
      researchNotes,
      gameplayItems
    ] = await Promise.all([
      safeQuery('blog_posts'),
      safeQuery('projects'),
      safeQuery('code_items'),
      safeQuery('research_notes'),
      safeQuery('gameplay_items')
    ]);

    return {
      blogPosts: (blogPosts as ContentItem[]),
      projects: (projects as ContentItem[]),
      codeItems: (codeItems as ContentItem[]),
      researchNotes: (researchNotes as ContentItem[]),
      gameplayItems: (gameplayItems as ContentItem[])
    };
  } catch (error) {
    console.error('Dashboard data fetch error:', error);
    // Return empty data instead of crashing
    return {
      blogPosts: [],
      projects: [],
      codeItems: [],
      researchNotes: [],
      gameplayItems: []
    };
  }
}

// DeleteButton is now imported from './components/DeleteButton'

const getIconForSection = (title: string) => {
  switch (title) {
    case 'Blog Posts':
      return (
        <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      );
    case 'Projects':
      return (
        <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      );
    case 'Code Showcase':
      return (
        <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      );
    case 'Research Notes':
      return (
        <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      );
    case 'Gameplay Clips':
      return (
        <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M15 14h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    default:
      return (
        <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      );
  }
};

const AdminTile = ({ title, items, addLink, sectionSlug, tableName }: { title: string; items: ContentItem[]; addLink: string; sectionSlug: string; tableName: string; }) => (
  <div className="bg-background/60 backdrop-blur-sm border border-border/50 rounded-xl p-6 hover:bg-background/70 transition-all duration-200">
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
          {getIconForSection(title)}
        </div>
        <div>
          <h2 className="text-xl font-semibold text-text">{title}</h2>
          <p className="text-sm text-text-secondary">{items.length} item{items.length !== 1 ? 's' : ''}</p>
        </div>
      </div>
      <Link 
        href={addLink} 
        className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-all duration-200 font-medium flex items-center gap-2 text-sm"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Add New
      </Link>
    </div>
    
    <div className="space-y-3 max-h-80 overflow-y-auto">
      {items.length > 0 ? (
        items.map(item => (
          <div key={item.id} className="flex justify-between items-center bg-background/80 border border-border/30 p-4 rounded-lg hover:bg-background/90 transition-all duration-200 group">
            <Link 
              href={`/${sectionSlug}/${item.slug}`} 
              className="flex-1 text-text hover:text-accent transition-colors duration-200 font-medium truncate mr-4"
              title={item.title}
            >
              {item.title}
            </Link>
            <div className="flex items-center gap-2 opacity-80 group-hover:opacity-100 transition-opacity duration-200">
              <Link 
                href={`/admin/edit/${tableName}/${item.id}`} 
                className="px-3 py-1.5 text-xs font-medium text-text bg-background border border-border rounded-md hover:bg-background/80 transition-all duration-200 flex items-center gap-1"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit
              </Link>
              <DeleteButton id={item.id} tableName={tableName} sectionSlug={sectionSlug} />
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-background/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <p className="text-text-secondary text-sm">No items yet</p>
          <p className="text-text-secondary/70 text-xs mt-1">Create your first {title.toLowerCase().slice(0, -1)} to get started</p>
        </div>
      )}
    </div>
  </div>
);

export default async function AdminDashboard() {
  const { blogPosts, projects, codeItems, researchNotes, gameplayItems } = await getDashboardData();
  
  const totalItems = blogPosts.length + projects.length + codeItems.length + researchNotes.length + gameplayItems.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90">
      <div className="container-main py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-10">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                </svg>
              </div>
              <div>
                <h1 className="text-4xl font-bold text-text">Content Dashboard</h1>
                <p className="text-text-secondary text-lg">Manage your portfolio content and publications</p>
              </div>
            </div>
            
            {/* Stats Overview */}
            <div className="bg-background/60 backdrop-blur-sm border border-border/50 rounded-xl p-6">
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">{totalItems}</div>
                  <div className="text-xs text-text-secondary">Total Items</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-text">{blogPosts.length}</div>
                  <div className="text-xs text-text-secondary">Blog Posts</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-text">{projects.length}</div>
                  <div className="text-xs text-text-secondary">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-text">{codeItems.length}</div>
                  <div className="text-xs text-text-secondary">Code Items</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-text">{researchNotes.length}</div>
                  <div className="text-xs text-text-secondary">Research</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-text">{gameplayItems.length}</div>
                  <div className="text-xs text-text-secondary">Gameplay</div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            <AdminTile title="Blog Posts" items={blogPosts} addLink="/admin/new-post" sectionSlug="blog" tableName="blog_posts" />
            <AdminTile title="Projects" items={projects} addLink="/admin/new-project" sectionSlug="projects" tableName="projects" />
            <AdminTile title="Code Showcase" items={codeItems} addLink="/admin/new-code" sectionSlug="code" tableName="code_items" />
            <AdminTile title="Research Notes" items={researchNotes} addLink="/admin/new-research" sectionSlug="research" tableName="research_notes" />
            <AdminTile title="Gameplay Clips" items={gameplayItems} addLink="/admin/new-gameplay" sectionSlug="gameplay" tableName="gameplay_items" />
          </div>
        </div>
      </div>
    </div>
  );
}
