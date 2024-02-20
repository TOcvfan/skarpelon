"use client"
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import male from '@/media/male.png';
import female from '@/media/female.png';
import es from '@/media/microwave.png';
import Image from 'next/image';

export default function Gender(props) {
    const def = props.defaultValue ? props.defaultValue : 'female'
    const [gender, setGender] = useState(def)
    const selectedGender = () => {
        switch (gender) {
            case 'male': return <Image height={55} src={male} alt={gender} />
            case 'female': return <Image height={55} src={female} alt={gender} />
            case 'other': return <Image height={55} src={es} alt={gender} />
            default: return null
        }
    }
    const sexvalg = (s) => {
        setGender(s)
        props.setValue('sex', s)
    }

    const buttons = [
        <Button variant={gender === 'female' ? 'contained' : 'outlined'} color="secondary" key="female" onClick={() => sexvalg('female')}>Female</Button>,
        <Button variant={gender === 'male' ? 'contained' : 'outlined'} key="male" onClick={() => sexvalg('male')}>Male</Button>,
        <Button variant={gender === 'other' ? 'contained' : 'outlined'} color="success" key="other" onClick={() => sexvalg('other')}>Other</Button>,
    ];
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                '& > *': {
                    m: 1,
                },
            }}
        >
            {selectedGender()}
            <ButtonGroup size="large" aria-label="large button group">
                {buttons}
            </ButtonGroup>
        </Box>
    );
}
