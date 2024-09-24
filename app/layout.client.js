'use client'
import NavBar from './navBar';
import { AppProvider } from './AppContext';
import { useSelectedLayoutSegment } from 'next/navigation';
import Flag from './Components/Flag';
import { Box } from '@mui/material';


export default function ClientLayout({ children, navn }) {
    const activeSegment = useSelectedLayoutSegment()
    return (
        <AppProvider>
            <Box sx={{ flex: 1, paddingTop: '75px' }}>
                <NavBar aktiv={activeSegment} navn={navn} />
                <Flag />
                {children}
                <Box sx={{ m: 2 }}></Box>
            </Box>
        </AppProvider>
    )
}