'use client';
import { createContext, useContext, useEffect, useState } from "react";

type User = {
    username: string;
    email: string;
    profileImage: string;
}

type AuthContextType = {
    user: User | null;
    loading: boolean;
    error: Error | null;
    login: () => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    console.log('AuthProvider', user);

    const checkAuth = async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await fetch('/identity/api/v1/users/me', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await res.json();
            if (res.ok) {
                if (data && !data.code) {
                    setUser(data);
                } else {
                    setUser(null);
                    setError(new Error(data.description || 'Authentication failed'));
                }
            } else {
                setUser(null);
                setError(new Error(data.description || 'Failed to fetch user data'));
            }
        } catch (err) {
            setUser(null);
            setError(err instanceof Error ? err : new Error('An unknown error occurred'));
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        checkAuth();
    }, []);

    const login = () => {
        window.location.href = '/login';
    }

    const logout = () => {
        window.location.href = '/logout';
    }

    return (
        <AuthContext.Provider value={{user, loading, error, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within a AuthProvider');
    }
    return context;
}

