import React, { createContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from '../services/firebase/auth';
import { getDocuments } from '../services/firebase/db';
import { toast } from 'react-toastify';

export const AuthContext = createContext(null);

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [memberData, setMemberData] = useState(null);
  const [loading, setLoading] = useState(true);


    const getMemberInfo = async () => {
    setLoading(true);
    try {
      if (user) {
        setUser(user);
        const result = await getDocuments("users", user.uid);
        if (result.success) {
          setMemberData(result.data[0]);
        } else {
          setMemberData(null)
          console.log(result.message);
        }
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }


  useEffect(() => {
    // Listen to auth state changes
    const unsubscribe = onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);

        try {
          const result = await getDocuments("users", firebaseUser.uid);
          if (result.success) {
            console.log(result.data[0])
            setMemberData(result.data[0]);
          } else {
            setMemberData(null);
            console.log(result.message);
          }
        } catch (error) {
          toast.error(error.message);
        }
      } else {
        setUser(null);
        setMemberData(null);
      }

      // Done fetching everything
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    user,
    memberData,
    loading,
    isAuthenticated: !!user,
    setMemberData,
    getMemberInfo
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
