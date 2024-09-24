"use client"
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import sprogfunktion from '@/helpers/sprog';
import ikkeOnline from '@/helpers/ikkeOnline';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [language, setLanguage] = useState('Dk');
    const [response, setResponse] = useState();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({});

    useEffect(() => {
        axios.get('https://ipinfo.io/json').then((response) => {
            const data = response.data.country;
            data === 'DK' ? setLanguage('Dk') : setLanguage('GB')
        }).catch(() => {
            setLanguage('GB')
        });
    }, []);//*/

    const value = {
        response,
        setResponse,
        language,
        setLanguage,
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        sprogfunktion,
        ikkeOnline
    };
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext)