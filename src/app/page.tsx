"use client";
import { useRef, useEffect, useState } from "react";
import Navbar from "../app/components/Navbar";

const roles = [
  "Innovative Thinker",
  "Web Development",
  "Game Development",
  "Mobile App Development",
  "Mechanical Engineer",
];

export default function Home() {
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length);
    }, 2500); // change every 2.5s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen w-full font-sans transition-colors duration-300 flex flex-col">
      {/* Navbar */}
      <Navbar sectionRefs={sectionRefs} />

      <main className="max-w-4xl mx-auto pt-24 pb-12 px-4 flex flex-col gap-24">
        {/* Home Section with Background */}
 <section
  id="home"
  ref={(el) => { sectionRefs.current["home"] = el; }}
  className="max-w-screen h-screen flex flex-col items-center justify-center text-center gap-6"
  style={{
   // backgroundImage: "url('/bg.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
>
  {/* Badge */}
  <span className="px-3 py-1 bg-purple-600 text-white text-sm font-semibold rounded-full shadow-md">
    Undergraduate
  </span>

  {/* Name */}
  <h1 className="text-4xl sm:text-5xl font-extrabold">
    Hi, I'm{" "}
    <span className="bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
      Malik Priyashan
    </span>
  </h1>

  {/* Animated Roles */}
  <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 dark:text-gray-200 h-10">
    <span key={index} className="inline-block animate-fadeInUp">
      {roles[index]}
    </span>
  </h2>

  {/* Description */}
  <p className="text-gray-700 dark:text-gray-300 max-w-2xl text-base sm:text-lg leading-relaxed">
    Combining traditional engineering principles with cutting-edge technology to
    create innovative solutions for complex problems.
  </p>

  {/* Buttons */}
  <div className="flex gap-4 mt-6 flex-wrap justify-center">
    <a
      href="/cv.pdf"
      download
      className="flex items-center gap-2 px-6 py-3 rounded-full border-2 border-blue-400 text-blue-500 font-semibold hover:border-blue-600 hover:text-blue-600 transition-transform duration-300 transform hover:scale-105"
    >
      <span className="text-lg">⬇</span> Download CV
    </a>
    <a
      href="#projects"
      className="flex items-center gap-2 px-6 py-3 rounded-full border-2 border-blue-400 text-blue-500 font-semibold hover:border-blue-600 hover:text-blue-600 transition-transform duration-300 transform hover:scale-105"
    >
      <span className="text-lg">→</span> View Projects
    </a>
  </div>
</section>


        {/* Skills Section */}
        <section
          id="skills"
          ref={(el) => { sectionRefs.current["skills"] = el; }}
          className="min-h-[40vh] flex flex-col items-center text-center gap-3"
        >
          <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">Skills</h2>
          <div className="flex flex-wrap justify-center gap-4 mt-2">
            <span className="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full font-medium shadow">JavaScript</span>
            <span className="bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 px-4 py-2 rounded-full font-medium shadow">TypeScript</span>
            <span className="bg-pink-100 dark:bg-pink-900/40 text-pink-700 dark:text-pink-300 px-4 py-2 rounded-full font-medium shadow">React</span>
            <span className="bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 px-4 py-2 rounded-full font-medium shadow">Next.js</span>
            <span className="bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300 px-4 py-2 rounded-full font-medium shadow">Tailwind CSS</span>
          </div>
        </section>

        {/* Projects Section */}
        <section
          id="projects"
          ref={(el) => { sectionRefs.current["projects"] = el; }}
          className="min-h-[40vh] flex flex-col items-center text-center gap-3"
        >
          <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">Projects</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-2 w-full">
            <div className="bg-white dark:bg-[#23272f] rounded-xl shadow p-5 flex flex-col items-start border border-gray-200 dark:border-gray-800 hover:scale-[1.03] transition-transform">
              <h3 className="text-xl font-semibold mb-1">Project Title</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2 text-sm">
                Short project description goes here. Highlight what you built and the tech used.
              </p>
              <a
                href="#"
                className="text-blue-500 dark:text-blue-300 hover:underline text-sm font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Project
              </a>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contacts"
          ref={(el) => { sectionRefs.current["contacts"] = el; }}
          className="min-h-[30vh] flex flex-col items-center text-center gap-3"
        >
          <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">Contact</h2>
          <p className="text-gray-700 dark:text-gray-300 max-w-xl">
            Email:{" "}
            <a href="mailto:your@email.com" className="text-blue-500 hover:underline dark:text-blue-300">
              your@email.com
            </a>
          </p>
        </section>
      </main>
    </div>
  );
}
