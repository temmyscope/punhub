import React, { createContext, useState } from 'react';
import { useColorScheme } from 'react-native';
import * as SecureStore from 'expo-secure-store';

export const AppContext = createContext({});

const AppContextProvider = ({ children }) => {

    const [isLoggedIn, setLoggedIn] = useState(false);
    const [ DarkMode, setDarkMode ] = useState(false);

    const Logout = async() => {
        await SecureStore.deleteItemAsync('userToken')
        .then(data => {
            setLoggedIn(false);
        }).catch(err => console.log(err));
    }
 
    const IniitializeApp = () => {
        return SecureStore.getItemAsync('userToken')
        .then(userToken => {
            const loggedInStatus = ( 
                userToken && userToken.authToken !== null && 
                (typeof userToken.authToken === "string")
            ) ? true : false;
            setLoggedIn(loggedInStatus);
            setDarkMode(useColorScheme() === 'dark' || userToken.mode === 'dark');
        }).catch(err => console.log(err));
    };

    return (
        <AppContext.Provider value={{ isLoggedIn, DarkMode, IniitializeApp, Logout }}>
            {children}
        </AppContext.Provider>
    );
}

const AppReduceProvider = ({ prevState, action }) => {

    switch (action.type) {
        case "UPDATE_OFFSET":
            return { ...prevState, punOffset: prevState.punOffset+action.payload};
        case "REFRESHING_PUNS":
            return { ...prevState, refreshing: action.payload };
        case "LOADING_PUNS":
            return { ...prevState, loading: action.payload };
        case "CHANGE_TAB":
            return { ...prevState, activeIndex: action.payload };
        case "SET_OFFLINE_STATUS":
            return { ...prevState, offline: action.payload };
    }
}

export { AppContextProvider, AppReduceProvider };