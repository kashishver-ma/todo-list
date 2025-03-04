"use client";

import Image from "next/image";
import todo from "@/public/todo.png";
import Link from "next/link";
import React, { useState } from "react";
import { UserAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, googleSignIn, logout } = UserAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="border-b-2 flex items-center p-4 h-20 w-full text-white justify-between relative">
      {/* Mobile Menu Toggle */}
      <div className="md:hidden">
        <button onClick={toggleMenu} className="text-2xl focus:outline-none">
          {isMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Navigation Links */}
      <div
        className={`
        absolute top-full left-0 w-full bg-slate-700 z-10
        md:static md:flex md:bg-transparent md:w-auto
        ${isMenuOpen ? "block" : "hidden"}
      `}
      >
        <div className="flex flex-col md:flex-row">
          {!user && (
            <div className="p-2 cursor-pointer font-bold text-xl rounded-lg hover:bg-gradient-to-t from-slate-600 to-black text-center md:text-left">
              <Link href="./" onClick={toggleMenu}>
                Home
              </Link>
            </div>
          )}
          <div className="p-2 cursor-pointer font-bold text-xl hover:bg-gradient-to-t from-slate-600 to-black rounded-lg text-center md:text-left">
            <Link href="./about" onClick={toggleMenu}>
              About
            </Link>
          </div>
          {user && (
            <div className="p-2 cursor-pointer text-xl text-slate-400 font-bold rounded-lg hover:bg-gradient-to-t from-slate-500 to-black text-center md:text-left">
              <Link href="./profile" onClick={toggleMenu}>
                Profile
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Logo */}
      <div className="font-bold text-2xl md:text-4xl flex justify-self-center animate-bounce">
        TO-DO <Image width={55} height={20} src={todo} alt="todo icon" />
      </div>

      {/* User Authentication */}
      <div className="flex">
        {user ? (
          <div className="flex flex-col md:flex-row gap-2 items-center">
            <div className="p-2 text-slate-400 font-bold text-sm md:text-lg rounded-lg hover:bg-gradient-to-t from-slate-500 to-black text-center">
              Welcome, {user.displayName}
            </div>
            <div
              onClick={handleLogOut}
              className="p-2 cursor-pointer bg-slate-500 rounded-lg font-bold text-sm md:text-base"
            >
              Log Out
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Navbar;
