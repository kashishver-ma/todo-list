"use client";

import Image from "next/image";
import todo from "@/public/todo.png";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, googleSignIn, logout } = UserAuth();
  const [loading, setLoading] = useState(true);

  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogOut = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   const checkAuthentication = async () => {
  //     await new Promise((resolve) => setTimeout(resolve, 400));
  //     setLoading(false);
  //   };
  //   checkAuthentication();
  // }, [user]);

  // if (loading)
  //   return (
  //     <div className="flex items-center justify-center h-full w-full">
  //       <div className="spinner"></div>
  //     </div>
  //   );

  return (
    <div className="border-b-2 flex items-center p-4 h-20 w-full text-white justify-between">
      <div className="flex">
        {!user && (
          <div className="p-2 cursor-pointer font-bold text-xl rounded-lg hover:bg-gradient-to-t from-slate-600 to-black">
            <Link href="./">Home</Link>
          </div>
        )}
        <div className="p-2 cursor-pointer font-bold text-xl hover:bg-gradient-to-t from-slate-600 to-black rounded-lg">
          <Link href="./about">About</Link>
        </div>
        {user && (
          <div className="p-2 cursor-pointer text-xl text-slate-400 font-bold rounded-lg hover:bg-gradient-to-t from-slate-500 to-black">
            <Link href="./profile">Profile</Link>
          </div>
        )}
      </div>

      <div className="font-bold text-4xl flex justify-self-center animate-bounce">
        TO-DO <Image width={55} height={20} src={todo} alt="todo icon" />
      </div>

      <div className="flex">
        {!user ? (
          <div>
            {/* <div
            onClick={handleSignIn}
            className="p-2 cursor-pointer bg-slate-500 rounded-lg font-bold"
          >
            Login In
          </div> */}
          </div>
        ) : (
          <div className="flex gap-4 items-center">
            <div className="p-2 text-slate-400 font-bold text-lg rounded-lg hover:bg-gradient-to-t from-slate-500 to-black ">
              Welcome, {user.displayName}
            </div>
            <div
              onClick={handleLogOut}
              className="p-2 mr-3 cursor-pointer bg-slate-500 rounded-lg font-bold"
            >
              Log Out
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
