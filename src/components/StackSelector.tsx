'use client'
import { Box, ToggleButton, ToggleButtonGroup, Typography, Chip, Tooltip } from '@mui/material'
import { useStack, STACKS, StackId } from '@/context/StackContext'

export default function StackSelector() {
  const { stack, setStack } = useStack()
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, py: 3, px: 2, background: 'rgba(255,255,255,0.03)', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
      <Typography variant="caption" sx={{ color: 'text.secondary', letterSpacing: 2, textTransform: 'uppercase' }}>
        View this architecture in another stack
      </Typography>
      <ToggleButtonGroup value={stack.id} exclusive onChange={(_, v) => v && setStack(v as StackId)} size="small">
        {STACKS.map(s => (
          <Tooltip key={s.id} title={s.description}>
            <ToggleButton value={s.id} sx={{ px: 3, fontWeight: 600, borderColor: 'rgba(255,255,255,0.1)', '&.Mui-selected': { borderColor: s.color, color: s.color, background: `${s.color}15` } }}>
              {s.label}
            </ToggleButton>
          </Tooltip>
        ))}
      </ToggleButtonGroup>
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
        {[stack.frontend, stack.backend, stack.db, stack.infra].map(t => (
          <Chip key={t} label={t} size="small" sx={{ borderColor: stack.color, color: stack.color, border: '1px solid' }} variant="outlined" />
        ))}
      </Box>
    </Box>
  )
}
