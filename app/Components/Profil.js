"use client"
import React, { useState } from "react";
import { Box } from "@/lib/mui";
import { Title, Liste, CustomizedButtons } from "$/Components";
import { da, enGB } from 'date-fns/locale'
import { format, parseISO } from 'date-fns'
import { FaUserEdit } from 'react-icons/fa'
import { useAppContext } from "$/AppContext";
import RedigerProfil from "$/profil/rediger";
import withAuth from "$/withAuth";

const Profil = ({ bruger }) => {
    const { language, sprogfunktion, isLoggedIn, ikkeOnline, user } = useAppContext();
    const { foedselsdag, brugernavn, fornavn, mellemnavn, efternavn, forhold, sex, sprog, email, dyr, land } = bruger;
    const [rediger, setRediger] = useState(false);

    const sprogting = (dan, eng) => {
        return (
            sprogfunktion(language, dan, eng)
        )
    }

    const foedsel = (dato) => {
        const foedselsdag = parseISO(dato);
        const resultat = format(new Date(foedselsdag), "do MMMM yyyy", {
            locale: sprogting(da, enGB)
        })
        return resultat
    }
    const dato = isLoggedIn ? foedselsdag : (1979, 10, 27)
    const result = isLoggedIn ? foedsel(dato) : 'null';

    const landFlag = () => {
        const flag = isLoggedIn ? land.toLowerCase() : 'dk';
        return (
            <img
                loading="lazy"
                width="20"
                src={`https://flagcdn.com/w20/${flag}.png`}
                srcSet={`https://flagcdn.com/w40/${flag}.png 2x`}
                alt={flag}
            />
        )
    }

    const brugerRaekker = [
        { id: 'navn', minWidth: 70 },
        {
            id: 'value',
            minWidth: 75,
        },
    ];

    const labels = {
        brugernavntxt: sprogting('Brugernavn', 'Username'),
        fornavntxt: sprogting('Fornavn', 'Firstname'),
        mellem: sprogting('Mellemnavn', 'Middlename'),
        efter: sprogting('Efternavn', 'Lastname'),
        forholdtxt: sprogting('Forhold', 'Relationship'),
        mail: 'E-mail',
        foedseltext: sprogting('Fødselsdag', 'Birthday'),
        sextxt: sprogting('Køn', 'Gender'),
        brugersprogtxt: sprogting('Sprog', 'Language'),
        landtxt: sprogting('Land', 'Country'),
        titel: user === bruger ? sprogting('Din profil', 'Your profile') : `${fornavn}'s profil`,
        redigerKnap: sprogting('Rediger ', 'Edit '),
        dyrtitel: sprogting('Dine favorit dyr', 'Your favorite animals'),
        sprogtxt: sprogfunktion(sprog, 'Dansk', 'English')
    }
    const { brugernavntxt, foedseltext, forholdtxt, fornavntxt, mail, mellem, efter, sextxt, brugersprogtxt, landtxt, titel, redigerKnap, dyrtitel, sprogtxt } = labels

    const brugerArray = [
        { navn: brugernavntxt, value: brugernavn },
        { navn: fornavntxt, value: fornavn },
        { navn: mellem, value: mellemnavn },
        { navn: efter, value: efternavn },
        { navn: forholdtxt, value: forhold },
        { navn: mail, value: email },
        { navn: foedseltext, value: result },
        { navn: sextxt, value: sex },
        { navn: brugersprogtxt, value: sprogtxt },
        { navn: landtxt, value: landFlag() },
    ];

    const centrer = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexFlow: 'column wrap'
    }

    const tjekOmErSandt = () => {
        let dyrArray = []
        for (let key in dyr) {
            if (dyr[key]) {
                switch (key) {
                    case 'kat': dyrArray.push(sprogting('Kat', 'Cat'));
                        break;
                    case 'hund': dyrArray.push(sprogting('Hund', 'Dog'));
                        break;
                    case 'fisk': dyrArray.push(sprogting('Fisk', 'Fish'));
                        break;
                    case 'fugl': dyrArray.push(sprogting('Fugl', 'Bird'));
                        break;
                    case 'skildpadde': dyrArray.push(sprogting('Skildpadde', 'Turtle'));
                        break;
                    case 'slange': dyrArray.push(sprogting('Slange', 'Snake'));
                        break;
                    case 'edderkop': dyrArray.push(sprogting('Edderkop', 'Spider'));
                        break;
                }
            }
        }
        return dyrArray;
    }

    const visning = () => {
        return (
            <Box>
                {rediger ?
                    <RedigerProfil /> :
                    <Box sx={centrer}>
                        <Title>{titel}</Title>
                        <Box>
                            <CustomizedButtons onClick={() => setRediger(true)}>
                                {redigerKnap}<FaUserEdit />
                            </CustomizedButtons>
                        </Box>
                        <Liste width='65%' rows={brugerArray} columns={brugerRaekker} />
                        <Box>
                            <Title>{tjekOmErSandt() == [] ? sprogting('Ingen dyr', 'No animals') : dyrtitel}</Title>
                            {tjekOmErSandt()?.map((d, i) => {
                                return (
                                    <Box key={i}>
                                        <Title>
                                            {d}
                                        </Title>
                                    </Box>
                                )
                            })}
                        </Box>
                    </Box>}
            </Box>
        )
    }

    return (
        isLoggedIn ? visning() : <Title>{ikkeOnline(language)}</Title>
    )
}
export default withAuth(Profil);