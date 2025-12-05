import React, { forwardRef, useState, useEffect } from "react";

interface Certificate {
  certificate?: string;
  certificateName?: string;
  // The sheet currently exports columns named "certificates" and "certificate name"
  certificates?: string;
  "certificate name"?: string;
}

interface EnhancedAboutSectionProps {
  className?: string;
}

const EnhancedAboutSection = forwardRef<HTMLDivElement, EnhancedAboutSectionProps>(
  ({ className }, ref) => {
    const [certificates, setCertificates] = useState<Certificate[]>([]);
    const [selectedCertificate, setSelectedCertificate] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchCertificates = async () => {
        try {
          const response = await fetch("/api/sheet");
          const data = await response.json();

          const certs = data
            .map((row: Certificate) => ({
              certificate: row.certificate || row.certificates,
              certificateName: row.certificateName || row["certificate name"],
            }))
            .filter((row: Certificate) => row.certificate && row.certificateName);

          setCertificates(certs);
        } catch (error) {
          console.error("Error fetching certificates:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchCertificates();
    }, []);

    // Prevent body scroll when modal is open
    useEffect(() => {
      if (selectedCertificate) {
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
    }, [selectedCertificate]);

    return (
      <div
        ref={ref}
        className={`w-full min-h-screen bg-[#0a0a0a] relative overflow-hidden flex flex-col items-center justify-center px-3 sm:px-6 md:px-10 ${
          className || ""
        }`}
      >
        {/* Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="hidden sm:block absolute top-20 left-10 w-32 h-32 md:w-72 md:h-72 bg-blue-500/15 rounded-full blur-3xl animate-pulse" />
          <div
            className="hidden sm:block absolute bottom-20 right-10 w-44 h-44 md:w-96 md:h-96 bg-blue-400/12 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="hidden sm:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-80 md:h-80 bg-blue-600/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          />
          <div
            className="hidden sm:block absolute top-10 right-1/4 w-28 h-28 md:w-60 md:h-60 bg-blue-300/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "3s" }}
          />
        </div>

        {/* Header */}
        <div className="relative z-10 flex flex-col items-center justify-center mb-12">
          <h2 className="text-5xl sm:text-6xl font-extrabold text-blue-500">
            About
          </h2>
        </div>

        {/* MAIN CONTENT */}
        <section id="about" className="relative w-full py-10">
          <div className="max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-12">
            {/* Description */}
            <div className="mb-12">
              <p className="text-gray-200 text-center text-base sm:text-lg md:text-xl leading-relaxed max-w-5xl mx-auto font-light">
                I am a proactive professional combining expertise in <span className="text-blue-400 font-medium">design</span>, <span className="text-blue-400 font-medium">manufacturing</span>,
                <span className="text-blue-400 font-medium"> research</span>, <span className="text-blue-400 font-medium">web development</span>, and <span className="text-blue-400 font-medium">game development</span>. Passionate about impactful
                projects, continuous learning, and delivering high-quality solutions.
              </p>
            </div>

            {/* GRID 2 COLUMNS */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 mb-8 md:mb-10">

              {/* ---------- EDUCATION ---------- */}
              <div className="flex flex-col h-full">
                <div className="bg-gradient-to-br from-blue-950/40 via-gray-900/50 to-gray-900/60 rounded-3xl p-6 sm:p-8 border border-blue-500/30 shadow-2xl shadow-blue-500/10 hover:shadow-blue-500/20 hover:border-blue-400/50 transition-all duration-500 group h-full">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mr-4 shadow-lg shadow-blue-500/50 group-hover:shadow-blue-500/70 group-hover:scale-110 transition-all duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-300">
                      Education
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div className="relative bg-gradient-to-br from-gray-800/90 to-gray-900/90 p-5 rounded-2xl border border-gray-700/50 hover:border-blue-500/60 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:scale-[1.02] group/item overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 opacity-0 group-hover/item:opacity-100 transition-opacity duration-500"></div>
                      <div className="relative z-10">
                        <div className="text-gray-100 font-bold text-base sm:text-lg mb-2 group-hover/item:text-blue-300 transition-colors duration-300">
                          GCE Advanced Level - Physical Science
                        </div>
                        <div className="text-gray-300 text-sm sm:text-base leading-relaxed">
                          <span className="inline-block px-2 py-1 bg-blue-500/20 text-blue-400 rounded font-semibold mr-2">3As</span>
                          <span className="text-gray-400">Z-Score:</span> <span className="text-blue-400 font-semibold">2.2736</span>
                        </div>
                        <div className="text-gray-400 text-xs sm:text-sm mt-1">
                          District Rank: <span className="text-blue-400 font-semibold">38</span> • Island Rank: <span className="text-blue-400 font-semibold">434</span>
                        </div>
                      </div>
                    </div>

                    <div className="relative bg-gradient-to-br from-gray-800/90 to-gray-900/90 p-4 rounded-2xl border border-gray-700/50 hover:border-blue-500/60 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:scale-[1.02] group/item overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 opacity-0 group-hover/item:opacity-100 transition-opacity duration-500"></div>
                      <div className="relative z-10">
                        <div className="text-gray-100 font-semibold text-sm sm:text-base mb-1">GCE Ordinary Level</div>
                        <div className="text-gray-300 text-xs sm:text-sm">Passed with <span className="text-blue-400 font-semibold">9 A&apos;s</span></div>
                      </div>
                    </div>

                    <div className="relative bg-gradient-to-br from-gray-800/90 to-gray-900/90 p-4 rounded-2xl border border-gray-700/50 hover:border-blue-500/60 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:scale-[1.02] group/item overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 opacity-0 group-hover/item:opacity-100 transition-opacity duration-500"></div>
                      <div className="relative z-10">
                        <div className="text-gray-100 font-semibold text-sm sm:text-base mb-1">Diploma in English</div>
                        <div className="text-gray-300 text-xs sm:text-sm">Open University Matara</div>
                      </div>
                    </div>

                    <div className="relative bg-gradient-to-br from-gray-800/90 to-gray-900/90 p-4 rounded-2xl border border-gray-700/50 hover:border-blue-500/60 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:scale-[1.02] group/item overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 opacity-0 group-hover/item:opacity-100 transition-opacity duration-500"></div>
                      <div className="relative z-10">
                        <div className="text-gray-100 font-semibold text-sm sm:text-base mb-1">School</div>
                        <div className="text-gray-300 text-xs sm:text-sm">Rahula College Matara</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ---------- INFORMATION ---------- */}
              <div className="flex flex-col h-full">
                <div className="bg-gradient-to-br from-gray-800/50 via-gray-900/50 to-blue-950/40 rounded-3xl p-6 sm:p-8 border border-blue-500/30 shadow-2xl shadow-blue-500/10 hover:shadow-blue-500/20 hover:border-blue-400/50 transition-all duration-500 group h-full">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mr-4 shadow-lg shadow-blue-500/50 group-hover:shadow-blue-500/70 group-hover:scale-110 transition-all duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-300">
                      Contact Info
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div className="relative group/item p-5 bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-2xl border border-gray-700/50 hover:border-blue-500/60 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:scale-[1.02] overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 opacity-0 group-hover/item:opacity-100 transition-opacity duration-500"></div>
                      <div className="relative z-10 flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center flex-shrink-0 group-hover/item:bg-blue-500/30 transition-colors duration-300">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-blue-400 text-sm mb-1">Address</div>
                          <div className="text-gray-200 text-sm sm:text-base">122A/7, Rahula Road, Matara</div>
                        </div>
                      </div>
                    </div>

                    <div className="relative group/item p-5 bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-2xl border border-gray-700/50 hover:border-blue-500/60 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:scale-[1.02] overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 opacity-0 group-hover/item:opacity-100 transition-opacity duration-500"></div>
                      <div className="relative z-10 flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center flex-shrink-0 group-hover/item:bg-blue-500/30 transition-colors duration-300">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-blue-400 text-sm mb-1">Email</div>
                          <a
                            href="mailto:malikpriyashan990@gmail.com"
                            className="text-gray-200 hover:text-blue-400 transition-colors duration-300 text-sm sm:text-base break-all"
                          >
                            malikpriyashan990@gmail.com
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="relative group/item p-5 bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-2xl border border-gray-700/50 hover:border-blue-500/60 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:scale-[1.02] overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 opacity-0 group-hover/item:opacity-100 transition-opacity duration-500"></div>
                      <div className="relative z-10 flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center flex-shrink-0 group-hover/item:bg-blue-500/30 transition-colors duration-300">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-blue-400 text-sm mb-1">Phone</div>
                          <a href="tel:0771835699" className="text-gray-200 hover:text-blue-400 transition-colors duration-300 text-sm sm:text-base">
                            0771835699
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="relative group/item p-5 bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-2xl border border-gray-700/50 hover:border-blue-500/60 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:scale-[1.02] overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 opacity-0 group-hover/item:opacity-100 transition-opacity duration-500"></div>
                      <div className="relative z-10 flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center flex-shrink-0 group-hover/item:bg-blue-500/30 transition-colors duration-300">
                          <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-blue-400 text-sm mb-1">LinkedIn</div>
                          <a
                            href="https://linkedin.com/in/malik-priyashan-010364296"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-200 hover:text-blue-400 transition-colors duration-300 text-sm sm:text-base break-all"
                          >
                            malik-priyashan-010364296
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="relative group/item p-5 bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-2xl border border-gray-700/50 hover:border-blue-500/60 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:scale-[1.02] overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 opacity-0 group-hover/item:opacity-100 transition-opacity duration-500"></div>
                      <div className="relative z-10 flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center flex-shrink-0 group-hover/item:bg-blue-500/30 transition-colors duration-300">
                          <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-blue-400 text-sm mb-1">GitHub</div>
                          <a
                            href="https://github.com/Malik-priyashan"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-200 hover:text-blue-400 transition-colors duration-300 text-sm sm:text-base break-all"
                          >
                            Malik-priyashan
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ---------- CERTIFICATES SECTION (Full Width) ---------- */}
            <div className="w-full">
              <div className="bg-gradient-to-br from-blue-950/40 via-gray-900/50 to-gray-900/60 rounded-3xl p-6 sm:p-8 border border-blue-500/30 shadow-2xl shadow-blue-500/10 hover:shadow-blue-500/20 hover:border-blue-400/50 transition-all duration-500 group">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mr-4 shadow-lg shadow-blue-500/50 group-hover:shadow-blue-500/70 group-hover:scale-110 transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-300">
                    Certificates
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {loading ? (
                    <div className="col-span-full text-center text-gray-400 py-8">Loading certificates...</div>
                  ) : certificates.length > 0 ? (
                    certificates.map((cert, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedCertificate(cert.certificate || null)}
                        className="w-full relative bg-gradient-to-br from-gray-800/90 to-gray-900/90 p-4 rounded-2xl border border-gray-700/50 hover:border-blue-500/60 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:scale-[1.02] group/item overflow-hidden text-left"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 opacity-0 group-hover/item:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative z-10 flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <div className="text-gray-100 font-semibold text-sm sm:text-base mb-1 group-hover/item:text-blue-300 transition-colors duration-300">
                              {cert.certificateName}
                            </div>
                            <div className="flex items-center gap-2 text-xs sm:text-sm text-blue-400 font-medium">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                              <span>Click to view</span>
                            </div>
                          </div>
                          <div className="flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400 group-hover/item:text-blue-300 transition-all duration-300 group-hover/item:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </div>
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="col-span-full text-center text-gray-400 py-8">No certificates available</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Certificate Modal */}
        {selectedCertificate && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-hidden"
            onClick={() => setSelectedCertificate(null)}
            style={{ touchAction: 'none' }}
          >
            <div 
              className="relative w-full max-w-5xl bg-gray-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-700 p-4 sm:p-6 flex items-center justify-between flex-shrink-0">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white drop-shadow-lg">
                  Certificate
                </h3>
                <button
                  onClick={() => setSelectedCertificate(null)}
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
                  src={`${selectedCertificate}#zoom=page-fit&view=FitH`}
                  className="w-full h-full min-h-[60vh] border-0"
                  title="Certificate"
                  allow="fullscreen"
                  style={{ minHeight: '500px' }}
                />
              </div>
              
              {/* Footer */}
              <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-gray-700 flex-shrink-0">
                <p className="text-gray-300 text-sm sm:text-base font-medium">
                  Certificate Document
                </p>
                <a
                  href={selectedCertificate}
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
