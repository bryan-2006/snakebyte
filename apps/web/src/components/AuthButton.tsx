'use client'
import { useSession, signIn, signOut } from 'next-auth/react'

export function AuthButton() {
  const { data: session, status } = useSession()

  if (status === 'loading') return <p>Loading...</p>

  if (session) {
    return (
      <div className="flex items-center gap-4">
        <p>Welcome, {session.user?.name}!</p>
        <button 
          onClick={() => signOut()}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Sign Out
        </button>
      </div>
    )
  }

  return (
    <button 
      onClick={() => signIn('google')}
      className="bg-blue-500 text-white px-4 py-2 rounded"
    >
      Sign in with Google
    </button>
  )
}