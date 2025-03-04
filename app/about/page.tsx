import React from "react";
import Image from "next/image";

const Page = () => {
  const features = [
    {
      action: "Add",
      description: "tasks with titles",
      icon: "✏️",
    },
    {
      action: "Edit",
      description: "tasks to update details",
      icon: "✍️",
    },
    {
      action: "Delete",
      description: "tasks no longer needed",
      icon: "🗑️",
    },
    {
      action: "Mark",
      description: "tasks with status levels",
      icon: "🏷️",
    },
    {
      action: "Organize",
      description: "tasks into categories",
      icon: "📂",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-400 to-slate-700 py-6 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="text-center mb-6 md:mb-8">
          <h1
            className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 
            tracking-tight leading-tight"
          >
            About the To-Do List App
          </h1>
          <hr className="border-t-2 border-white/30 w-24 mx-auto" />
        </header>

        {/* Introduction Section */}
        <section className="bg-white/10 rounded-xl p-6 md:p-8 mb-8 text-center">
          <p className="text-base sm:text-lg md:text-xl text-white max-w-4xl mx-auto leading-relaxed">
            Welcome to our To-Do List App! This powerful tool helps you manage
            tasks efficiently, whether you&apos;re planning your daily schedule
            or organizing a complex project. Stay productive and in control with
            our intuitive interface.
          </p>
        </section>

        {/* Features Section */}
        <section className="grid md:grid-cols-2 gap-6 md:gap-8 mb-8">
          {/* Features List */}
          <div className="bg-white/10 rounded-xl p-6 md:p-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-6 text-center md:text-left">
              Key Features
            </h2>
            <ul className="space-y-4">
              {features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center space-x-4 bg-white/5 p-3 rounded-lg hover:bg-white/10 transition"
                >
                  <span className="text-2xl sm:text-3xl">{feature.icon}</span>
                  <div>
                    <span className="font-bold text-purple-200 text-base sm:text-lg">
                      {feature.action}
                    </span>
                    <p className="text-sm sm:text-base text-white/80">
                      {feature.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Image Section */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-sm md:max-w-md">
              <Image
                src="/about.png"
                alt="To-Do List App Interface"
                width={500}
                height={400}
                priority
                className="rounded-xl shadow-2xl transform hover:scale-105 transition duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px"
              />
            </div>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="bg-white/10 rounded-xl p-6 md:p-8 text-center">
          <p className="text-base sm:text-lg md:text-xl text-white max-w-4xl mx-auto leading-relaxed">
            Our mission is to provide a user-friendly, efficient task management
            solution that adapts to your workflow. Simplify your life, boost
            your productivity, and take control of your daily tasks with ease.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Page;
