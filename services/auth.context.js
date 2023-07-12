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
    //init netlify identity connection
    netlifyIdentity.init();
  }, []);

  const login = () => {
    netlifyIdentity.open("login");
  };

  const context = { user: user, login: login };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};
