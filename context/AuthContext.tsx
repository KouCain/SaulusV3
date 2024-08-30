import { createContext, useContext, useState } from "react";

export enum Role{
    Admin = 'Admin',
    User = 'User',
}

interface AuthProps {
    authState: {
        authenticated: boolean | null; username: string | null; role: Role | null
    };
    onLogin: (username: string, password: string) => void;
    onLogout: ()=> void;
}

const AuthContext = createContext<Partial<AuthProps>>({});

    export const useAuth = () => {
        return useContext(AuthContext);
    }

    export const AuthProvider = ({children}: any) => {
        const [authState, setAuthState] = useState<{
            authenticated: boolean | null;
            username: string | null; 
            role: Role | null;
        }>({
            authenticated: null,
            username: null,
            role: null,
        });

        const login = (username: string, password: string) => {
            if (username === 'admin' && password === 'admin') {
                setAuthState({
                    authenticated: true,
                    username: username,
                    role: Role.Admin,
                });
            } else if (username === 'user' && password === 'user') {
                setAuthState({
                    authenticated: true, 
                    username: username,
                    role: Role.User
                });
            }else {
                alert('invalid username or password!');
            }
        };
        const logout = async() => {
            setAuthState({
                authenticated: false,
                username: null,
                role: null,
            });
    };
    const value = {
        onLogin: login,
        onLogout: logout,
        authState,
    };

    return <AuthContext.Provider value = {value}>{children}</AuthContext.Provider>;
};