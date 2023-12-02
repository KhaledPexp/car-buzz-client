import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from "../Firebase/firebase.config";


const auth = getAuth(app);

export const authProvider = createContext(null);

const AuthContext = ({children}) => {
    const [user, setUser] = useState(null);
    const[loader, setLoader] = useState(true);
    const[darkTheme, setDark] = useState(false)
    const handleGoogleSignIn = (provider) =>{
        return signInWithPopup(auth, provider);
    }
    const handleTheme = () =>{
        setDark(!darkTheme);
    }
    const handleRegisterWithEmail = (email, password) =>{
       return createUserWithEmailAndPassword (auth, email, password);
    }

    const handleSignInWithEmail = (email, password) =>{
        return signInWithEmailAndPassword (auth, email, password);
     }
     const logOut = () => {
        localStorage.removeItem('goldTocken');
        return signOut(auth);
    }
     useEffect(()=>{
       const unSubscribe =  onAuthStateChanged(auth, (currentUser)=>{
                        
                            setUser(currentUser);
                            setLoader(false);  
                        
                        })
        return ()=> {
            unSubscribe();
        }
     },[])
    const authInfo={
        loader,
        user,
        handleGoogleSignIn,
        handleRegisterWithEmail,
        handleSignInWithEmail,
        logOut,
        handleTheme,
        darkTheme,
    }
    return (
        <div>
            <authProvider.Provider value={authInfo}>{children}</authProvider.Provider>
        </div>
    );
};

export default AuthContext;