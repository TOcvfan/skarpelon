"use client"
import React from 'react';
import { Box, MenuItem } from '@mui/material';
import { format } from 'date-fns';
import Text from './InputTextField';

export default function SimpelTid({ year, month, date, setValue, name, timer, setTimer, minutter, setMinutter, result, label }) {
    const datoTekst = "yyyy-MM-dd HH:mm:ss"
    const timeList = Array.from(Array(24)).map((val, index) => index)
    const minutList = ['00', '30']

    const handleHour = (event) => {
        setTimer(event.target.value)
        result = format(new Date(year, month, date, event.target.value, minutter), datoTekst);
        setValue(name, result)
    };

    const handleMin = (event) => {
        setMinutter(event.target.value);
        result = format(new Date(year, month, date, timer, event.target.value), datoTekst);
        setValue(name, result)
    };

    return (
        <Box>
            <Box>{label}</Box>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-evenly',
                flexDirection: 'row'
            }}>
                <Text select={true} helper={timer} value={timer} onChange={handleHour} type='select'>{
                    timeList.map(t => {
                        return (
                            <MenuItem key={t} value={t}>{t > 9 ? '' + t : '0' + t}</MenuItem>
                        )
                    })
                }</Text>
                <Text select={true} helper={minutter} value={minutter} onChange={handleMin} type='select'>{
                    minutList.map((m, i) => {
                        return (
                            <MenuItem key={i} value={m}>{m}</MenuItem>
                        )
                    })
                }</Text>
            </Box>
        </Box>
    );
}