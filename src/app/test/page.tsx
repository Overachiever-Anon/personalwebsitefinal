export default function TestPage() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-blue-500">Test Page</h1>
        <p className="text-xl mb-8">This is a test page with standard Tailwind classes.</p>
        
        <div className="flex gap-4 mb-8">
          <a href="/projects" className="px-4 py-2 bg-blue-600 text-white rounded">
            Projects
          </a>
          <a href="/" className="px-4 py-2 border border-gray-600 text-white rounded">
            Home
          </a>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-800 border border-gray-700 rounded">
            <h3 className="font-bold">Test Box 1</h3>
            <p className="text-gray-300">This is a test box using standard Tailwind classes</p>
          </div>
          <div className="p-4 bg-gray-800 border border-gray-700 rounded">
            <h3 className="font-bold">Test Box 2</h3>
            <p className="text-gray-300">This is another test box</p>
          </div>
        </div>
      </div>
    </div>
  );
}
