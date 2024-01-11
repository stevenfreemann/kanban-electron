import React, { createContext, useContext, useState, ReactNode } from "react";

interface userDataType {
  id: number;
  name: string;
  email: string;
}

interface AuthContextProps {
  isLoggedIn: boolean;
  token: string | null;
  handleLogin: (tokenRes: string, user: userDataType) => void;
  handleLogout: () => void;
  userData: userDataType | null;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({
  children,
}: AuthProviderProps): React.JSX.Element {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [userData, setUserData] = useState<userDataType | null>(null);

  function handleLogin(tokenRes: string, user: userDataType): void {
    setLoggedIn(true);
    setToken(tokenRes);
    setUserData(user);
  }

  function handleLogout(): void {
    setLoggedIn(false);
    setToken(null);
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, token, handleLogin, handleLogout, userData }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextProps {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
