"use client"
import { Box } from '@/lib/mui';

export default function Home() {
  
  const sx = {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexFlow: 'row wrap',
    m: 2
  }

  return (
    <main>
      <Box sx={sx}>
       Ret her for at vise noget
      </Box>
    </main>
  )
}
