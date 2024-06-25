import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { child, get, ref, set } from "firebase/database";
import { uid } from "uid";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const uuid = uid();

  function logIn(email, password) {
    return get(child(ref(db), "users")).then((data) => {
      const userAuth = Object.values(data.val()).find(
        (item) => item.email === email && item.isAdmin === false
      );
      if (userAuth) {
        return signInWithEmailAndPassword(auth, email, password);
      } else {
        throw new Error("Please sign in with a User Account.");
      }
    });
  }

  function signUp(email, password, name, number) {
    return createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
      const user = userCredential.user;
      return set(ref(db, `users/${uuid}`), {
        uid: user.uid,
        email,
        name,
        number,
        id: uuid,
        isAdmin: false,
      });
    });
  }

  function logOut() {
    return signOut(auth);
  }

  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <userAuthContext.Provider
      value={{ user, logIn, signUp, logOut, googleSignIn }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
