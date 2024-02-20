"use client"
import React, { useState } from 'react';
import { Box } from '@mui/material';
import Image from 'next/image';

export default function FlagSprog({ flag, rotate, alt, setLanguage, lan, setValue, border, setBorder }) {
    const [hover, setHover] = useState(false);
    const handleClick = () => {
        setHover(false)
        setLanguage(lan)
        setValue('sprog', lan)
        setBorder(lan)
    }


    return (
        <div sx={{ border: '2px solid transparrent', height: 110, m: 1 }} onMouseOver={() => setHover(true)} onMouseOut={() => setHover(false)} onClick={handleClick} >
            {hover ?
                <Box sx={{ height: 110, border: '2px solid transparrent' }} ><Image src={rotate} alt={alt === undefined ? 'flag' : alt} height={110} /></Box> :
                <Box sx={{ height: 110, border: border === lan ? '2px solid purple' : 'none', m: border != lan ? '2px' : '0px' }}><Image src={flag} alt={alt === undefined ? 'flag' : alt} height={110} /></Box>
            }
        </div>
    );
}