"use client"
import React from 'react';
import {
    onAuthStateChanged,
    getAuth,
} from 'firebase/auth';
import firebase_app from '@/firebase/config';
import { LoadingScreen } from '@/app/partials';
const auth = getAuth(firebase_app);

export const AuthContext = React.createContext({});

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider = ({
        children,
    }) => {
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log('HELLO')
                setUser(user);
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user }}>
            {loading ? 
            // <div>Loading...</div> 
            <LoadingScreen />
            : children}
            {/* {children} */}
        </AuthContext.Provider>
    );
};