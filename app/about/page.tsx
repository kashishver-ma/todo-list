import React from "react";
import Image from "next/image";

const Page = () => {
  return (
    <div className="p-6 text-white min-h-screen bg-gradient-to-r from-slate-400 to-slate-700">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-6 hover:text-gray-200 transition-colors duration-300 ease-in-out text-center">
        About the To-Do List App
      </h1>

      <hr className="w-full" />

      <p className="mb-6 text-xl md:text-2xl font-bold text-black font-serif text-center px-4">
        Welcome to our To-Do List App! This application helps you keep track of
        your tasks and manage your time efficiently. Whether you&apos;re
        planning your daily schedule or organizing a big project, our app
        provides a simple and effective way to stay on top of your tasks.
      </p>

      <div className="flex flex-col md:flex-row gap-8 md:gap-48 items-center justify-center">
        <div className="w-full md:w-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center md:text-left transition-colors duration-300 ease-in-out">
            Key Features:
          </h2>
          <ul className="list-disc list-inside mb-6 space-y-2 text-xl md:text-2xl font-serif text-black font-bold text-center md:text-left">
            <li>
              <strong className="text-purple-900 font-bold">Add</strong> tasks
              with titles.
            </li>
            <li>
              <strong className="text-purple-900 font-bold">Edit</strong> tasks
              to update details of task if completed.
            </li>
            <li>
              <strong className="text-purple-900 font-bold">Delete</strong>{" "}
              tasks that are no longer needed.
            </li>
            <li>
              <strong className="text-purple-900 font-bold">Mark</strong> tasks
              status as urgent, important, ignorable.
            </li>
            <li>
              <strong className="text-purple-900 font-bold">Organize</strong>{" "}
              tasks into different categories for better management.
            </li>
          </ul>
        </div>
        <div className="w-64 md:w-auto">
          <Image
            className="shadow-xl shadow-black mx-auto"
            src="/about.png"
            alt="About image"
            width={400}
            height={300}
            priority
          />
        </div>
      </div>

      <p className="font-serif text-center text-lg md:text-xl px-4 mt-6">
        Our goal is to provide you with a user-friendly interface that makes
        task management a breeze. We hope you find our To-Do List App useful and
        enjoyable!
      </p>
    </div>
  );
};

export default Page;
