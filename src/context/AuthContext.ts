import { UserProps } from "@/hooks/useAuth";
import IUser from "@/interfaces/IUser";
import { createContext } from "react";
import { SubmitHandler } from "react-hook-form";

interface IAuthContext {
  isAuth?: boolean;
  user?: IUser;
  loading?: boolean;
  handleLogin?: (userData: SubmitHandler<UserProps> | undefined) => void;
  handleLogout?: () => void;
}

export const AuthContext = createContext<IAuthContext>({});
