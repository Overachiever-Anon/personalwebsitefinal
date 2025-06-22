import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen p-8 bg-background text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-white">Andreas Kurz</h1>
        <p className="text-xl mb-8">Researcher, Developer, Gaming Enthusiast</p>
        
        <div className="flex gap-4 mb-8">
          <Link href="/projects" className="px-4 py-2 bg-blue-600 text-white rounded">
            Projects
          </Link>
          <Link href="/blog" className="px-4 py-2 border border-gray-600 text-white rounded">
            Blog
          </Link>
        </div>
        
        <h2 className="text-2xl font-bold mb-4">Explore Portfolio</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Link 
            href="/research" 
            className="p-4 bg-gray-800 border border-gray-700 rounded"
          >
            <h3 className="font-bold">Research</h3>
            <p className="text-gray-300">Academic publications and research</p>
          </Link>
          <Link 
            href="/code" 
            className="p-4 bg-gray-800 border border-gray-700 rounded"
          >
            <h3 className="font-bold">Code</h3>
            <p className="text-gray-300">Coding projects and implementations</p>
          </Link>
          <Link 
            href="/gameplay" 
            className="p-4 bg-gray-800 border border-gray-700 rounded"
          >
            <h3 className="font-bold">Gameplay</h3>
            <p className="text-gray-300">Gaming clips and highlights</p>
          </Link>
          <Link 
            href="/about" 
            className="p-4 bg-gray-800 border border-gray-700 rounded"
          >
            <h3 className="font-bold">About</h3>
            <p className="text-gray-300">More about me</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
