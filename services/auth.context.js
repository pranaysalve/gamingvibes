import { createContext, useState, useEffect } from "react";
import netlifyIdentity from "netlify-identity-widget";
export const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
  authReady: false,
});

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    netlifyIdentity.on("login", (user) => {
      setUser(user);
      netlifyIdentity.close();
      console.log("Login Event");
    });

    netlifyIdentity.on("logout", () => {
      setUser(null);
      console.log("logout event");
    });

    //init netlify identity connection
    netlifyIdentity.init();
    
    return () => {
      netlifyIdentity.off("login");
      netlifyIdentity.off("logout");
    };
  }, []);

  const login = () => {
    netlifyIdentity.open();
  };

  const logout = () => {
    netlifyIdentity.logout();
  };
  const context = { user, login, logout };
  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};
