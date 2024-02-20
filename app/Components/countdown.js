"use client"
import React, { useEffect, useState } from 'react';
import { intervalToDuration } from 'date-fns'
import { Box } from '@mui/material';

function Countdown({ year, month, date, hour, minute, titel }) {
  const [years, setYears] = useState('');
  const [months, setMonths] = useState('');
  const [days, setDays] = useState('');
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const then = new Date(year, month, date, hour, minute);

      const now = new Date();
      const countdown = intervalToDuration({
        start: now,
        end: then
      })

      const years = countdown.years
      const months = countdown.months
      const days = countdown.days
      const hours = countdown.hours
      const minutes = countdown.minutes
      const seconds = countdown.seconds

      setYears(years);
      setMonths(months);
      setDays(days);
      setHours(hours);
      setMinutes(minutes);
      setSeconds(seconds)
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const zerodays = () => {
    if (months === 0 && days === 0) {
      return ''
    } else return (<div className='countdown-item' >
      <SVGCircle radius={daysRadius} style={{ display: days ? 'flex' : 'none' }} />
      {days}
      <span>days</span>
    </div>)
  }

  const yearRadius = mapNumber(years, 2);
  const monthsRadius = mapNumber(months, 12);
  const daysRadius = mapNumber(days, 30);
  const hoursRadius = mapNumber(hours, 24);
  const minutesRadius = mapNumber(minutes, 60);
  const secondsRadius = mapNumber(seconds, 60);

  return (
    <div>
      <Box
        sx={{
          color: 'white'
        }}>
        <h2>Countdown to {titel}</h2>
        <div>{
        }</div></Box>
      <Box
        sx={{
          justifyContent: 'space-evenly'
        }}>
        <div className='countdown-wrapper'>
          {years ? (
            <div className='countdown-item' style={{ display: years ? 'flex' : 'none' }}>
              <SVGCircle radius={yearRadius} />
              {years}
              <span>years</span>
            </div>
          ) : ''}
          {months ? (
            <div className='countdown-item'>
              <SVGCircle radius={monthsRadius} style={{ display: months ? 'flex' : 'none' }} />
              {months}
              <span>months</span>
            </div>
          ) : ''}
          {zerodays()}
          <div className='countdown-item' >
            <SVGCircle radius={hoursRadius} style={{ display: minutes ? 'flex' : 'none' }} />
            {hours}
            <span>hours</span>
          </div>
          <div className='countdown-item' >
            <SVGCircle radius={minutesRadius} style={{ display: minutes ? 'flex' : 'none' }} />
            {minutes}
            <span>minutes</span>
          </div>
          <div className='countdown-item' >
            <SVGCircle radius={secondsRadius} />
            {seconds}
            <span>seconds</span>
          </div>

        </div>
      </Box>
    </div>
  )
}

const SVGCircle = ({ radius }) => (
  <svg className='countdown-svg'>
    <path fill="none" stroke="#c44394" strokeWidth="4" d={describeArc(50, 50, 48, 0, radius)} />
  </svg>
);

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}

function describeArc(x, y, radius, startAngle, endAngle) {

  var start = polarToCartesian(x, y, radius, endAngle);
  var end = polarToCartesian(x, y, radius, startAngle);

  var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  var d = [
    "M", start.x, start.y,
    "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
  ].join(" ");

  return d;
}

function mapNumber(number, in_min) {
  return (number - in_min) * (360 - 0) / (0 - in_min) + 0;
}

export default Countdown;
