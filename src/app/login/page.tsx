// src/app/login/page.tsx
import { signIn } from './actions'

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  return (
    <div className="container-main py-12">
      <div className="max-w-md mx-auto card p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Admin Login</h1>
        <form action={signIn}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-2 bg-background/50 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-2 bg-background/50 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
              required
            />
          </div>
          {error && (
            <div className="mb-4 text-red-500 text-sm text-center">
              Login failed. Please try again.
            </div>
          )}
          <button
            type="submit"
            className="w-full px-6 py-3 bg-accent text-text rounded-md hover:bg-accent/80 transition-colors font-semibold"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}
