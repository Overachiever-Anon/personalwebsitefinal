// src/app/blog/[slug]/page.tsx
export const dynamic = 'force-dynamic';

import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import Image from 'next/image'
import Link from 'next/link'

// Cannot use generateStaticParams because it would require cookies() which can't be used at build time
// Dynamic routes will be generated at request time

// Fetches the data for a single post
async function getPost(slug: string) {
    const supabase = await createClient()

    const { data: post, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .single()

    if (error || !post) {
        notFound()
    }

    return post
}


export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getPost(slug)

    return (
        <article className="container-main py-12">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    {post.category && (
                        <p className="text-accent font-semibold mb-2">{post.category}</p>
                    )}
                    <h1 className="text-4xl lg:text-5xl font-bold mb-4">{post.title}</h1>
                    <div className="text-gray-400 flex items-center justify-center space-x-4">
                        <span>{new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        {post.read_time && (
                            <>
                                <span>•</span>
                                <span>{post.read_time}</span>
                            </>
                        )}
                    </div>
                </div>

                {/* Featured Image */}
                {post.image_url && (
                    <div className="mb-12 relative w-full h-96 rounded-lg overflow-hidden">
                        <Image
                            src={post.image_url}
                            alt={post.title}
                            layout="fill"
                            objectFit="cover"
                            className="bg-gray-800"
                        />
                    </div>
                )}

                {/* Post Content */}
                <div className="prose prose-invert prose-lg max-w-none mx-auto prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-a:text-accent hover:prose-a:text-accent/80 prose-blockquote:border-l-accent prose-code:bg-gray-800 prose-code:p-1 prose-code:rounded-md prose-pre:bg-gray-800 prose-pre:p-4 prose-pre:rounded-lg">
                    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                        {post.content}
                    </ReactMarkdown>
                </div>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                    <div className="mt-12 pt-8 border-t border-border">
                        <h3 className="text-xl font-semibold mb-4">Tags</h3>
                        <div className="flex flex-wrap gap-2">
                            {post.tags.map((tag: string) => (
                                <span key={tag} className="px-3 py-1 bg-background/50 border border-border rounded-full text-sm">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Back to Blog Button */}
                <div className="mt-12 text-center">
                    <Link href="/blog" className="inline-block px-6 py-3 bg-accent text-text rounded-md hover:bg-accent/80 transition-colors font-semibold">
                        ← Back to Blog
                    </Link>
                </div>
            </div>
        </article>
    )
}
