"use client";

import { useEffect, useState } from "react";
import EmblaCarousel from "./EmblaCarousel";
// Custom skeleton card matching the enhanced design
function ProjectCardGridSkeleton() {
  return (
    <div className="embla__slide min-w-0 flex-shrink-0 w-full xs:w-[90vw] sm:w-[420px] px-4 py-4" style={{ maxWidth: 420 }}>
      <div className="relative h-[500px] overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-sm animate-pulse dark:border-gray-800 dark:bg-gray-950">
        <div className="mb-4 h-[210px] w-full rounded-xl border border-gray-100 bg-gray-100 p-2 dark:border-gray-800 dark:bg-gray-900">
          <div className="h-full w-full rounded-lg bg-gray-200 dark:bg-gray-800"></div>
        </div>
        <div className="mb-3 h-7 w-3/4 rounded-md bg-gray-200 dark:bg-gray-800"></div>
        <div className="mb-4 h-4 w-1/3 rounded bg-gray-100 dark:bg-gray-800"></div>
        <div className="mb-4 space-y-2">
          <div className="h-4 w-[95%] bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-4 w-[90%] bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-4 w-[85%] bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
        <div className="mb-4 h-7 w-40 rounded-full bg-blue-100 dark:bg-blue-950"></div>
        <div className="mt-auto h-5 w-36 rounded bg-blue-100 dark:bg-blue-950"></div>
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
      {filteredData.length === 0 ? (
        <div className="mx-auto flex min-h-[260px] w-full max-w-xl flex-col items-center justify-center rounded-2xl border border-dashed border-blue-200 bg-white/80 px-6 py-10 text-center shadow-sm dark:border-blue-900 dark:bg-gray-950/80">
          <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
            No projects in this category yet
          </h3>
          <p className="mb-5 text-sm leading-6 text-gray-500 dark:text-gray-400">
            Try another filter or view every project again.
          </p>
          <button
            type="button"
            onClick={() => setFilter("ALL")}
            className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Show all projects
          </button>
        </div>
      ) : (
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
                  className="group relative flex h-[500px] cursor-pointer flex-col items-start overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-500 ease-out hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-950/10 focus-within:border-blue-400 dark:border-gray-800 dark:bg-gray-950 dark:hover:border-blue-500 dark:hover:shadow-blue-500/10"
                >
                  <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-blue-300/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:via-blue-500/70"></div>

                  {row.image && (
                    <div className="mb-4 h-[210px] w-full flex-shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-gray-50 p-2 transition-colors duration-500 group-hover:border-blue-200 dark:border-gray-800 dark:bg-gray-900 dark:group-hover:border-blue-800">
                      <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-lg bg-white dark:bg-black">
                        <img
                          src={row.image}
                          alt={row.name || `Project ${idx + 1}`}
                          className="max-h-full max-w-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                        />
                      </div>
                    </div>
                  )}

                  <h3 className="mb-2 w-full self-start text-left text-xl font-bold leading-tight text-gray-950 transition-colors duration-500 group-hover:text-blue-700 xs:text-2xl dark:text-white dark:group-hover:text-blue-300">
                    {row.name || row.Title || row.title || `Project ${idx + 1}`}
                  </h3>

                  {row.date && (
                    <div className="mb-4 flex w-full items-center gap-2 self-start text-left text-xs font-medium text-gray-500 dark:text-gray-400">
                      <svg className="h-4 w-4 text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{formatDate(row.date)}</span>
                    </div>
                  )}

                  <div className="mb-4 w-full self-start overflow-hidden text-left text-sm leading-relaxed text-gray-700 line-clamp-4 dark:text-gray-300">
                    {row.details}
                  </div>

                  {row.section && sectionMap[row.section as keyof typeof sectionMap] && (
                    <div className="mb-4 inline-flex items-center gap-2 self-start rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 transition-colors duration-500 group-hover:border-blue-200 group-hover:bg-blue-100 dark:border-blue-900/60 dark:bg-blue-950/50 dark:text-blue-300 dark:group-hover:border-blue-800 dark:group-hover:bg-blue-950">
                      <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                      {sectionMap[row.section as keyof typeof sectionMap]}
                    </div>
                  )}

                  <div className="mt-auto flex w-full justify-start border-t border-gray-100 pt-4 dark:border-gray-800">
                    <span className="inline-flex items-center gap-2 font-semibold text-blue-600 transition-all duration-300 ease-out group-hover:gap-3 dark:text-blue-400">
                      <span>Show more</span>
                      <svg className="h-5 w-5 transition-transform duration-300 ease-out group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </div>
                </div>
              </a>
            </div>
          );
        })}
      </EmblaCarousel>
      )}
      <div className="block sm:hidden w-full text-center mt-2 text-blue-600 dark:text-blue-300 text-sm font-medium">
        Swipe right to see more projects
      </div>
    </div>
  );
}
