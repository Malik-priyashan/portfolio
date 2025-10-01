"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
// Custom skeleton card matching the enhanced design
function ProjectCardGridSkeleton() {
  return (
  <div className="embla__slide min-w-0 flex-shrink-0 w-full xs:w-[90vw] sm:w-[420px] px-4 py-4" style={{ maxWidth: 420 }}>
      <div className="relative bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:via-black dark:to-gray-900 rounded-3xl shadow-xl p-8 flex flex-col items-start border-2 border-blue-100 dark:border-blue-900/50 h-[600px] overflow-hidden animate-pulse">
        {/* Decorative gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-white/30 dark:from-blue-950/30 dark:via-transparent dark:to-blue-900/20 pointer-events-none rounded-3xl"></div>
        
        {/* Image skeleton with border */}
        <div className="relative z-10 w-full mb-5 rounded-2xl overflow-hidden border-2 border-blue-100 dark:border-blue-800/50 bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 p-2" style={{height: '280px'}}>
          <div className="w-full h-full bg-gray-300 dark:bg-gray-700 rounded-xl"></div>
        </div>
        
        {/* Title skeleton with gradient */}
        <div className="relative z-10 h-8 w-3/4 bg-gradient-to-r from-blue-200 to-blue-300 dark:from-blue-800 dark:to-blue-700 rounded-lg mb-2"></div>
        
        {/* Date skeleton */}
        <div className="relative z-10 h-4 w-1/3 bg-blue-100 dark:bg-blue-900 rounded mb-3"></div>
        
        {/* Details skeleton */}
        <div className="relative z-10 space-y-2 w-full flex-1">
          <div className="h-4 w-[95%] bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-4 w-[90%] bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-4 w-[85%] bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-4 w-[70%] bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
        
        {/* Badge skeleton */}
        <div className="relative z-10 h-7 w-32 bg-gradient-to-r from-blue-400 to-blue-500 dark:from-blue-600 dark:to-blue-700 rounded-full mb-3"></div>
        
        {/* Button skeleton */}
        <div className="relative z-10 mt-auto flex justify-start w-full">
          <div className="h-6 w-40 bg-blue-300 dark:bg-blue-600 rounded"></div>
        </div>
        
        {/* Corner accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-transparent dark:from-blue-500/10 rounded-bl-full pointer-events-none"></div>
      </div>
    </div>
  );
}

type Project = {
  name?: string;
  details?: string;
  sources?: string;
  image?: string;
  date?: string | number;
  [key: string]: string | number | undefined;
};

// Helper function to format dates (Excel numeric, ISO string, timestamp)
function formatDate(value: string | number | undefined) {
  if (!value) return "";
  let dateObj: Date;
  if (typeof value === "number") {
    // Excel numeric date -> JS Date
    dateObj = new Date((value - 25569) * 86400 * 1000);
  } else if (typeof value === "string") {
    dateObj = new Date(value);
  } else {
    return String(value);
  }
  if (isNaN(dateObj.getTime())) return String(value);
  return dateObj.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
  });
}

// Dynamically import EmblaCarousel to avoid SSR issues
const EmblaCarousel = dynamic(() => import("./EmblaCarousel"), { ssr: false });


export default function ProjectSection() {
  const [data, setData] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");

  // Section mapping
  const sectionMap = {
    M: "Mechanical & Robotics",
    S: "Software Development",
    I: "IoT & Embedded",
    G: "Game Development",
  };
  const filterOptions = [
    { key: "ALL", label: "All" },
    { key: "M", label: sectionMap["M"] },
    { key: "S", label: sectionMap["S"] },
    { key: "I", label: sectionMap["I"] },
    { key: "G", label: sectionMap["G"] },
  ];

  useEffect(() => {
    fetch("/api/sheet")
      .then((res) => res.json())
      .then((json) => {
        // Add section property to each project
        const projects = Array.isArray(json)
          ? json.map((row) => {
              let section = "";
              // Try to get section from member count column
              if (row["member count"] && typeof row["member count"] === "string") {
                const parts = row["member count"].split(",");
                if (parts.length > 1) section = parts[1].trim();
              }
              return { ...row, section };
            })
          : [];
        setData(projects);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setData([]);
        setLoading(false);
      });
  }, []);

  // Filter projects by section
  const filteredData =
    filter === "ALL"
      ? data
      : data.filter((row) => row.section === filter);

  if (loading) {
    return (
      <div className="mt-4 w-full relative flex items-center justify-center">
        <div className="flex-shrink-0 mr-2">
          <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full flex items-center justify-center animate-pulse">
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </div>
        </div>
        <div className="flex flex-row gap-4 justify-center">
          {Array.from({ length: 3 }).map((_, idx) => (
            <ProjectCardGridSkeleton key={idx} />
          ))}
        </div>
        <div className="flex-shrink-0 ml-2">
          <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full flex items-center justify-center animate-pulse">
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    );
  }
  if (!loading && (!filteredData || filteredData.length === 0)) {
    return (
      <div className="w-full text-center py-8 text-gray-500 dark:text-gray-400">No project data found.</div>
    );
  }

  return (
    <div className="mt-4 w-full">
      {/* Filter buttons */}
      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        {filterOptions.map((opt) => (
          <button
            key={opt.key}
            className={`px-4 py-2 rounded-full border font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm
              ${filter === opt.key ? "bg-blue-600 text-white border-blue-600" : "bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-300 border-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900"}`}
            onClick={() => setFilter(opt.key)}
          >
            {opt.label}
          </button>
        ))}
      </div>
      <EmblaCarousel>
        {filteredData.map((row, idx) => {
          const projectId = row.id || row.ID || row._id || idx;
          return (
            <div
              key={idx}
              className="embla__slide min-w-0 flex-shrink-0 w-full sm:w-[420px] px-4 py-4"
            >
              <a
                href={`/project/${projectId}`}
                className="block h-full"
                tabIndex={0}
                style={{ textDecoration: 'none' }}
              >
                <div
                  className="relative bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:via-black dark:to-gray-900 rounded-3xl shadow-xl hover:shadow-2xl p-8 flex flex-col items-start border-2 border-blue-100 dark:border-blue-900/50 transition-all duration-500 h-[600px] overflow-hidden group hover:border-blue-400 dark:hover:border-blue-500 cursor-pointer hover:scale-[1.02] hover:-translate-y-2"
                >
                  {/* Decorative gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-white/30 dark:from-blue-950/30 dark:via-transparent dark:to-blue-900/20 pointer-events-none rounded-3xl"></div>
                  
                  {/* Glowing effect on hover */}
                  <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-r from-blue-500/10 via-blue-400/10 to-blue-600/10 dark:from-blue-400/20 dark:via-blue-300/20 dark:to-blue-500/20"></div>
                  
                  {/* Image at top with enhanced styling */}
                  {row.image && (
                    <div className="relative z-10 w-full mb-5 rounded-2xl overflow-hidden shadow-2xl border-2 border-blue-100 dark:border-blue-800/50 bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 p-2 group-hover:shadow-blue-500/30 dark:group-hover:shadow-blue-400/30 transition-all duration-500" style={{height: 'auto', maxHeight: '320px'}}>
                      <div className="w-full h-full flex justify-center items-center bg-white dark:bg-black rounded-xl overflow-hidden">
                        <img
                          src={row.image}
                          alt={row.name || `Project ${idx + 1}`}
                          className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                    </div>
                  )}
                  
                  {/* Name with gradient text */}
                  <h3 className="relative z-10 text-xl xs:text-2xl sm:text-3xl font-black mb-2 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 dark:from-blue-400 dark:via-blue-300 dark:to-blue-200 bg-clip-text text-transparent drop-shadow-sm self-start text-left w-full group-hover:from-blue-500 group-hover:to-blue-700 dark:group-hover:from-blue-300 dark:group-hover:to-blue-100 transition-all duration-500">
                    {row.name || row.Title || row.title || `Project ${idx + 1}`}
                  </h3>
                  
                  {/* Date with icon */}
                  {row.date && (
                    <div className="relative z-10 flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 italic mb-3 self-start text-left w-full">
                      <svg className="w-4 h-4 text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="font-medium">{formatDate(row.date)}</span>
                    </div>
                  )}
                  
                  {/* Details with better contrast */}
                  <div className="relative z-10 text-gray-700 dark:text-gray-300 mb-3 text-sm xs:text-base w-full flex-1 self-start text-left leading-relaxed line-clamp-6">
                    {row.details}
                  </div>
                  
                  {/* Section label with badge style */}
                  {row.section && sectionMap[row.section as keyof typeof sectionMap] && (
                    <div className="relative z-10 inline-flex items-center gap-2 px-3 py-1.5 mb-3 bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 text-white text-xs font-bold rounded-full shadow-md self-start">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                      {sectionMap[row.section as keyof typeof sectionMap]}
                    </div>
                  )}
                  
                  {/* Show More button with text only */}
                  <div className="relative z-10 mt-auto flex justify-start w-full">
                    <span className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold transition-all duration-300 group-hover:gap-3">
                      <span>Explore Project</span>
                      <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </div>
                  
                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-transparent dark:from-blue-500/10 rounded-bl-full pointer-events-none"></div>
                </div>
              </a>
            </div>
          );
        })}
      </EmblaCarousel>
      <div className="block sm:hidden w-full text-center mt-2 text-blue-600 dark:text-blue-300 text-sm font-medium">
        Swipe right to see more projects
      </div>
    </div>
  );
}
