import IUser from "@/interfaces/IUser";
import api from "@/services/api";
import { useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface IAuth {
  isAuth: boolean;
  loading: boolean;
  handleLogin: (userData: SubmitHandler<UserProps> | undefined) => void;
  user: IUser | undefined;
  handleLogout: () => void;
}

export interface UserProps {
  email: string;
  password: string;
}

const useAuth = (): IAuth => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const [user, setUser] = useState<IUser | undefined>(undefined);

  const navigate = useNavigate();

  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        setIsAuth(true);
      }
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      if (error?.response?.status === 401) {
        localStorage.removeItem("token");
        api.defaults.headers.Authorization = "";
        setIsAuth(false);
      }

      return Promise.reject(error);
    }
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    const getIsAuth = async () => {
      if (token) {
        const { data } = await api.get("/api/me");
        setIsAuth(true);
        localStorage.setItem("token", data.data.token);
        api.defaults.headers.Authorization = `Bearer ${token}`;
        setUser(data.data);
        setLoading(false);
      } else {1
        setLoading(false);
      }
    };

    getIsAuth();
  }, []);

  const handleLogin = async (
    userData: SubmitHandler<UserProps> | undefined
  ) => {
    setLoading(true);
    try {
      const { data } = await api.post("/api/login", userData);

      localStorage.setItem("token", data.token);
      api.defaults.headers.Authorization = `Bearer ${data.token}`;
      setUser(data.user);
      setIsAuth(true);
      navigate("/");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    api.defaults.headers.Authorization = "";
    setIsAuth(false);
    setUser(undefined);
    navigate("/login");
  };

  return { isAuth, loading, handleLogin, user, handleLogout };
};

export default useAuth;
