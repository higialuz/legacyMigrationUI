import type { Metadata } from 'next'
import { ThemeModeProvider } from '@/context/ThemeModeContext'
import DynamicLayout from '@/components/DynamicLayout'

export const metadata: Metadata = {
  title: 'ERP Migration Showcase — Emerson Yaegashi',
  description: 'Live migration showcase: Legacy VB.NET ERP → Modern serverless stack. Senior Software Engineer evaluation.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        <ThemeModeProvider>
          <DynamicLayout>{children}</DynamicLayout>
        </ThemeModeProvider>
      </body>
    </html>
  )
}
