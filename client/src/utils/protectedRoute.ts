"use client"
import React, { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface UserProtectedRouterProps {
  children: ReactNode;
}

const UserProtectedRouter: React.FC<UserProtectedRouterProps> = ({ children }) => {
    const [user, setUser] = useState<{ user?: { email?: string } }>({});
  const [superUser, setSuperUser] = useState<{ superUser?: { email?: string } }>({});

  useEffect(() => {
    // Perform localStorage action
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    const storedSuperUser = JSON.parse(localStorage.getItem("superUser") || "{}");

    
    setUser(storedUser?.user?.email);
    setSuperUser(storedSuperUser?.user?.email);
  }, []);

  const email = user || superUser;
  const router = useRouter();

  
  if (user||superUser) {
    console.log("shit");
    
    return children;
  } else {
    console.log("whyy");
    
    router.push("/login");
    return null;
  }
};

export default UserProtectedRouter;
