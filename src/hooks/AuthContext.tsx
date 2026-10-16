import { useContext, type ReactNode, createContext, useState, useEffect } from "react";
import { signInWithPopup, onAuthStateChanged, signOut as firebaseSignOut } from "firebase/auth";

import type { AuthState } from "../types/auth";
import { firebaseAuth, googleAuthProvider } from "../config/firebase";

interface AuthContextProps {
    authState: AuthState;
    signWithGoogle: () => Promise<void>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: {children: ReactNode} ) => {

    const [authState, setAuthState] = useState<AuthState>({
        user: null,
        error: null,
        loading: false,
    });

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
            if(user) {
                setAuthState({
                    user: {
                        uid: user.uid,
                        email: user.email,
                        displayName: user.displayName,
                        photURL: user.photoURL,
                    },
                    error: null,
                    loading: false,
                })
            } else {
                setAuthState({
                    user: null,
                    error: null,
                    loading: false,
                })
            }
        }, (error) => {
            console.error('Authentication error')
            setAuthState({
                user: null,
                error: error.message,
                loading: false,
            })
        });

        return () => unsubscribe();
    }, [])

    const signWithGoogle = async (): Promise<void> => {
        setAuthState((prev) => ({ ...prev, loading: true }));

        try {
            await signInWithPopup(firebaseAuth, googleAuthProvider)

        } catch(err) {
            const message = err instanceof Error ? err.message : 'Error while logging in';

            setAuthState((prev) => ({ ...prev, loading: false, error: message }));
        }
    }

    const signOut = async (): Promise<void> => {
        setAuthState((prev) => ({ ...prev, loading: true }));
        
        try {
            await firebaseSignOut(firebaseAuth)
            
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Error while logging in';

            setAuthState((prev) => ({ ...prev, loading: false, error: message }));
        }
    }


    return (
        <AuthContext.Provider value={{authState, signWithGoogle, signOut}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);

    if(!context) {
        throw new Error('useAuth should be used within AuthProvider')
    };

    return context;
}