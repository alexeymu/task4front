import React, { createContext, useContext, useState } from 'react';


const AuthContext = createContext({})

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const auth = useAuthProvider()
    return <AuthContext.Provider value = { auth } > { children } </AuthContext.Provider>
}

function useAuthProvider() {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [user, setUser] = useState({});

    const signIn = (userData, cb) => {
        setUser(userData);
        setIsAuthorized(true);
        cb()
    }

    const signOut = (cb) => {
        setUser({});
        setIsAuthorized(false);
        cb()
    }

    return {
        user,
        isAuthorized,
        signIn,
        signOut,
    }
}