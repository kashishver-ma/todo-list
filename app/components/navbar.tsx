"use client";

import Image from "next/image";
import todo from "@/public/todo.png";
import Link from "next/link";
import React, { useState } from "react";
import { UserAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = UserAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    <div className="border-b-2 relative bg-slate-700">
      <div className="flex items-center p-3 sm:p-4 h-16 sm:h-20 w-full text-white justify-between max-w-7xl mx-auto px-4">
        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMenu}
          className="sm:hidden text-2xl focus:outline-none z-50"
        >
          {isMenuOpen ? "✕" : "☰"}
        </button>

        {/* Navigation Links - Mobile Menu */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-slate-700 z-40 pt-16 sm:hidden">
            <div className="flex flex-col items-center space-y-4">
              {!user && (
                <Link
                  href="./"
                  onClick={toggleMenu}
                  className="text-xl font-bold hover:text-gray-300"
                >
                  Home
                </Link>
              )}
              <Link
                href="./about"
                onClick={toggleMenu}
                className="text-xl font-bold hover:text-gray-300"
              >
                About
              </Link>
              {user && (
                <Link
                  href="./profile"
                  onClick={toggleMenu}
                  className="text-xl font-bold hover:text-gray-300"
                >
                  Profile
                </Link>
              )}
              {user && (
                <div
                  onClick={() => {
                    handleLogOut();
                    toggleMenu();
                  }}
                  className="text-xl font-bold bg-red-500 px-4 py-2 rounded hover:bg-red-600"
                >
                  Log Out
                </div>
              )}
            </div>
          </div>
        )}

        {/* Desktop Navigation */}
        <div className="hidden sm:flex items-center space-x-4">
          {!user && (
            <Link
              href="./"
              className="p-2 cursor-pointer font-bold text-base lg:text-xl rounded-lg hover:bg-slate-600"
            >
              Home
            </Link>
          )}
          <Link
            href="./about"
            className="p-2 cursor-pointer font-bold text-base lg:text-xl rounded-lg hover:bg-slate-600"
          >
            About
          </Link>
          {user && (
            <Link
              href="./profile"
              className="p-2 cursor-pointer text-base lg:text-xl text-slate-400 font-bold rounded-lg hover:bg-slate-600"
            >
              Profile
            </Link>
          )}
        </div>

        {/* Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center">
          <span className="text-lg xs:text-xl sm:text-2xl lg:text-4xl font-bold animate-bounce">
            TO-DO
          </span>
          <Image
            width={40}
            height={15}
            src={todo}
            alt="todo icon"
            className="ml-1 xs:ml-2 w-6 xs:w-8 sm:w-10 lg:w-14"
          />
        </div>

        {/* User Authentication */}
        <div className="hidden sm:flex items-center space-x-2 lg:space-x-4">
          {user ? (
            <>
              <div className="text-sm lg:text-lg text-slate-400 font-bold">
                Welcome, {user.displayName}
              </div>
              <button
                onClick={handleLogOut}
                className="bg-slate-500 text-white px-3 py-1 lg:px-4 lg:py-2 rounded-lg text-sm lg:text-base hover:bg-slate-600"
              >
                Log Out
              </button>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
