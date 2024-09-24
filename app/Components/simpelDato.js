"use client"
import React from 'react';
import { Box, MenuItem } from '@mui/material';
import { format, getYear } from 'date-fns';
import Text from './InputTextField';

export default function SimpelDato({ months, year, setYear, month, setMonth, date, setDate, setValue, timer, minut, name, result, setDato, label, maxOffset, retning, datoTekst }) {
    const setYearList = getYear(new Date())
    const minus = (index) => retning ? ((setYearList - 1) - index) : (setYearList - 1 + index)
    const yearList = Array.from(Array(maxOffset)).map((_, index) => minus(index))
    const monthList = Array.from(Array(12)).map((_, index) => index)
    const dateList = Array.from(Array(31)).map((_, index) => index + 1)
    //let result = format(new Date(year, month, date), "yyyy-MM-dd")
    year = year - 1

    const handleYear = (event) => {
        setYear(event.target.value + 1)
        result = format(new Date(event.target.value, month, date, timer, minut), datoTekst);
        setDato ? setDato(result) : console.log('år')
        setValue(name, result)
    };

    const handleMonth = (event) => {
        setMonth(event.target.value);
        result = format(new Date(year, event.target.value, date, timer, minut), datoTekst);
        setDato ? setDato(result) : console.log('måned')
        setValue(name, result)
    };

    const handleDate = (event) => {
        setDate(event.target.value);
        result = format(new Date(year, month, event.target.value, timer, minut), datoTekst);
        setDato ? setDato(result) : console.log('dag')
        setValue(name, result)
    };

    return (
        <Box>
            <Box>{label}</Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row-reverse',
            }}>
                <Text helper={year + 1} value={year} onChange={handleYear} type='select' id='year'>{
                    yearList.map(y => {
                        return (
                            <MenuItem key={y} value={y}>{y}</MenuItem>
                        )
                    })
                }</Text>

                <Text helper={months[month]} value={month} onChange={handleMonth} type='select' id='month'>{
                    monthList.map(m => {
                        return (
                            <MenuItem key={m} value={m}>{months[m]}</MenuItem>
                        )
                    })
                }</Text>
                <Text helper={date} value={date} onChange={handleDate} type='select' id='day'>{
                    dateList.map(y => {
                        return (
                            <MenuItem key={y} value={y}>{y}</MenuItem>
                        )
                    })
                }</Text>
            </Box>
        </Box>
    );
}