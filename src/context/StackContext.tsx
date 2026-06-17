'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type StackId = 'sst' | 'mern' | 'dotnet'

export interface Stack {
  id: StackId
  label: string
  frontend: string
  backend: string
  db: string
  infra: string
  color: string
  description: string
}

export const STACKS: Stack[] = [
  {
    id: 'sst',
    label: 'SST v4 + Next.js',
    frontend: 'Next.js 15 + MUI + TypeScript',
    backend: 'Python + Django + DRF',
    db: 'PostgreSQL (RDS)',
    infra: 'AWS SST v4 — Lambda + API GW + CloudFront',
    color: '#a36da1',
    description: 'Recommended — fully serverless IaC, closest to their migration target spec.',
  },
  {
    id: 'mern',
    label: 'React + Express',
    frontend: 'React 19 + Vite + TypeScript',
    backend: 'Node.js + Express + Zod',
    db: 'MySQL',
    infra: 'cPanel / VPS — traditional deployment',
    color: '#66bb6a',
    description: 'Lower infra complexity — ideal for teams already on shared hosting.',
  },
  {
    id: 'dotnet',
    label: '.NET 9 Minimal API',
    frontend: 'Next.js 15 + TypeScript',
    backend: '.NET 9 Minimal API + EF Core',
    db: 'SQL Server',
    infra: 'Azure App Service + Azure DevOps',
    color: '#ce93d8',
    description: 'Closest to legacy stack — minimizes retraining, stays in Microsoft ecosystem.',
  },
]

const KEY = 'erp_stack'

function getStack(id: StackId) { return STACKS.find(s => s.id === id) ?? STACKS[0] }

interface StackCtx { stack: Stack; setStack: (id: StackId) => void }
const Ctx = createContext<StackCtx>({ stack: STACKS[0], setStack: () => {} })

export function StackProvider({ children }: { children: ReactNode }) {
  const [stackId, setStackId] = useState<StackId>('sst')

  useEffect(() => {
    const saved = localStorage.getItem(KEY) as StackId | null
    if (saved) setStackId(saved)

    const handler = (e: Event) => {
      const id = (e as CustomEvent<StackId>).detail
      setStackId(id)
    }
    window.addEventListener('stack-change', handler)
    return () => window.removeEventListener('stack-change', handler)
  }, [])

  const setStack = (id: StackId) => {
    localStorage.setItem(KEY, id)
    setStackId(id)
    window.dispatchEvent(new CustomEvent('stack-change', { detail: id }))
  }

  return <Ctx.Provider value={{ stack: getStack(stackId), setStack }}>{children}</Ctx.Provider>
}

export const useStack = () => useContext(Ctx)
