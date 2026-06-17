'use client'
import { createContext, useContext, useState, ReactNode } from 'react'

type Mode = 'dark' | 'light'
const ThemeModeContext = createContext<{ mode: Mode; toggle: () => void }>({ mode: 'dark', toggle: () => {} })

export function ThemeModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>('light')
  return (
    <ThemeModeContext.Provider value={{ mode, toggle: () => setMode(m => m === 'dark' ? 'light' : 'dark') }}>
      {children}
    </ThemeModeContext.Provider>
  )
}

export const useThemeMode = () => useContext(ThemeModeContext)
