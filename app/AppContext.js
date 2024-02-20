"use client"
import React, { createContext, useState, useContext } from 'react';
import sprogfunktion from '@/helpers/sprog';
import ikkeOnline from '@/helpers/ikkeOnline';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [language, setLanguage] = useState('Dk');
    const [response, setResponse] = useState();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({});
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