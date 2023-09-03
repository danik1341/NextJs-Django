import { createContext, useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import loginUser from "./login";
import registerUser from "./register";
import { getUser, set, logoutUser } from "./cookieHeader";

interface AuthContextProps {
  user: any;
  accessToken: string | null;
  error: string;
  cookieValue: string | null;
  login: (credentials: { username: string; password: string }) => Promise<void>;
  register: (credentials: {
    username: string;
    email: string;
    password: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  accessToken: null,
  error: "",
  cookieValue: null,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [cookieValue, setCookieValue] = useState<string | null>(null);
  const [error, setError] = useState<string>("");

  const router = useRouter();

  const login = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    try {
      const response = await loginUser(username, password);

      if (response) {
        const { user, access, cookieValue } = response;

        if (user && access) {
          setUser(user);
          setAccessToken(access);
        }

        if (cookieValue) {
          // Set the cookie value in state
          setCookieValue(cookieValue);
          set(cookieValue);
          // router.push("/");
          router.back();
        }
      }
    } catch (error: any | AxiosError) {
      if (error.response && error.response.data) {
        setError(error.response.data.message);
      } else if (error.request) {
        setError("Something went wrong");
      } else {
        setError("Something went wrong");
      }
    }
  };

  const register = async ({
    username,
    email,
    password,
  }: {
    username: string;
    email: string;
    password: string;
  }) => {
    try {
      const registrationResult = await registerUser(username, email, password);

      if (registrationResult.success) {
        // Registration was successful, you can handle it as needed
        // For example, redirect the user to the login page or display a success message
        if (registrationResult.username && registrationResult.password) {
          await login({
            username: registrationResult.username,
            password: registrationResult.password,
          });
        }
      } else {
        setError(registrationResult.message || "Registration failed");
      }
    } catch (error) {
      setError("Something went wrong");
    }
  };

  const getUserAfterRefresh = async () => {
    const refreshCookie = await getUser();

    if (refreshCookie) {
      if (refreshCookie.value && refreshCookie.value !== "") {
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/token/refresh/`,
            { refresh: refreshCookie.value }
          );

          const access = response.data.access;
          setAccessToken(access);

          const userConfig = {
            headers: {
              Authorization: `Bearer ${access}`,
            },
          };

          const { data: userData } = await axios.get(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/`,
            userConfig
          );

          setUser(userData);
        } catch (err) {
          console.error("Error fetching user data via refresh token:", err);
        }
      }
    }
  };

  const logout = async () => {
    try {
      await logoutUser();

      setUser(null);
      setAccessToken(null);
      setCookieValue(null);
    } catch (err) {
      console.error("Error logging out user:", err);
    }
  };

  useEffect(() => {
    getUserAfterRefresh();
  }, [cookieValue]);

  // useEffect(() => {
  //   getUserAfterRefresh();
  // }, [accessToken]);

  const contextValue: AuthContextProps = {
    user,
    accessToken,
    error,
    cookieValue,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
