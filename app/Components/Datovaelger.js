"use client"
import React, { useState } from 'react';
import { getYear, getDate, getMonth, format } from 'date-fns';
import SimpelDato from './simpelDato';
import { Box } from '@mui/material';
import SimpelTid from './tid';
import Title from './title';

export default function DatoValger({ lan, setValue, dato, name, dateZero, tid, setDato, label, tidLabel, datoLabel, maxOffset, retning, datoText }) {
  const [year, setYear] = useState(getYear(new Date(dato)));
  const [date, setDate] = useState(getDate(new Date(dato)));
  const [month, setMonth] = useState(getMonth(new Date(dato)));
  const [hour, setHour] = useState(10);
  const [minut, setMinut] = useState('00');

  const set = () => {
    if (lan === undefined) {
      return true
    } else lan === 'Dk'
  }
  let result = format(new Date(year, month, date, hour, minut), "yyyy-MM-dd HH:mm:ss");

  const monthEng = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
  ];
  const monthDK = [
    "Januar", "Februar", "Marts", "April", "Maj", "Juni", "Juli", "August", "September", "Oktober", "November", "December"
  ];

  const months = set() ? monthDK : monthEng;

  const skifter = () => {
    switch (tid) {
      case 'tid': return <SimpelTid month={month} year={year} date={date} minutter={minut} timer={hour} setMinutter={setMinut} setTimer={setHour} setValue={setValue} name={name} dateZero={dateZero} label={tidLabel} />;
      case 'dato': return <SimpelDato setDato={setDato} months={months} year={year} setYear={setYear} month={month} setMonth={setMonth} result={result} date={date} timer={hour} minut={minut} setValue={setValue} setDate={setDate} datoTekst={datoText} name={name} label={datoLabel} maxOffset={maxOffset} retning={retning} />;
      default: return <Box>
        <SimpelDato setDato={setDato} months={months} year={year} setYear={setYear} month={month} setMonth={setMonth} result={result} date={date} timer={hour} minut={minut} setValue={setValue} datoTekst={datoText} setDate={setDate} name={name} maxOffset={maxOffset} retning={retning} />
        <SimpelTid month={month} year={year} date={date} minutter={minut} timer={hour} setMinutter={setMinut} setTimer={setHour} setValue={setValue} name={name} dateZero={dateZero} />
      </Box>
    }
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Title size={10}>{label}</Title>
      {skifter()}
    </Box>
  )

}