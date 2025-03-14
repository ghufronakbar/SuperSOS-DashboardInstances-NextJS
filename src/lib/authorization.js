import { useRouter } from "next/router";
import { useEffect, useState, createContext } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();
export function withAuth(Component) {
  // eslint-disable-next-line react/display-name
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
          } else {
            if (!payload.rows[0].id_instances) {
              router.push("/admin/login");              
              } else {                
              const tokenExpiration = payload.rows[0].exp * 1000;
              if (tokenExpiration < Date.now()) {
                router.push("/admin/call");
              } else {
                setUserData(payload);
              }
            }
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