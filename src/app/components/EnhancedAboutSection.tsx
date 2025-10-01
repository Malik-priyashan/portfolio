import React, { forwardRef, useState, useEffect } from "react";

interface EnhancedAboutSectionProps {
  className?: string;
}

const EnhancedAboutSection = forwardRef<HTMLDivElement, EnhancedAboutSectionProps>(
  ({ className }, ref) => {
    const [showCertificate, setShowCertificate] = useState(false);
    
    // Prevent body scroll when modal is open
    useEffect(() => {
      if (showCertificate) {
        document.body.style.overflow = 'hidden';
        document.body.style.touchAction = 'none';
      } else {
        document.body.style.overflow = '';
        document.body.style.touchAction = '';
      }
      return () => {
        document.body.style.overflow = '';
        document.body.style.touchAction = '';
      };
    }, [showCertificate]);
    
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
            className="hidden sm:block absolute bottom-20 right-10 w-44 h-44 md:w-96 md:h-96 bg-blue-400/12 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="hidden sm:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-80 md:h-80 bg-blue-600/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="hidden sm:block absolute top-10 right-1/4 w-28 h-28 md:w-60 md:h-60 bg-blue-300/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "3s" }}
          ></div>
        </div>

        {/* Title + Subtitle */}
        <div className="relative z-10 flex flex-col items-center justify-center mb-6 sm:mb-10 px-3">
          <h2 className="text-5xl font-extrabold text-blue-600 dark:text-blue-400 mb-2">
            About
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 mt-3 sm:mt-6 max-w-2xl mx-auto font-medium text-center leading-relaxed">
            Passionate professional combining creativity with technical expertise
          </p>
        </div>

        {/* Content Section */}
        <section id="about" className="relative w-full py-6 sm:py-10">
          <div className="max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-12">
            {/* Main Card */}
            <div className="w-full mx-auto bg-gray-900/80 backdrop-blur-xl rounded-3xl p-4 sm:p-6 md:p-10 shadow-[0_8px_40px_0_rgba(59,130,246,0.2)] border border-blue-500/20 hover:shadow-[0_8px_40px_0_rgba(59,130,246,0.3)] transition-all duration-500">
              {/* Description */}
              <div className="mb-6 sm:mb-10">
                <p className="text-gray-200 text-base sm:text-lg md:text-xl leading-relaxed font-medium text-center">
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
                <div className="flex flex-col space-y-4 sm:space-y-6 md:space-y-8">
                  <div className="bg-gradient-to-br from-blue-950/50 to-gray-900/50 rounded-2xl p-4 sm:p-6 border border-blue-500/30 shadow-lg shadow-blue-500/10 flex flex-col h-full hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-500 hover:border-blue-400/50 group">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-blue-400 dark:text-blue-300 mb-4 flex items-center group-hover:text-blue-300 transition-all duration-300">
                      <div className="w-3 h-8 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full mr-3 shadow-lg shadow-blue-400/50 group-hover:shadow-blue-400/70 transition-all duration-300"></div>
                      Education
                    </h3>
                    <div className="space-y-3 sm:space-y-4">
                      <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-xl p-3 sm:p-4 border border-gray-600/50 hover:border-blue-500/70 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:transform hover:scale-[1.02] group/item">
                        <div className="font-semibold text-gray-100 text-base sm:text-lg group-hover/item:text-blue-300 transition-colors duration-300">
                          GCE Advanced Level - Physical Science
                        </div>
                        <div className="text-sm sm:text-base text-gray-300 group-hover/item:text-gray-200 transition-colors duration-300">
                          <span className="text-blue-400 font-semibold">3As</span> (2021/2022) • Z-Score: <span className="text-blue-400 font-semibold">2.2736</span> • District Rank: <span className="text-blue-400 font-semibold">38</span> • Island Rank: <span className="text-blue-400 font-semibold">434</span>
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-xl p-3 sm:p-4 border border-gray-600/50 hover:border-blue-500/70 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:transform hover:scale-[1.02] group/item">
                        <div className="font-semibold text-gray-100 text-sm sm:text-base group-hover/item:text-blue-300 transition-colors duration-300">
                          G.C.E. Ordinary Level
                        </div>
                        <div className="text-xs sm:text-sm text-gray-300 group-hover/item:text-gray-200 transition-colors duration-300">Passed with <span className="text-blue-400 font-semibold">9 A&apos;s</span></div>
                      </div>
                      <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-xl p-3 sm:p-4 border border-gray-600/50 hover:border-blue-500/70 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:transform hover:scale-[1.02] group/item">
                        <div className="font-semibold text-gray-100 text-sm sm:text-base group-hover/item:text-blue-300 transition-colors duration-300">
                          Diploma in English
                        </div>
                        <div className="text-xs sm:text-sm text-gray-300 group-hover/item:text-gray-200 transition-colors duration-300">
                          Open University Matara
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-xl p-3 sm:p-4 border border-gray-600/50 hover:border-blue-500/70 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:transform hover:scale-[1.02] group/item">
                        <div className="font-semibold text-gray-100 text-sm sm:text-base group-hover/item:text-blue-300 transition-colors duration-300">
                          School
                        </div>
                        <div className="text-xs sm:text-sm text-gray-300 group-hover/item:text-gray-200 transition-colors duration-300">
                          Rahula College Matara
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Certificates Section */}
                  <div className="bg-gradient-to-br from-blue-950/50 to-gray-900/50 rounded-2xl p-4 sm:p-6 border border-blue-500/30 shadow-lg shadow-blue-500/10 flex flex-col hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-500 hover:border-blue-400/50 group">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-blue-400 dark:text-blue-300 mb-4 flex items-center group-hover:text-blue-300 transition-all duration-300">
                      <div className="w-3 h-8 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full mr-3 shadow-lg shadow-blue-400/50 group-hover:shadow-blue-400/70 transition-all duration-300"></div>
                      Certificates
                    </h3>
                    <div className="space-y-3 sm:space-y-4">
                      <button
                        onClick={() => setShowCertificate(true)}
                        className="w-full bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-xl p-3 sm:p-4 border border-gray-600/50 hover:border-blue-500/70 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 hover:transform hover:scale-[1.02] group/cert cursor-pointer text-left relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 opacity-0 group-hover/cert:opacity-100 transition-opacity duration-500"></div>
                        <div className="flex items-start justify-between gap-3 relative z-10">
                          <div className="flex-1">
                            <div className="font-semibold text-gray-100 text-base sm:text-lg mb-1 group-hover/cert:text-blue-300 transition-colors duration-300">
                              Full Stack Web Development Bootcamp
                            </div>
                            <div className="text-sm sm:text-base text-gray-400 mb-2 group-hover/cert:text-gray-300 transition-colors duration-300">
                              Udemy Certificate
                            </div>
                            <div className="flex items-center gap-2 text-xs sm:text-sm text-blue-400 font-medium group-hover/cert:text-blue-300 transition-colors duration-300">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                              <span>Click to view certificate</span>
                            </div>
                          </div>
                          <div className="flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400 group-hover/cert:text-blue-300 transition-all duration-300 group-hover/cert:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Information */}
                <div className="flex flex-col">
                  <div className="bg-gradient-to-br from-gray-800/90 via-gray-800/80 to-gray-900/90 rounded-2xl p-4 sm:p-6 border border-blue-500/30 shadow-lg shadow-blue-500/10 flex flex-col h-full hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-500 hover:border-blue-400/50 group">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-blue-400 dark:text-blue-300 mb-4 flex items-center group-hover:text-blue-300 transition-all duration-300">
                      <div className="w-3 h-8 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full mr-3 shadow-lg shadow-blue-400/50 group-hover:shadow-blue-400/70 transition-all duration-300"></div>
                      Information
                    </h3>
                    <div className="grid grid-cols-1 gap-3 sm:gap-4 text-base sm:text-lg flex-1">
                      <div className="flex flex-col p-3 rounded-lg bg-gray-900/50 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-[1.02] group/info">
                        <span className="font-semibold text-blue-400 mb-1 flex items-center gap-2">
                          <span className="text-lg">📍</span> Address
                        </span>
                        <span className="text-gray-200 text-base sm:text-lg group-hover/info:text-gray-100 transition-colors duration-300">
                          122A/7, Rahula Road, Matara
                        </span>
                      </div>
                      <div className="flex flex-col p-3 rounded-lg bg-gray-900/50 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-[1.02] group/info">
                        <span className="font-semibold text-blue-400 mb-1 flex items-center gap-2">
                          <span className="text-lg">✉️</span> Email
                        </span>
                        <a
                          href="mailto:malikpriyashan990@gmail.com"
                          className="text-blue-400 hover:text-blue-300 transition-colors duration-200 hover:underline break-all font-medium"
                        >
                          malikpriyashan990@gmail.com
                        </a>
                      </div>
                      <div className="flex flex-col p-3 rounded-lg bg-gray-900/50 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-[1.02] group/info">
                        <span className="font-semibold text-blue-400 mb-1 flex items-center gap-2">
                          <span className="text-lg">📱</span> Phone
                        </span>
                        <a
                          href="tel:0771835699"
                          className="text-blue-400 hover:text-blue-300 transition-colors duration-200 hover:underline font-medium"
                        >
                          0771835699
                        </a>
                      </div>
                      <div className="flex flex-col p-3 rounded-lg bg-gray-900/50 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-[1.02] group/info">
                        <span className="font-semibold text-blue-400 mb-1 flex items-center gap-2">
                          <span className="text-lg">💼</span> LinkedIn
                        </span>
                        <a
                          href="https://linkedin.com/in/malik-priyashan-010364296"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 transition-colors duration-200 hover:underline break-all font-medium"
                        >
                          /in/malik-priyashan-010364296
                        </a>
                      </div>
                      <div className="flex flex-col p-3 rounded-lg bg-gray-900/50 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-[1.02] group/info">
                        <span className="font-semibold text-blue-400 mb-1 flex items-center gap-2">
                          <span className="text-lg">💻</span> GitHub
                        </span>
                        <a
                          href="https://github.com/Malik-priyashan"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 transition-colors duration-200 hover:underline break-all font-medium"
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

        {/* Certificate Modal */}
        {showCertificate && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-hidden"
            onClick={() => setShowCertificate(false)}
            style={{ touchAction: 'none' }}
          >
            <div 
              className="relative w-full max-w-5xl bg-gray-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-700 p-4 sm:p-6 flex items-center justify-between flex-shrink-0">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white drop-shadow-lg">
                  Full Stack Web Development Bootcamp Certificate
                </h3>
                <button
                  onClick={() => setShowCertificate(false)}
                  className="text-white hover:text-gray-200 transition-all duration-200 p-2 hover:bg-white/20 rounded-lg hover:scale-110 hover:rotate-90"
                  aria-label="Close certificate modal"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* PDF Viewer */}
              <div className="relative w-full flex-1 overflow-auto touch-auto" style={{ WebkitOverflowScrolling: 'touch' }}>
                <iframe
                  src="https://udemy-certificate.s3.amazonaws.com/pdf/UC-7979c8ba-943d-4df7-abd3-f820891672bd.pdf#zoom=page-fit&view=FitH"
                  className="w-full h-full min-h-[60vh] border-0"
                  title="Full Stack Web Development Bootcamp Certificate"
                  allow="fullscreen"
                  style={{ minHeight: '500px' }}
                />
              </div>
              
              {/* Footer */}
              <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-gray-700 flex-shrink-0">
                <p className="text-gray-300 text-sm sm:text-base font-medium">
                  Udemy Certificate - <span className="text-blue-400">Full Stack Web Development</span>
                </p>
                <a
                  href="https://udemy-certificate.s3.amazonaws.com/pdf/UC-7979c8ba-943d-4df7-abd3-f820891672bd.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 text-sm sm:text-base font-semibold shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download Certificate
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
);

EnhancedAboutSection.displayName = "EnhancedAboutSection";
export default EnhancedAboutSection;
