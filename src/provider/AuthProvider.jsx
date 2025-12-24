import React, { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import axios from "axios";



export const AuthContext = createContext();

// google signin
const GoogleProvider = new GoogleAuthProvider

const AuthProvider = ({ children }) => {

    const [loading, setLoading] = useState(true);
    const [roleloading, setRoleLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [role, setRole] = useState('')
    const [userStatus,setUserStatus]= useState('')
    const registerWithEmailPassword = (email, password) => {
        // setLoading(false)
        return createUserWithEmailAndPassword(auth, email, password)
    };

    //   for google login/ signin
    const handleGoogleSignIn = () => {
        setLoading(true)
        return signInWithPopup(auth, GoogleProvider)

    }

    const logout =()=>{
         return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)

            // console.log(currentUser)
            setLoading(false)
        })

        return () => {
            unsubscribe();
        }
    }, [])

    useEffect(() => {
        if (!user) return;
        axios.get(`https://blood-bank-server-six.vercel.app/users/role/${user.email}`)
            .then(res => {
                setRole(res.data.role)
                setUserStatus(res.data.status)
                setRoleLoading(false)
            })
    }, [user])
//  console.log(user)

    const authData = {
        registerWithEmailPassword,
        setUser,
        user,
        handleGoogleSignIn,
        loading,
        role,
        roleloading,
        userStatus,
        logout
    };


    return <AuthContext value={authData}>
        {children}
    </AuthContext>
};

export default AuthProvider;
