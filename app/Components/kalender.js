"use client"
import React, { useEffect, useState } from 'react';
import { getDaysInMonth, getDay, getWeek, getDate, isSameDay, getYear, getMonth, isToday, getHours, getMinutes } from 'date-fns';
import { isMobile } from 'react-device-detect';
import { Box } from '@mui/material';
import Title from './title';
import { purple } from '@mui/material/colors';
import { hentData } from '@/api';
import CustomizedButtons from './Button';
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";
import ButtonIcon from './ButtonIcon';
import ModalElement from './modal';

const KalenderBox = ({ children, item, width, orientation }) => {
    const today = isToday(new Date(item?.fulddato))
    return <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        width,
        height: 50,
        alignItems: 'center',
        mb: 1,
        borderWidth: today ? 3 : 1,
        borderStyle: 'solid',
        borderColor: item?.udenfor ? 'aqua' : 'blue',
        color: item?.udenfor ? 'aqua' : 'black',
        textOrientation: orientation ? 'upright' : 'initial'
    }}>
        {children}
    </Box>
}

export default function Kalender() {
    const [month, setMonth] = useState(getMonth(new Date()))
    const [year, setYear] = useState(getYear(new Date()))
    const [gridItems, setGridItems] = useState([]);
    const [uge, setUge] = useState([]);
    const [index, setIndex] = useState(0);
    const [begivenheder, setBegivenheder] = useState([]);
    const [valgtBegivenhed, setValgtBegivenhed] = useState(false);
    const [error, setError] = useState([]);
    const [vaelgMaaned, setVaelgMaaned] = useState(false);
    const [eventModal, setEventModal] = useState(false);
    const handleOpen = () => setVaelgMaaned(!vaelgMaaned);
    const lilla = purple['A400']
    //console.log(month + ' ' + year)
    const ugeDage = ["Man", "Tirs", "Ons", "Tors", "Fre", "Lør", "Søn"]
    const monthDK = [
        "Januar", "Februar", "Marts", "April", "Maj", "Juni", "Juli", "August", "September", "Oktober", "November", "December"
    ];
    const ugenr = (m, d) => getWeek(new Date(year, m, d), {
        weekStartsOn: 1,
        firstWeekContainsDate: 4
    });
    const dateZero = (d) => d < 10 ? '0' + d : '' + d

    const handleYear = (plus) => {
        let aar;
        if (plus) {
            aar = year + 1
        } else aar = year - 1
        setYear(aar)
    }

    const handleMonths = (plus) => {
        const aarskiftePlus = () => {
            setMonth(0)
            setYear(year + 1)
        }
        const aarskifteMinus = () => {
            setMonth(11)
            setYear(year - 1)
        }
        if (plus) {
            month === 11 ? aarskiftePlus() : setMonth(month + 1)
        } else month === 0 ? aarskifteMinus() : setMonth(month - 1)
    }

    const maanedValg = () => {
        const titel = (titel) => <Box sx={{ display: 'flex', alignItems: 'center', flexFlow: 'row nowrap' }}>
            {titel}
            <Box sx={{ display: 'flex', alignItems: 'center', mr: '1%', position: 'absolute', right: 0, flexFlow: 'column wrap' }}>
                <Box sx={{ fontSize: 15 }}>{year}</Box>
                <Box sx={{ display: 'flex', flexFlow: 'row wrap' }}>
                    <ButtonIcon onClick={() => handleYear(false)}>
                        <MdKeyboardDoubleArrowLeft size={40} />
                    </ButtonIcon>
                    <ButtonIcon onClick={() => handleYear(true)}>
                        <MdKeyboardDoubleArrowRight size={40} />
                    </ButtonIcon>
                </Box>
            </Box>
        </Box>
        return (
            <Box>
                <ButtonIcon onClick={handleOpen}>
                    <Title>
                        {monthDK[month]} {year}
                    </Title>
                </ButtonIcon>
                <Box>
                    <ModalElement titel={titel('Vælg måned')} handleOpen={handleOpen} open={vaelgMaaned}>
                        {
                            monthDK.map(m => (
                                <Box key={m} sx={{ width: '33%' }}>
                                    <ButtonIcon
                                        sx={{
                                            borderStyle: monthDK[month] === m ? 'solid' : 'none',
                                            height: 50,
                                            borderWidth: 1,
                                            borderRadius: '50%',
                                            borderColor: 'green',
                                            '&:hover': {
                                                borderRadius: '50%',
                                                backgroundColor: 'green',
                                                color: 'white'
                                            },
                                        }}
                                        onClick={() => {
                                            setMonth(monthDK.indexOf(m))
                                            setVaelgMaaned(false)
                                        }}
                                    >
                                        {m}
                                    </ButtonIcon>
                                </Box>
                            ))
                        }
                    </ModalElement>
                </Box>
            </Box>
        )
    }

    useEffect(() => {
        const dageIMaaned = getDaysInMonth(new Date(year, month))
        let uger = []
        const dagnr = (m, d) => getDay(new Date(year, m, d))
        const startPaaSondag = dagnr(month, 1) === 0 ? 7 : dagnr(month, 1)
        const ugeFunktion = (maaned, nr) => {
            if (!dagnr(maaned, nr)) {
                const nummer = ugenr(maaned, nr)
                uger.push(nummer)
            }
        }
        let maaned = []
        let maanedenfor = getDaysInMonth(new Date(year, month - 1))
        let dateList = Array.from(Array(dageIMaaned)).map((val, index) => index + 1)
        hentData('kalender').then((data) => {
            setBegivenheder(data)
            dateList.map(i => {
                const fulddato = `${year}-${dateZero(month + 1)}-${dateZero(i)}`;
                if (data.some(event => isSameDay(new Date(event.dato), new Date(new Date(year, month, i))))) {
                    //console.log('test')
                    maaned.push({ dato: i, fulddato, event: true })
                } else maaned.push({ dato: i, fulddato })
                ugeFunktion(month, i)
            })
            for (let i = 1; i < startPaaSondag; i++) {
                const dato = { udenfor: true, dato: maanedenfor }
                maaned.unshift(dato)
                maanedenfor--
            }

            if (maaned.length != 35) {
                const talnr = maaned.length >= 36 ? 42 : 35
                const manglendeTal = talnr - maaned.length
                for (let i = 1; i <= manglendeTal; i++) {
                    const dato = { udenfor: true, dato: i }
                    maaned.push(dato)
                    ugeFunktion(month + 1, i)

                }
            }
        }).catch(err => {
            setError(err)
        })

        setGridItems(maaned);
        setUge(uger)
    }, [month, year]);
    const begivenhed = (dato) => {
        let filtreredeBegivenheder = begivenheder.filter(b => isSameDay(new Date(b.dato), new Date(dato.fulddato)))
        const handeEventModal = () => {
            setValgtBegivenhed(false)
            setEventModal(!eventModal)
        };

        const valgAfBegivenhed = (v) => {
            setValgtBegivenhed(true)
            setIndex(filtreredeBegivenheder.indexOf(v))
        }

        const liste = () => {
            if (filtreredeBegivenheder.length > 1) {
                return (
                    <ModalElement titel='vælg måned' handleOpen={handeEventModal} open={eventModal}>
                        {valgtBegivenhed ?
                            <Box>
                                <Box>{filtreredeBegivenheder[index].titel}</Box>
                                <Box>{getHours(filtreredeBegivenheder[index].dato)}:{dateZero(getMinutes(filtreredeBegivenheder[index].dato))}</Box>
                            </Box>
                            : filtreredeBegivenheder.map(p => {
                                return (
                                    <ButtonIcon key={p.id} onClick={() => valgAfBegivenhed(p)}>{p.titel}</ButtonIcon>
                                )
                            })}
                    </ModalElement>
                )
            } else return (
                <ModalElement titel='begivenhed' handleOpen={handeEventModal} open={eventModal}>
                    <Box>{filtreredeBegivenheder[0].titel}</Box>
                    <Box>{getHours(filtreredeBegivenheder[0].dato)}:{dateZero(getMinutes(filtreredeBegivenheder[0].dato))}</Box>
                </ModalElement>
            )
        }

        return <Box>
            <CustomizedButtons bgcolor={lilla} onClick={handeEventModal}>
                {dato.dato}
            </CustomizedButtons>
            <Box>
                {liste()}
            </Box>

        </Box>
    }

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: isMobile ? 'flex-end' : 'center', flexFlow: 'row wrap', width: '100%' }}>
                {maanedValg()}
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 3, mr: '1%', position: 'absolute', right: 0, flexFlow: 'row wrap' }}>
                    <ButtonIcon onClick={() => handleMonths(false)}>
                        <MdKeyboardDoubleArrowLeft size={40} />
                    </ButtonIcon>
                    <ButtonIcon onClick={() => handleMonths(true)}>
                        <MdKeyboardDoubleArrowRight size={40} />
                    </ButtonIcon>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', width: '95%', margin: '0 auto' }}>
                <Box sx={{ display: 'flex', flexFlow: 'column wrap', justifyContent: 'space-around', width: '7%', writingMode: isMobile ? 'vertical-lr' : 'horizontal-tb' }}>
                    <KalenderBox width='95%' orientation>
                        uge
                    </KalenderBox>
                    {
                        uge.map((ugenr, i) => (
                            <KalenderBox key={i} width='95%' orientation>
                                {ugenr}
                            </KalenderBox>
                        ))
                    }
                </Box>
                <Box sx={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'space-around', width: '93%' }}>
                    {ugeDage.map(ugedag => (
                        <KalenderBox key={ugedag} width='12.5%'>
                            {ugedag}
                        </KalenderBox>
                    ))}
                    {gridItems.map((item, i) => {
                        return (
                            <KalenderBox key={i} item={item} width='12.5%'>
                                {item.event ? begivenhed(item) : item.dato}
                            </KalenderBox>
                        )
                    })}
                </Box>
            </Box>
        </Box>
    )

}