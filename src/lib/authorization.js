import { useRouter } from "next/router";
import { useEffect, useState,createContext  } from "react";
import {jwtDecode} from "jwt-decode";

export const AuthContext = createContext();
export function withAuth(Component) {
    return (props) => {
      const router = useRouter();
      const [userData, setUserData] = useState(null);
      useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/admin/login");
        } else {
          try {
            const payload = jwtDecode(token);
            if (!payload.rows || payload.rows.length === 0) {
              router.push("/admin/login");
            }else {
              setUserData(payload);
            }
          } catch (error) {
            console.error("Error decoding token:", error);
            router.push("/admin/login");
          }
        }
      }, []);
      return (
        <AuthContext.Provider value={userData}>
          <Component {...props} />
        </AuthContext.Provider>
      );
    };
  }