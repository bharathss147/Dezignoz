import React, { createContext, useContext, useState, useEffect } from "react";
import {
  onAuthStateChanged,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  User as FirebaseUser,
} from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";

interface UserData {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: UserData | null;
  loading: boolean;
  login: () => void;
  logout: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (name: string, email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem("dezigno_auth") === "true";
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        const userData: UserData = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
        };
        setUser(userData);
        setIsLoggedIn(true);
        localStorage.setItem("dezigno_auth", "true");
      } else {
        setUser(null);
        setIsLoggedIn(false);
        localStorage.removeItem("dezigno_auth");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = () => {
    setIsLoggedIn(true);
    localStorage.setItem("dezigno_auth", "true");
  };

  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    const firebaseUser = result.user;
    const userData: UserData = {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      displayName: firebaseUser.displayName,
      photoURL: firebaseUser.photoURL,
    };
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem("dezigno_auth", "true");
  };

  const signInWithEmail = async (email: string, password: string) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    const firebaseUser = result.user;
    const userData: UserData = {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      displayName: firebaseUser.displayName,
      photoURL: firebaseUser.photoURL,
    };
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem("dezigno_auth", "true");
  };

  const signUpWithEmail = async (name: string, email: string, password: string) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(result.user, { displayName: name });
    const firebaseUser = result.user;
    const userData: UserData = {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      displayName: name,
      photoURL: firebaseUser.photoURL,
    };
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem("dezigno_auth", "true");
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("dezigno_auth");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, loading, login, logout, signInWithGoogle, signInWithEmail, signUpWithEmail }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
