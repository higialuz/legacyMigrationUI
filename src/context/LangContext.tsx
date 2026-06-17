'use client'
import { createContext, useContext, useState, ReactNode } from 'react'

export type Lang = 'en' | 'pt'
const LangContext = createContext<{ lang: Lang; toggle: () => void }>({ lang: 'en', toggle: () => {} })

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en')
  return (
    <LangContext.Provider value={{ lang, toggle: () => setLang(l => l === 'en' ? 'pt' : 'en') }}>
      {children}
    </LangContext.Provider>
  )
}

export const useLang = () => useContext(LangContext)
