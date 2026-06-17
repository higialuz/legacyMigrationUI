'use client'
import { Card, CardContent, Typography, Box, Chip } from '@mui/material'
import { ReactNode } from 'react'

interface Props {
  number?: string | number
  title: string
  children: ReactNode
  risk?: string
  who?: string
  color?: string
}

export default function ArtifactCard({ number, title, children, risk, who, color = '#4fc3f7' }: Props) {
  return (
    <Card elevation={0}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
          {number && (
            <Box sx={{ minWidth: 36, height: 36, borderRadius: '50%', bgcolor: `${color}20`, border: `1px solid ${color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Typography sx={{ fontWeight: 800, fontSize: '0.8rem', color }}>{number}</Typography>
            </Box>
          )}
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>{title}</Typography>
            <Box sx={{ color: 'text.secondary', fontSize: '0.9rem', lineHeight: 1.7 }}>{children}</Box>
            {(risk || who) && (
              <Box sx={{ display: 'flex', gap: 1, mt: 2, flexWrap: 'wrap' }}>
                {risk && <Chip label={`⚠ ${risk}`} size="small" color="warning" variant="filled" />}
                {who && <Chip label={`👥 ${who}`} size="small" color="info" variant="filled" />}
              </Box>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}
