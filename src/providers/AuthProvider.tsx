import { AuthContext } from "@/context/AuthContext";
import useAuth from "@/hooks/useAuth";
import { Outlet } from "react-router-dom";

export const AuthProvider = () => {
  const { isAuth, user, loading, handleLogin, handleLogout } = useAuth();

  return (
    <AuthContext.Provider
      value={{ isAuth, user, loading, handleLogin, handleLogout }}
    >
      <Outlet/>
    </AuthContext.Provider>
  );
};
