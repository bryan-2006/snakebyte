'use client'
import { Provider as UrqlProvider } from 'urql'
import { urqlClient } from '../lib/urqlClient'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <UrqlProvider value={urqlClient}>
      {children}
    </UrqlProvider>
  )
}