"use client";
import React from 'react';
import { Title } from '$/Components';
import { useAppContext } from "$/AppContext";
import { Box } from '@/lib/mui';
import { chango } from './fonts';

export default function ServerFejl() {
    const { language, sprogfunktion } = useAppContext();
    const sprogting = (dan, eng) => {
        return (
            sprogfunktion(language, dan, eng)
        )
    }
    const mail = "christian@hammervig.dk"
    const errormessage = sprogting('Beklager men serveren er nede, prøv igen senere ellers kontakt mig på ', 'Sorry but the server is down, try again later otherwise contact me on ');

    return (
        <Box sx={{ textAlign: 'center', textShadow: '-1px 0px 0px black' }}>
            <Title className={chango.className} color='blue' size={10}>
                {errormessage}<a href={`mailto:${mail}`}>{mail}</a>
            </Title>
        </Box>
    );
}