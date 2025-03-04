"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserAuth } from "@/app/context/AuthContext";
import Image from "next/image";
import todo from "@/public/todo.png";
import todo2 from "@/public/todo2.webp";
import gi from "@/public/googleicon.png";

const LoginPage = () => {
  const [error, setError] = useState<string | null>(null);
  const { googleSignIn, user } = UserAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/profile");
    }
  }, [user, router]);

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      router.push("/profile");
    } catch (err) {
      setError("Authentication failed. Please try again.");
      console.error(err);
    }
  };

  // Render nothing or a loading spinner if the authentication state is being checked
  if (user === undefined) return null;

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-700 via-slate-600 to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 lg:gap-16">
        {/* Image Section - Hidden on small screens */}
        <div className="hidden md:block w-full max-w-md">
          <Image
            src={todo2}
            alt="To-Do App Illustration"
            className="w-full h-auto object-contain rounded-xl shadow-2xl transform hover:scale-105 transition duration-300"
            priority
            sizes="(max-width: 768px) 0, (max-width: 1200px) 50vw, 500px"
          />
        </div>

        {/* Login Section */}
        <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl p-6 sm:p-8 md:p-10 shadow-2xl">
          <div className="text-center mb-8">
            {/* Logo */}
            <Image
              src={todo}
              alt="To-Do Logo"
              width={100}
              height={100}
              className="mx-auto mb-6 rounded-full shadow-lg"
              priority
            />

            {/* Welcome Text */}
            <h1 className="text-2xl xs:text-3xl sm:text-4xl font-bold mb-4 text-white">
              Welcome Back to To-Do!
            </h1>
            <p className="text-base sm:text-lg text-white/80 mb-6">
              Sign in to access your account and manage your tasks efficiently.
            </p>

            {/* Google Sign-In Button */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center 
                bg-white text-black p-3 rounded-lg 
                font-semibold text-base sm:text-lg 
                hover:bg-gray-100 transition duration-300 
                space-x-3 shadow-md hover:shadow-xl"
            >
              <Image
                src={gi}
                alt="Google Icon"
                width={30}
                height={30}
                className="mr-2"
              />
              Sign In With Google
            </button>

            {/* Error Message */}
            {error && (
              <p className="text-red-400 mt-4 text-sm sm:text-base text-center">
                {error}
              </p>
            )}
          </div>

          {/* Optional Additional Information */}
          <div className="text-center text-white/60 text-xs sm:text-sm mt-6">
            <p>Secure login powered by Google Authentication</p>
            <p className="mt-2 hover:text-white transition">
              <a href="#" className="underline">
                Privacy Policy
              </a>{" "}
              |{" "}
              <a href="#" className="underline">
                Terms of Service
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
