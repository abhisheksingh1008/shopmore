"use client";

import { useContext } from "react";
import { useRouter } from "next/navigation";
import AuthContext from "@/store/auth-context";

const Profile = () => {
  const authCtx = useContext(AuthContext);
  const router = useRouter();

  // if (!authCtx?.user) {
  //   router.push("/login");
  // }

  return <div>User Profile</div>;
};

export default Profile;
