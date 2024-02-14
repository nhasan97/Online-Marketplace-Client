import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { signInWithPopup } from "firebase/auth";
import app from "../firebase/firebase.config";
import axiosSecure from "../api/axiosSecure";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const auth = getAuth(app);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //================== Register using Email and Password ==================
  const registerWithEmailPassword = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //================== Login using Email and Password ==================
  const loginWithEmailPassword = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //================== Login using Google ==================
  const loginWithGoogle = (provider) => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  //================== Login using Github ==================
  const loginWithGitHub = (provider) => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  //==================== Getting current logged in user ====================
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      const userEmail = currentUser?.email || user?.email; //once set current user will become null thats why we are trying to get the users email before setting the user
      const loggedUser = { email: userEmail };
      setUser(currentUser);

      if (currentUser) {
        axiosSecure
          .post("/jwt", loggedUser)
          .then((res) => console.log(res.data));
        setLoading(false);
      } else {
        axiosSecure
          .post("/logout", loggedUser)
          .then((res) => console.log(res.data));
        setLoading(false);
      }
    });

    return () => {
      unSubscribe();
    };
  }, []);

  //================== LogOut User ==================
  const LogOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  const authInfo = {
    auth,
    user,
    loading,
    registerWithEmailPassword,
    loginWithEmailPassword,
    loginWithGoogle,
    loginWithGitHub,
    LogOutUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
