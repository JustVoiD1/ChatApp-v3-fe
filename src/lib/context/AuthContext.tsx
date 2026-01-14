// import React, { createContext, useContext, useEffect, useState } from "react";
// import api from "@/lib/api";

// type User = { id: number; username: string; email: string } | null;

// const AuthContext = createContext<{
//   user: User;
//   loading: boolean;
//   signin: (usernameOrEmail: string, password: string) => Promise<void>;
//   signup: (username: string, email: string, password: string) => Promise<void>;
//   signout: () => void;
// }>({
//   user: null,
//   loading: true,
//   // eslint-disable-next-line @typescript-eslint/no-empty-function
//   signin: async () => {},
//   // eslint-disable-next-line @typescript-eslint/no-empty-function
//   signup: async () => {},
//   signout: () => {},
// });

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [user, setUser] = useState<User>(null);
//   const [loading, setLoading] = useState(true);

//   const restore = async () => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       setLoading(false);
//       return;
//     }
//     try {
//       const res = await api.get("/me");
//       setUser(res.data.user);
//     } catch {
//       localStorage.removeItem("token");
//       setUser(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     restore();
//   }, []);

//   const signin = async (usernameOrEmail: string, password: string) => {
//     const res = await api.post("/signin", { usernameOrEmail, password });
//     const token = res.data.token;
//     if (!token) throw new Error("Signin failed");
//     localStorage.setItem("token", token);
//     const me = await api.get("/me");
//     setUser(me.data.user);
//   };

//   const signup = async (username: string, email: string, password: string) => {
//     await api.post("/signup", { username, email, password });
//     // optionally auto-signin
//     await signin(username, password);
//   };

//   const signout = () => {
//     localStorage.removeItem("token");
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, loading, signin, signup, signout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);