"use client"
import { Box } from '@/lib/mui';
import React from 'react';
import dk from '@/media/dk.svg'
import gb from '@/media/gb.svg'
import { useAppContext } from '$/AppContext';
import Image from 'next/image';


const Flag = () => {
    const { language, setLanguage } = useAppContext();
    const lanDk = language === 'Dk'
    const shifttxt = lanDk ? 'dk' : 'gb'
    return (
        <Box className='flagskift' sx={{ ml: 2 }}>
            <Image style={{
                width: '100%',
                height: 'auto',
            }} src={lanDk ? gb : dk} alt={shifttxt} className="image" onClick={() => setLanguage(lanDk ? 'GB' : 'Dk')} />
            <Box className='overlay'>
                <Image style={{
                    width: '100%',
                    height: 'auto',
                }} src={lanDk ? gb : dk} alt={shifttxt} className="txt" onClick={() => setLanguage(lanDk ? 'GB' : 'Dk')} />
            </Box>
        </Box>
    )
}

export default Flag;
