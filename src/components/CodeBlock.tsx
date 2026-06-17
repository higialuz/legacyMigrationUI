'use client'
import { Box, Typography } from '@mui/material'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface Props {
  code: string
  language?: string
  label?: string
}

export default function CodeBlock({ code, language = 'typescript', label }: Props) {
  return (
    <Box sx={{ borderRadius: 2, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
      {label && (
        <Box sx={{ px: 2, py: 0.75, bgcolor: 'rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <Typography variant="caption" sx={{ color: 'text.secondary', fontFamily: 'monospace' }}>{label}</Typography>
        </Box>
      )}
      <SyntaxHighlighter language={language} style={vscDarkPlus} customStyle={{ margin: 0, borderRadius: 0, fontSize: '0.82rem' }}>
        {code.trim()}
      </SyntaxHighlighter>
    </Box>
  )
}
