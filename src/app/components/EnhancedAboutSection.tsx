import React, { forwardRef } from "react";

interface EnhancedAboutSectionProps {
  className?: string;
}

const EnhancedAboutSection = forwardRef<HTMLDivElement, EnhancedAboutSectionProps>(
  ({ className }, ref) => {
    return (
      <div
        ref={ref}
        className={`w-full min-h-screen bg-[#0a0a0a] relative overflow-hidden flex flex-col items-center justify-center ${className || ""} px-3 sm:px-6 md:px-10`}
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="hidden sm:block absolute top-20 left-10 w-32 h-32 md:w-72 md:h-72 bg-blue-500/15 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="hidden sm:block absolute bottom-20 right-10 w-44 h-44 md:w-96 md:h-96 bg-purple-500/12 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="hidden sm:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-80 md:h-80 bg-indigo-500/8 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="hidden sm:block absolute top-10 right-1/4 w-28 h-28 md:w-60 md:h-60 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "3s" }}
          ></div>
        </div>

        {/* Title + Subtitle */}
        <div className="relative z-10 flex flex-col items-center justify-center mb-6 sm:mb-10 px-3">
          <h2 className="text-5xl xs:text-5xl sm:text-6xl font-extrabold text-blue-600 dark:text-blue-400 text-center w-full">
            About
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 mt-3 sm:mt-6 max-w-2xl mx-auto font-medium text-center">
            Passionate professional combining creativity with technical expertise
          </p>
        </div>

        {/* Content Section */}
        <section id="about" className="relative w-full py-6 sm:py-10">
          <div className="max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-12">
            {/* Main Card */}
            <div className="w-full mx-auto bg-gray-900/80 backdrop-blur-xl rounded-2xl p-4 sm:p-6 md:p-10 shadow-[0_4px_32px_0_rgba(255,255,255,0.15)]">
              {/* Description */}
              <div className="mb-6 sm:mb-10">
                <p className="text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed font-medium text-center">
                  I am a proactive professional combining expertise in design, manufacturing,
                  research, web development, and game development. Passionate about impactful
                  projects, continuous learning, and delivering high-quality solutions.
                  I thrive in collaborative environments to drive innovation and achieve
                  shared goals.
                </p>
              </div>

              {/* Grid Content */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                {/* Education */}
                <div className="flex flex-col">
                  <div className="bg-gradient-to-br from-blue-950/50 to-indigo-950/50 rounded-xl p-4 sm:p-6 border border-blue-800/30 shadow-lg shadow-blue-500/5 flex flex-col h-full">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-100 mb-4 flex items-center">
                      <div className="w-2 h-6 bg-gradient-to-b from-indigo-400 to-purple-500 rounded-full mr-3 shadow-lg shadow-indigo-400/50"></div>
                      Education
                    </h3>
                    <div className="space-y-3 sm:space-y-4">
                      <div className="bg-gray-800/60 rounded-xl p-3 sm:p-4 border border-gray-600/40 hover:border-cyan-500/40 transition-colors duration-300">
                        <div className="font-semibold text-gray-100 text-base sm:text-lg">
                          GCE Advanced Level - Physical Science
                        </div>
                        <div className="text-sm sm:text-base text-gray-300">
                          3As (2021/2022) • Z-Score: 2.2736 • District Rank: 38 • Island Rank: 434
                        </div>
                      </div>
                      <div className="bg-gray-800/60 rounded-xl p-3 sm:p-4 border border-gray-600/40 hover:border-cyan-500/40 transition-colors duration-300">
                        <div className="font-semibold text-gray-100 text-sm sm:text-base">
                          G.C.E. Ordinary Level
                        </div>
                        <div className="text-xs sm:text-sm text-gray-300">Passed with 9 A&apos;s</div>
                      </div>
                      <div className="bg-gray-800/60 rounded-xl p-3 sm:p-4 border border-gray-600/40 hover:border-cyan-500/40 transition-colors duration-300">
                        <div className="font-semibold text-gray-100 text-sm sm:text-base">
                          Diploma in English
                        </div>
                        <div className="text-xs sm:text-sm text-gray-300">
                          Open University Matara
                        </div>
                      </div>
                      <div className="bg-gray-800/60 rounded-xl p-3 sm:p-4 border border-gray-600/40 hover:border-cyan-500/40 transition-colors duration-300">
                        <div className="font-semibold text-gray-100 text-sm sm:text-base">
                          School
                        </div>
                        <div className="text-xs sm:text-sm text-gray-300">
                          Rahula College Matara
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Information */}
                <div className="flex flex-col">
                  <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-xl p-4 sm:p-6 border border-gray-600/50 shadow-lg shadow-blue-500/5 flex flex-col h-full">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-100 mb-4 flex items-center">
                      <div className="w-2 h-6 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full mr-3 shadow-lg shadow-cyan-400/50"></div>
                      Information
                    </h3>
                    <div className="grid grid-cols-1 gap-3 sm:gap-4 text-base sm:text-lg flex-1">
                      <div className="flex flex-col">
                        <span className="font-semibold text-gray-400">Address</span>
                        <span className="text-gray-200 text-base sm:text-lg">
                          122A/7, Rahula Road, Matara
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold text-gray-400">Email</span>
                        <a
                          href="mailto:malikpriyashan990@gmail.com"
                          className="text-cyan-400 hover:text-cyan-300 transition-colors duration-200 hover:underline break-all"
                        >
                          malikpriyashan990@gmail.com
                        </a>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold text-gray-400">Phone</span>
                        <a
                          href="tel:0771835699"
                          className="text-cyan-400 hover:text-cyan-300 transition-colors duration-200 hover:underline"
                        >
                          0771835699
                        </a>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold text-gray-400">LinkedIn</span>
                        <a
                          href="https://linkedin.com/in/malik-priyashan-010364296"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cyan-400 hover:text-cyan-300 transition-colors duration-200 hover:underline break-all"
                        >
                          /in/malik-priyashan-010364296
                        </a>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold text-gray-400">GitHub</span>
                        <a
                          href="https://github.com/Malik-priyashan"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cyan-400 hover:text-cyan-300 transition-colors duration-200 hover:underline break-all"
                        >
                          github.com/Malik-priyashan
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* End Grid */}
            </div>
          </div>
        </section>
      </div>
    );
  }
);

EnhancedAboutSection.displayName = "EnhancedAboutSection";
export default EnhancedAboutSection;
