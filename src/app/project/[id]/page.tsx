"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function ProjectDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const id = params && typeof params === "object" && "id" in params ? params["id"] : undefined;
  const [project, setProject] = useState<Record<string, string | number | undefined> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  function formatDate(value: string | number | undefined) {
    if (!value) return "";
    let dateObj: Date;
    if (typeof value === "number") {
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

  useEffect(() => {
    if (!id) return;
    fetch("/api/sheet")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find(
          (row: Record<string, string | number | undefined>, idx: number) =>
            row.id == id || row.ID == id || row._id == id || String(idx) === id
        );
        setProject(found);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load project details.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-black dark:via-gray-900 dark:to-blue-950">
      <div className="flex items-center justify-center mb-6">
        <span className="inline-block w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin shadow-lg"></span>
      </div>
      <div className="text-xl font-bold text-blue-600 dark:text-blue-400 animate-fadeInUp tracking-wide">Loading project details...</div>
    </div>
  );
  if (error) return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-black dark:via-gray-900 dark:to-blue-950 flex items-center justify-center">
      <div className="p-8 text-center bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border-2 border-red-200 dark:border-red-800">
        <div className="text-red-500 text-lg font-semibold">{error}</div>
      </div>
    </div>
  );
  if (!project) return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-black dark:via-gray-900 dark:to-blue-950 flex items-center justify-center">
      <div className="p-8 text-center bg-white dark:bg-gray-900 rounded-2xl shadow-2xl">
        <div className="text-gray-700 dark:text-gray-200 text-lg font-semibold">Project not found.</div>
      </div>
    </div>
  );

  const galleryImages: string[] = Array.isArray(project.gallery)
    ? project.gallery
    : typeof project.gallery === "string"
    ? project.gallery.split(",").map((url: string) => url.trim())
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-black dark:via-gray-900 dark:to-blue-950 py-12 px-4 flex flex-col items-center relative overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 dark:bg-blue-900 rounded-full blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300 dark:bg-blue-800 rounded-full blur-3xl opacity-20 translate-x-1/2 translate-y-1/2"></div>
      
      {/* Back button */}
      <div className="w-full max-w-6xl flex items-center mb-8 relative z-10">
        <button
          type="button"
          className="group flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 border-blue-200 dark:border-blue-800"
          onClick={() => {
            router.push('/#projects');
            setTimeout(() => {
              if (typeof window !== 'undefined') {
                const el = document.getElementById('projects');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }, 100);
          }}
        >
          <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Projects
        </button>
      </div>

      {/* Title with Enhanced Styling */}
      <div className="relative z-10 mb-8">
        <h1 className="text-3xl md:text-4xl font-black text-center bg-gradient-to-r from-blue-600 via-blue-700 to-blue-900 dark:from-blue-400 dark:via-blue-300 dark:to-blue-200 bg-clip-text text-transparent drop-shadow-2xl mb-3 animate-fadeInUp">
          {project.name || project.Title || project.title}
        </h1>
        <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-blue-700 dark:from-blue-400 dark:to-blue-300 mx-auto rounded-full shadow-lg"></div>
      </div>

      {/* Hero Image with Enhanced Shadow and Border */}
      {project.image && (
        <div className="w-full max-w-2xl relative z-10 mb-10 group">
          <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800 bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 p-3 transition-all duration-500 hover:shadow-blue-500/50 dark:hover:shadow-blue-400/30 hover:scale-[1.02]">
            <div className="rounded-2xl overflow-hidden bg-white dark:bg-gray-900" style={{height: 'auto', maxHeight: '360px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <img
                src={typeof project.image === 'string' ? project.image : ''}
                alt={typeof project.name === 'string' ? project.name : typeof project.Title === 'string' ? project.Title : typeof project.title === 'string' ? project.title : ''}
                className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      )}

      {/* Overview Section with Card */}
      {project.details && (
        <div className="w-full max-w-4xl relative z-10 mb-12">
          <div className="bg-white dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border-2 border-blue-100 dark:border-blue-900/50 hover:shadow-2xl transition-all duration-300">
            <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-4 flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Project Overview
            </h2>
            <div className="relative">
              <div className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed max-h-60 overflow-auto break-words whitespace-pre-line overview-scroll">
                {project.details}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Card with Enhanced Design */}
      <div className="w-full max-w-6xl relative z-10 bg-white dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-2xl border-2 border-blue-100 dark:border-blue-900/50 p-10 hover:shadow-blue-500/20 dark:hover:shadow-blue-400/20 transition-all duration-500">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          
          {/* Left Column with Enhanced Cards */}
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-2xl p-6 shadow-lg border-2 border-blue-100 dark:border-blue-900/50 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
              <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-4 flex items-center gap-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Details
              </h2>
              <div className="relative">
                <div className="text-gray-700 dark:text-gray-200 leading-relaxed max-h-60 overflow-auto break-words whitespace-pre-line overview-scroll">
                  {project.overview || project.details || "No overview available."}
                </div>
              </div>
            </div>

            {project.sources && (
              <div className="bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 shadow-lg border-2 border-blue-100 dark:border-blue-900/50 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-4 flex items-center gap-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  Sources
                </h2>
                {typeof project.sources === "string" && project.sources.startsWith("http") ? (
                  <a href={project.sources} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline break-all font-medium transition-colors">{project.sources}</a>
                ) : Array.isArray(project.sources) ? (
                  <ul className="list-disc list-inside text-gray-700 dark:text-gray-200 space-y-2">
                    {project.sources.map((src: string, i: number) => (
                      <li key={i}><a href={src} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline break-all font-medium transition-colors">{src}</a></li>
                    ))}
                  </ul>
                ) : null}
              </div>
            )}
          </div>

          {/* Right Column with Enhanced Cards */}
          <div className="space-y-8">
            {project.date && (
              <div className="bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-2xl p-6 shadow-lg border-2 border-blue-100 dark:border-blue-900/50 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-3 flex items-center gap-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Date
                </h2>
                <p className="text-gray-700 dark:text-gray-200 text-lg font-medium">{formatDate(project.date)}</p>
              </div>
            )}
            {project.memberCount && (
              <div className="bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 shadow-lg border-2 border-blue-100 dark:border-blue-900/50 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-3 flex items-center gap-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Team Size
                </h2>
                <p className="text-gray-700 dark:text-gray-200 text-lg font-medium">{project.memberCount} Members</p>
              </div>
            )}
            {project.technologies && (
              <div className="bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-2xl p-6 shadow-lg border-2 border-blue-100 dark:border-blue-900/50 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-4 flex items-center gap-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  Technologies
                </h2>
                <div className="flex flex-wrap gap-3">
                  {(Array.isArray(project.technologies)
                    ? project.technologies
                    : typeof project.technologies === "string"
                      ? project.technologies.split(",").map((t: string) => t.trim())
                      : []).map((tech: string, i: number) => (
                        <span key={i} className="bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">{tech}</span>
                  ))}
                </div>
              </div>
            )}
            {project.features && (
              <div className="bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 shadow-lg border-2 border-blue-100 dark:border-blue-900/50 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-4 flex items-center gap-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Key Features
                </h2>
                <div className="flex flex-wrap gap-3">
                  {(Array.isArray(project.features)
                    ? project.features
                    : typeof project.features === "string"
                      ? project.features.split(",").map((f: string) => f.trim())
                      : []).map((feature: string, i: number) => (
                        <span key={i} className="bg-gradient-to-r from-blue-400 to-blue-500 dark:from-blue-500 dark:to-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">{feature}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Gallery Section with Enhanced Design */}
        {galleryImages.length > 0 && (
          <div className="mt-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-black text-blue-700 dark:text-blue-300 mb-3 flex items-center justify-center gap-3">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Project Gallery
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-blue-700 dark:from-blue-400 dark:to-blue-300 mx-auto rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryImages.map((img, idx) => (
                <div key={idx} className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 border-4 border-white dark:border-gray-800 bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-700/20 dark:from-blue-400/20 dark:to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                  <img
                    src={img}
                    alt={`Gallery image ${idx + 1}`}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-20">
                    <p className="text-white font-semibold text-sm">Image {idx + 1}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
