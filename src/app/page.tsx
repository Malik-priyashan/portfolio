"use client";
import { useRef, useEffect, useState } from "react";

import Navbar from "../app/components/Navbar";
import ProjectSection from "../app/components/ProjectSection";
import EnhancedAboutSection from "../app/components/EnhancedAboutSection";
import ContactPage from "../app/contact/page";
import ScrollToTopArrow from "../app/components/ScrollToTopArrow";
import Footer from "../app/components/Footer";

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
  const [showCVPreview, setShowCVPreview] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length);
    }, 2500); // change every 2.5s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen w-full font-sans transition-colors duration-300 flex flex-col overflow-x-hidden">
      {/* Navbar */}
      <Navbar sectionRefs={sectionRefs} />
  {/* Scroll to Top Arrow */}
  <ScrollToTopArrow />

  <main className="max-w-7xl w-full mx-auto pt-24 pb-20 px-2 sm:px-4 flex flex-col">

        {/* Home Section */}
        <section
          id="home"
          ref={(el) => { sectionRefs.current["home"] = el; }}
          className="max-w-screen min-h-[85vh] flex flex-col justify-center mb-20"
          style={{
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-20 w-full h-full min-h-[60vh]">
            {/* Left: Image */}
            <div className="flex-shrink-0 flex items-center justify-center w-full md:w-auto">
              <img
                src="/malik.jpg"
                alt="Malik Priyashan"
                className="w-56 h-56 sm:w-72 sm:h-72 md:w-96 md:h-96 rounded-full object-cover border-4 border-blue-400 shadow-lg max-w-full"
              />
            </div>
            {/* Right: Text */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4 max-w-xl w-full md:w-[32rem]">
              <span className="px-3 py-1 bg-purple-600 text-white text-sm font-semibold rounded-full shadow-md">
                Undergraduate
              </span>
              <h1 className="text-4xl sm:text-5xl font-extrabold">
                Hi, I&apos;m{" "}
                <span className="bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Malik Priyashan
                </span>
              </h1>
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 dark:text-gray-200 h-10">
                <span key={index} className="inline-block animate-fadeInUp">
                  {roles[index]}
                </span>
              </h2>
              <p className="text-gray-700 dark:text-gray-300 max-w-2xl text-base sm:text-lg leading-relaxed">
                Blending classical engineering knowledge with modern technology to deliver creative answers to challenging problems.
              </p>
              <div className="flex gap-4 mt-4 flex-wrap justify-center md:justify-start">
                <button
                  onClick={() => setShowCVPreview(true)}
                  className="flex items-center gap-2 px-6 py-3 rounded-full border-2 border-blue-400 text-blue-500 font-semibold hover:border-blue-600 hover:text-blue-600 transition-transform duration-300 transform hover:scale-105 cursor-pointer"
                >
                  <span className="text-lg md:text-xl">↓</span> Download CV
                </button>
                <a
                  href="#projects"
                  className="flex items-center gap-2 px-6 py-3 rounded-full border-2 border-blue-400 text-blue-500 font-semibold hover:border-blue-600 hover:text-blue-600 transition-transform duration-300 transform hover:scale-105"
                >
                  <span className="text-lg md:text-xl">→</span> View Projects
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced About Section */}
        <EnhancedAboutSection
          ref={(el) => { sectionRefs.current["about"] = el; }}
          className="mb-20"
        />

{/* Skills Section */}
<section
  id="skills"
  ref={(el) => { sectionRefs.current["skills"] = el; }}
  className="min-h-[50vh] flex flex-col items-center text-center gap-8 mb-20 px-4"
>
  <div className="max-w-6xl w-full">
    <h2 className="text-5xl font-extrabold text-blue-600 dark:text-blue-400 mb-4 drop-shadow-lg">
      Skills & Expertise
    </h2>
    <p className="text-lg text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
      A comprehensive blend of engineering, programming, and hands-on workshop experience powering innovative solutions.
    </p>

    {/* Skills Grid */}
    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
      
      {/* Technical Skills Column */}
      <div className="h-full">
  <div className="bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg dark:shadow-gray-900/20 border border-gray-200 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300 h-full flex flex-col justify-start">
          <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-6 text-left flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <span className="text-blue-600 dark:text-blue-400">💻</span>
            </div>
            Technical & Programming
          </h3>
          <div className="space-y-6 text-left">
            <div className="group">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full group-hover:scale-125 transition-transform mt-2 flex-shrink-0"></div>
                <span>CAD & Simulation</span>
              </h4>
              <p className="text-gray-600 dark:text-gray-400 pl-4 leading-relaxed">
                SolidWorks, AutoCAD, Fluid Simulation (FluidSIM), ANSYS
              </p>
            </div>
            <div className="group">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full group-hover:scale-125 transition-transform mt-2 flex-shrink-0"></div>
                <span>Programming Languages</span>
              </h4>
              <p className="text-gray-600 dark:text-gray-400 pl-4 leading-relaxed">
                C++, Python, Java, SQL, JavaScript, TypeScript
              </p>
            </div>
            <div className="group">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full group-hover:scale-125 transition-transform mt-2 flex-shrink-0"></div>
                <span>Frameworks & Libraries</span>
              </h4>
              <p className="text-gray-600 dark:text-gray-400 pl-4 leading-relaxed">
                Next.js, React.js
              </p>
            </div>
            <div className="group">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full group-hover:scale-125 transition-transform mt-2 flex-shrink-0"></div>
                <span>Database Technologies</span>
              </h4>
              <p className="text-gray-600 dark:text-gray-400 pl-4 leading-relaxed">
                MongoDB, MySQL, Firebase
              </p>
            </div>
            <div className="group">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full group-hover:scale-125 transition-transform mt-2 flex-shrink-0"></div>
                <span>IoT & Embedded Systems</span>
              </h4>
              <p className="text-gray-600 dark:text-gray-400 pl-4 leading-relaxed">
                Arduino IDE, ESP32, MQTT
              </p>
            </div>
            <div className="group">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full group-hover:scale-125 transition-transform mt-2 flex-shrink-0"></div>
                <span>Tools & Platforms</span>
              </h4>
              <p className="text-gray-600 dark:text-gray-400 pl-4 leading-relaxed">
                GitHub, Unity (2D), Vercel, Figma, NodeRed, Wokwi
              </p>
            </div>
            <div className="group">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full group-hover:scale-125 transition-transform mt-2 flex-shrink-0"></div>
                <span>Soft Skills</span>
              </h4>
              <p className="text-gray-600 dark:text-gray-400 pl-4 leading-relaxed">
                Leadership, Teamwork, Event Management
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Workshop Experience Column */}
      <div className="h-full">
        <div className="bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg dark:shadow-gray-900/20 border border-gray-200 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300 h-full ">
          <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-6 text-left flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <span className="text-blue-600 dark:text-blue-400">🔧</span>
            </div>
            Workshop Experience
          </h3>
          <div className="space-y-6 text-left">
            <div className="group">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full group-hover:scale-125 transition-transform mt-2 flex-shrink-0"></div>
                <span>Machine Operations</span>
              </h4>
              <p className="text-gray-600 dark:text-gray-400 pl-4 leading-relaxed">
                Experience with lathe, milling, and drilling machines for precision machining tasks and component fabrication.
              </p>
            </div>
            <div className="group">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full group-hover:scale-125 transition-transform mt-2 flex-shrink-0"></div>
                <span>Woodworking</span>
              </h4>
              <p className="text-gray-600 dark:text-gray-400 pl-4 leading-relaxed">
                Proficient in milling, cutting, and operating woodworking machines for custom fabrication projects.
              </p>
            </div>
            <div className="group">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full group-hover:scale-125 transition-transform mt-2 flex-shrink-0"></div>
                <span>Welding & Forging</span>
              </h4>
              <p className="text-gray-600 dark:text-gray-400 pl-4 leading-relaxed">
                Hands-on experience in welding processes and basic forging techniques for metal joining and shaping.
              </p>
            </div>
            <div className="group">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full group-hover:scale-125 transition-transform mt-2 flex-shrink-0"></div>
                <span>Sheet Metal Forming</span>
              </h4>
              <p className="text-gray-600 dark:text-gray-400 pl-4 leading-relaxed">
                Skilled in forming, bending, and shaping sheet metal components using specialized workshop tools and equipment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Optional: Decorative Elements */}
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute top-20 left-1/4 w-32 h-32 sm:w-64 sm:h-64 bg-blue-500/5 dark:bg-blue-400/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-1/4 w-48 h-48 sm:w-96 sm:h-96 bg-purple-500/5 dark:bg-purple-400/5 rounded-full blur-3xl"></div>
    </div>
  </div>
</section>
        {/* Projects Section */}
        <section
          id="projects"
          ref={(el) => { sectionRefs.current["projects"] = el; }}
          className="min-h-[40vh] flex flex-col items-center text-center gap-6 mb-20"
        >
          <h2 className="text-5xl font-extrabold text-blue-600 dark:text-blue-400 mb-2">Projects</h2>
          <ProjectSection />
        </section>

        {/* Contact Section */}
        <section
          id="contacts"
          ref={(el) => { sectionRefs.current["contacts"] = el; }}
          className="min-h-[30vh] flex flex-col items-center text-center gap-6 mb-12"
        >
          <h2 className="text-5xl font-extrabold text-blue-600 dark:text-blue-400 mb-2">Contact</h2>
          <div className="w-full flex justify-center">
            <ContactPage />
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* CV Preview Modal */}
      {showCVPreview && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setShowCVPreview(false)}
        >
          <div 
            className="relative w-full max-w-5xl bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-700 p-4 sm:p-6 flex items-center justify-between">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white drop-shadow-lg">
                Curriculum Vitae - Malik Priyashan
              </h3>
              <button
                onClick={() => setShowCVPreview(false)}
                className="text-white hover:text-gray-200 transition-all duration-200 p-2 hover:bg-white/20 rounded-lg hover:scale-110 hover:rotate-90"
                aria-label="Close CV preview"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* PDF Viewer */}
            <div className="relative w-full" style={{ height: "70vh" }}>
              <iframe
                src="/cv.pdf"
                className="w-full h-full border-0"
                title="Curriculum Vitae - Malik Priyashan"
              />
            </div>
            
            {/* Footer */}
            <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-gray-700">
              <p className="text-gray-300 text-sm sm:text-base font-medium">
                Curriculum Vitae - <span className="text-blue-400">Malik Priyashan</span>
              </p>
              <a
                href="/cv.pdf"
                download
                className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 text-sm sm:text-base font-semibold shadow-lg hover:shadow-xl hover:scale-105"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download CV
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
