import React, { createContext, useContext, useEffect, useState } from "react";

interface UserData {
  name: string;
  email: string;
}

interface AuthContextType {
  token: string | null | undefined; // undefined means loading
  userData: UserData | null;
  setToken: (token: string | null) => void;
  setUserData: (data: UserData | null) => void;
  logout: () => void;
  loading: boolean; // new loading flag
}

const AuthContext = createContext<AuthContextType>({
  token: undefined,
  userData: null,
  setToken: () => {},
  setUserData: () => {},
  logout: () => {},
  loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null | undefined>(undefined);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAuth = async () => {
      setLoading(true);
  
      const storedToken = localStorage.getItem("token");
      const storedUserData = localStorage.getItem("userData");

      if (storedToken) setToken(storedToken);
      else setToken(null);

      if (storedUserData) {
        try {
          const parsed = JSON.parse(storedUserData);
          setUserData(parsed);
        } catch (err) {
          console.error("Invalid userData in localStorage");
          setUserData(null);
        }
      } else {
        setUserData(null);
      }
      setLoading(false);
    };

    loadAuth();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    setToken(null);
    setUserData(null);
  };

  return (
    <AuthContext.Provider
      value={{ token, userData, setToken, setUserData, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
