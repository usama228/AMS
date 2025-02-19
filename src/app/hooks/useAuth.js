import { authContext } from "app/context/AuthContext";
import { useContext } from "react";

export function useAuth() {
    return useContext(authContext);
  }