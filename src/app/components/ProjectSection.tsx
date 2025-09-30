"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
// Custom skeleton card matching the provided HTML/CSS demo
function ProjectCardGridSkeleton() {
  return (
  <div className="embla__slide min-w-0 flex-shrink-0 w-full xs:w-[90vw] sm:w-[420px] px-2" style={{ maxWidth: 420 }}>
      <div className="bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-[#23272f] dark:via-[#23272f] dark:to-[#23272f] rounded-2xl shadow-2xl p-7 flex flex-col items-start border border-gray-200 dark:border-gray-800 h-[480px] sm:h-[520px] relative overflow-hidden animate-pulse">
        {/* Single image skeleton */}
        <div className="w-full h-48 rounded-xl bg-[#404040] dark:bg-gray-700 mb-4"></div>
        {/* Title skeleton */}
        <div className="h-7 w-3/4 bg-[#404040] dark:bg-gray-700 rounded mb-2"></div>
        {/* Date skeleton */}
        <div className="h-4 w-1/3 bg-[#404040] dark:bg-gray-700 rounded mb-3"></div>
        {/* Details skeleton */}
        <div className="space-y-2 w-full flex-1">
          <div className="h-4 w-[95%] bg-[#404040] dark:bg-gray-700 rounded"></div>
          <div className="h-4 w-[85%] bg-[#404040] dark:bg-gray-700 rounded"></div>
          <div className="h-4 w-[60%] bg-[#404040] dark:bg-gray-700 rounded"></div>
        </div>
        {/* Show More / Arrow Skeleton */}
        <div className="mt-auto flex justify-start w-full">
          <div className="h-6 w-20 bg-[#404040] dark:bg-gray-700 rounded"></div>
        </div>
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
              className="embla__slide min-w-0 flex-shrink-0 w-full sm:w-[420px] px-2"
            >
              <a
                href={`/project/${projectId}`}
                className="block h-full"
                tabIndex={0}
                style={{ textDecoration: 'none' }}
              >
                <div
                  className="bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-[#23272f] dark:via-[#23272f] dark:to-[#23272f] rounded-2xl shadow-2xl p-7 flex flex-col items-start border border-gray-200 dark:border-gray-800 transition-all duration-300 h-[600px] relative overflow-hidden group hover:border-blue-400 dark:hover:border-blue-300 cursor-pointer"
                >
                  {/* Image at top */}
                  {row.image && (
                    <div className="w-full mb-4 shadow-lg flex justify-center items-center" style={{height: 'auto', maxHeight: '320px'}}>
                      <img
                        src={row.image}
                        alt={row.name || `Project ${idx + 1}`}
                        className="max-w-full max-h-full object-contain"
                        style={{borderRadius: '1rem'}}
                      />
                    </div>
                  )}
                  {/* Name left-aligned */}
                  <h3 className="text-lg xs:text-xl sm:text-2xl font-bold mb-1 text-blue-700 dark:text-blue-300 drop-shadow-sm self-start text-left w-full">
                    {row.name || row.Title || row.title || `Project ${idx + 1}`}
                  </h3>
                  {/* Date left-aligned, below name */}
                  {row.date && (
                    <div className="text-xs text-gray-500 dark:text-gray-400 italic mb-2 self-start text-left w-full">
                      Date: {formatDate(row.date)}
                    </div>
                  )}
                  {/* Details left-aligned */}
                  <div className="text-gray-700 dark:text-gray-200 mb-3 text-sm xs:text-base w-full flex-1 self-start text-left">
                    {row.details}
                  </div>
                  {/* Section label */}
                  {row.section && sectionMap[row.section as keyof typeof sectionMap] && (
                    <div className="text-xs font-semibold text-blue-500 dark:text-blue-300 mb-2 self-start text-left w-full">
                      Section: {sectionMap[row.section as keyof typeof sectionMap]}
                    </div>
                  )}
                  {/* Arrow icon at bottom right */}
                  <div className="mt-auto flex justify-start w-full">
                    <span className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-300 font-semibold hover:underline focus:outline-none focus:underline transition-all duration-200">
                      Show More
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                  <div className="absolute inset-0 pointer-events-none rounded-2xl border-2 border-transparent group-hover:border-blue-300 transition-all duration-300"></div>
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
