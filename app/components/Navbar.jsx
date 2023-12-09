import React, { useState, useEffect } from "react";
import Link from "next/link";
import { UserAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, googleSignIn, logOut } = UserAuth();
  const [loading, setLoading] = useState(true);

  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    };
    checkAuthentication();
  }, [user]);

  const listStyle = "mt-2 cursor-pointer px-2 py-1 hover:bg-slate-900 hover:text-white rounded-md"

  return (
    <nav className="border-b text-slate-400">
    <div className=" max-w-[1024px] mx-auto flex items-center justify-between p-2">
      <ul className="flex ">
        <li className={`${listStyle}`}>
          <Link href="/">Home</Link>
        </li>
        <li className={`${listStyle}`}>
          <Link href="/AddPost">Add Post</Link>
        </li>
      </ul>

      {loading ? null : !user ? (
        <ul className="flex">
          <li onClick={handleSignIn} className="p-2 cursor-pointer">
            Login
          </li>
        </ul>
      ) : (
        <div>
          <p>Welcome, <span className="text-semibold text-white">{user.displayName}</span></p>
          <p className={`${listStyle} text-center`} onClick={handleSignOut}>
            Sign out
          </p>
        </div>
      )}
    </div>
   </nav>
  );
};

export default Navbar;
