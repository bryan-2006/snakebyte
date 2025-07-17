'use client'
import { Provider as UrqlProvider } from 'urql'
import { SessionProvider } from 'next-auth/react'
import { urqlClient } from '../lib/urqlClient'

export function Providers({ 
  children,
  session 
}: { 
  children: React.ReactNode
  session?: any
}) {
  return (
    <SessionProvider session={session}>
      <UrqlProvider value={urqlClient}>
        {children}
      </UrqlProvider>
    </SessionProvider>
  )
}