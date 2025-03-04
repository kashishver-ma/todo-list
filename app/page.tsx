"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserAuth } from "@/app/context/AuthContext";
import Image from "next/image"; // Import Image component if you use images
import todo from "@/public/todo.png";
import todo2 from "@/public/todo2.webp";
import mam from "@/public/todomam.webp";
import gi from "@/public/googleicon.png";

const LoginPage = () => {
  const [error, setError] = useState(null);
  const { googleSignIn, user } = UserAuth(); // Ensure these functions are available in your AuthContext
  const router = useRouter();

  useEffect(() => {
    if (user) {
      // Redirect to the profile page if the user is already logged in
      router.push("/profile");
    }
  }, [user, router]);

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      router.push("/profile"); // Redirect to the profile page after Google sign-in
    } catch (err) {
      setError("Failed to Log in with Google. Please try again.");
    }
  };

  // Render nothing or a loading spinner if the authentication state is being checked
  if (user === undefined) return null;

  return (
    <div
      id="welcomepage"
      className="flex flex-row-reverse items-center justify-center min-h-screen p-6 hover:bg-gradient-to-r from-black via-slate-600  to-black"
    >
      <Image src={todo2} alt="not available"></Image>
      <div className="max-w-lg w-full flex flex-col bg-slate-400 shadow-md rounded-lg p-8 hover:shadow-black hover:shadow-2xl">
        <div className="text-center mb-6  ">
          {/* Optional: Add a logo or illustration */}
          <Image
            src={todo} // Replace with your logo path
            alt="Logo"
            width={100}
            height={100}
            className="mx-auto mb-4 shadow-lg"
          />
          <h1 className="text-4xl font-bold mb-4">Welcome Back To-do!</h1>
          <p className="text-lg text-gray-600">
            Sign in to access your account and explore our features.
          </p>
        </div>
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full bg-slate-700 text-white p-3 rounded-lg flex items-center justify-center font-semibold text-lg hover:bg-slate-600 transition duration-200"
        >
          <Image
            src={gi} // Replace with Google icon path
            alt="Google"
            width={40}
            height={40}
            className="mr-2 p-1 rounded-lg"
          />
          Sign In With Google
        </button>
        {error && (
          <p className="text-red-600 mt-4 text-center font-bold">{error}</p>
        )}
      </div>
      {/* Optional Footer{" "}
      <footer className="mt-6 text-gray-500 text-sm text-center">
        <p>
          &copy; {new Date().getFullYear()} Powered by To-Do. All rights
          reserved.
        </p>
        <p className="text-blue-500 hover:underline">
          Privacy Policy | Terms of Services
        </p>
      </footer> */}
    </div>
  );
};

export default LoginPage;
