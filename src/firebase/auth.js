import firebase_app from "./config";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, getAuth, sendEmailVerification } from "firebase/auth";

const auth = getAuth(firebase_app);

export const login = async (email, password) => {
    let result = null,
        error = null;
    try {
        result = await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
        error = e;
    }

    return { result, error };
}

export const register = async (email, password) => {
    let result = null,
        error = null;
    try {
        result = await createUserWithEmailAndPassword(auth, email, password);
        await sendEmailVerification(auth.currentUser)
    } catch (e) {
        error = e;
    }

    return { result, error };
}

export const logout = async () => {
    let result = null,
        error = null;
    try {
        result = await signOut(auth);
    } catch (e) {
        error = e;
    }

    return { result, error };
}

export const sendVerificationEmail = async () => {
    await sendEmailVerification(auth.currentUser)
    console.log('Email sent to user')
}
