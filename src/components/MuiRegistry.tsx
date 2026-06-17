'use client'
import { ReactNode } from 'react'
import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'

const cache = createCache({ key: 'mui', prepend: true })

export default function MuiRegistry({ children }: { children: ReactNode }) {
  return <CacheProvider value={cache}>{children}</CacheProvider>
}
