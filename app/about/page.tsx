import React from "react";
// import "./globals.css";

const Page = () => {
  return (
    <div className="p-6 text-white min-h-screen justify-center bg-gradient-to-r from-slate-400 to-slate-700">
      <h1 className="text-4xl font-extrabold mb-6 hover:text-gray-200 transition-colors duration-300 ease-in-out">
        About the To-Do List App
      </h1>

      <hr className="w-full " />
      <br />

      <p className="mb-6 text-2xl font-bold text-black font-serif">
        Welcome to our To-Do List App! This application helps you keep track of
        your tasks and manage your time efficiently. Whether you're planning
        your daily schedule or organizing a big project, our app provides a
        simple and effective way to stay on top of your tasks.
      </p>
      <br />
      <br />
      <div className="flex gap-48 ">
        <div className="">
          <h2 className="text-3xl font-bold mb-4  transition-colors duration-300 ease-in-out">
            Key Features:
          </h2>
          <ul className="list-disc list-inside mb-6 space-y-2 text-2xl font-serif text-black font-bold">
            <li>
              {" "}
              <strong className="text-purple-900 font-bold">Add</strong> tasks
              with titles.{" "}
            </li>
            <li>
              <strong className="text-purple-900 font-bold">Edit</strong> tasks
              to update details of task if completed.
            </li>
            <li>
              {" "}
              <strong className="text-purple-900 font-bold">Delete</strong>{" "}
              tasks that are no longer needed.
            </li>
            <li>
              {" "}
              <strong className="text-purple-900 font-bold">Mark</strong> tasks
              status as urgent,important,ignaorable.
            </li>
            <li>
              <strong className="text-purple-900 font-bold">Organize</strong>{" "}
              tasks into different categories for better management.
            </li>
          </ul>
        </div>
        <div>
          <img className=" shadow-xl shadow-black" src="about.png" alt="" />
        </div>
      </div>
      <br />
      <p className="font-serif">
        Our goal is to provide you with a user-friendly interface that makes
        task management a breeze. We hope you find our To-Do List App useful and
        enjoyable!
      </p>
    </div>
  );
};

export default Page;
