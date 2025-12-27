import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [fisrtTime, setFisrtTime] = useState(false);

    useEffect(() => {
        checkUser();
    }, []);

    const checkUser = async () => {
        const savedUser = await AsyncStorage.getItem('user');
        if (savedUser) setUser(JSON.parse(savedUser));
        setLoading(false);
    };

    const signup = async (name, email, password) => {
        const newUser = { name, email, password };
        await AsyncStorage.setItem('registeredUser', JSON.stringify(newUser));
        await AsyncStorage.setItem('user', JSON.stringify(newUser));
        setFisrtTime(true);
        setUser(newUser);
    };

    const login = async (email, password) => {
        const savedUser = await AsyncStorage.getItem('registeredUser');
        if (!savedUser) {
            alert('User not found');
            return;
        }

        const parsedUser = JSON.parse(savedUser);
        if (parsedUser.email !== email || parsedUser.password !== password) {
            alert('Incorrect Credentials');
            return;
        }

        await AsyncStorage.setItem('user', JSON.stringify(parsedUser));
        setUser(parsedUser);
    };

    const logout = async () => {
        await AsyncStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, loading, fisrtTime }}>
            {children}
        </AuthContext.Provider>
    );
};
