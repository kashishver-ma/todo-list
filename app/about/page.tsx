import React from "react";
import Image from "next/image";

const Page = () => {
  return (
    <div className="p-4 sm:p-6 text-white min-h-screen bg-gradient-to-r from-slate-400 to-slate-700">
      <h1 className="text-2xl xs:text-3xl sm:text-4xl font-extrabold mb-4 sm:mb-6 hover:text-gray-200 transition-colors duration-300 ease-in-out text-center">
        About the To-Do List App
      </h1>

      <hr className="w-full" />

      <p className="mb-4 sm:mb-6 text-base xs:text-lg sm:text-2xl font-bold text-black font-serif text-center px-2 sm:px-4">
        Welcome to our To-Do List App! This application helps you keep track of
        your tasks and manage your time efficiently. Whether you&apos;re
        planning your daily schedule or organizing a big project, our app
        provides a simple and effective way to stay on top of your tasks.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 lg:gap-48 items-center justify-center">
        <div className="w-full sm:w-auto px-4 sm:px-0">
          <h2 className="text-xl xs:text-2xl sm:text-3xl font-bold mb-2 sm:mb-4 text-center sm:text-left transition-colors duration-300 ease-in-out">
            Key Features:
          </h2>
          <ul className="list-disc list-inside mb-4 sm:mb-6 space-y-1 sm:space-y-2 text-base xs:text-lg sm:text-2xl font-serif text-black font-bold text-center sm:text-left">
            {[
              { action: "Add", description: "tasks with titles" },
              {
                action: "Edit",
                description: "tasks to update details of task if completed",
              },
              {
                action: "Delete",
                description: "tasks that are no longer needed",
              },
              {
                action: "Mark",
                description: "tasks status as urgent, important, ignorable",
              },
              {
                action: "Organize",
                description:
                  "tasks into different categories for better management",
              },
            ].map((feature, index) => (
              <li key={index}>
                <strong className="text-purple-900 font-bold">
                  {feature.action}
                </strong>{" "}
                {feature.description}.
              </li>
            ))}
          </ul>
        </div>
        <div className="w-48 xs:w-56 sm:w-64 lg:w-auto">
          <Image
            className="shadow-xl shadow-black mx-auto"
            src="/about.png"
            alt="About image"
            width={400}
            height={300}
            priority
            sizes="(max-width: 640px) 224px, (max-width: 768px) 256px, 400px"
          />
        </div>
      </div>

      <p className="font-serif text-center text-sm xs:text-base sm:text-xl px-2 sm:px-4 mt-4 sm:mt-6">
        Our goal is to provide you with a user-friendly interface that makes
        task management a breeze. We hope you find our To-Do List App useful and
        enjoyable!
      </p>
    </div>
  );
};

export default Page;
