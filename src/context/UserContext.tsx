import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { USER_INFO_KEY } from "@/common/constant/localstorage.constant";
// import { IUsuario } from '@/shared/layout/components/UserMenu';
// import { get_permisos_service } from "@/modules/seguridad/auth/service/LoginService";

type UserContextType = {
  user: any | null;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  refreshUser: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<any | null>(null);

  const loadUserFromToken = useCallback(async () => {
    const result = localStorage.getItem(USER_INFO_KEY);
    if (result) {
      // const response = await get_permisos_service();
      // const userData = JSON.parse(result);
      // setUser({
      //     ...userData,
      //     permisos: response.data.values
      // });
    } else {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    loadUserFromToken();
  }, [loadUserFromToken]);

  return (
    <UserContext.Provider
      value={{ user, setUser, refreshUser: loadUserFromToken }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context)
    throw new Error("useUser debe ser usado dentro de UserProvider");
  return context;
};
