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

  function getText(value: string | number | undefined) {
    if (value === undefined || value === null) return "";
    return String(value).trim();
  }

  function splitList(value: string | number | undefined) {
    return getText(value)
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  function isVideo(url: string) {
    return /\.(mp4|webm|ogg)(\?|$)/i.test(url);
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
    ? project.gallery.split(",").map((url: string) => url.trim()).filter(Boolean)
    : [];
  const projectTitle = getText(project.name || project.Title || project.title) || "Project Details";
  const teamSize = getText(project.memberCount || project["member count"]).split(",")[0];
  const technologies = splitList(project.technologies);
  const features = splitList(project.features);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 text-gray-950 dark:bg-gray-950 dark:text-white sm:px-6">
      <div className="w-full max-w-6xl flex items-center mb-8 relative z-10">
        <button
          type="button"
          className="group inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-blue-600 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md dark:border-gray-800 dark:bg-gray-900 dark:text-blue-300 dark:hover:border-blue-700"
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

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <section className="grid items-stretch gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]">
          <div className="flex flex-col justify-center rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-8">
            <div className="mb-4 inline-flex w-fit rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:border-blue-900/60 dark:bg-blue-950/50 dark:text-blue-300">
              Project Details
            </div>
            <h1 className="text-3xl font-black leading-tight text-gray-950 dark:text-white sm:text-4xl md:text-5xl">
              {projectTitle}
            </h1>
            {project.details && (
              <p className="mt-5 whitespace-pre-line text-base leading-7 text-gray-700 dark:text-gray-300 sm:text-lg">
                {project.details}
              </p>
            )}
            <div className="mt-6 flex flex-wrap gap-3">
              {project.date && (
                <span className="rounded-full bg-gray-100 px-3 py-1.5 text-sm font-semibold text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                  {formatDate(project.date)}
                </span>
              )}
              {teamSize && (
                <span className="rounded-full bg-gray-100 px-3 py-1.5 text-sm font-semibold text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                  {teamSize} {teamSize === "1" ? "Member" : "Members"}
                </span>
              )}
            </div>
          </div>

          {project.image && (
            <div className="rounded-3xl border border-gray-200 bg-white p-3 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <div className="flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-2xl bg-gray-100 dark:bg-black">
                <img
                  src={getText(project.image)}
                  alt={projectTitle}
                  className="h-full w-full object-contain p-2 transition-transform duration-500 hover:scale-[1.02]"
                />
              </div>
            </div>
          )}
        </section>

        <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-7">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className="space-y-8">
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5 transition-all duration-300 hover:border-blue-200 dark:border-gray-800 dark:bg-gray-950 dark:hover:border-blue-900">
              <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-blue-700 dark:text-blue-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Details
              </h2>
                <div className="max-h-72 overflow-auto whitespace-pre-line break-words pr-2 leading-7 text-gray-700 overview-scroll dark:text-gray-200">
                  {project.overview || project.details || "No overview available."}
                </div>
            </div>

            {project.sources && (
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5 transition-all duration-300 hover:border-blue-200 dark:border-gray-800 dark:bg-gray-950 dark:hover:border-blue-900">
                <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-blue-700 dark:text-blue-300">
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

          <div className="space-y-8">
            {technologies.length > 0 && (
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5 transition-all duration-300 hover:border-blue-200 dark:border-gray-800 dark:bg-gray-950 dark:hover:border-blue-900">
                <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-blue-700 dark:text-blue-300">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  Technologies
                </h2>
                <div className="flex flex-wrap gap-3">
                  {technologies.map((tech, i) => (
                        <span key={i} className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700">{tech}</span>
                  ))}
                </div>
              </div>
            )}
            {features.length > 0 && (
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5 transition-all duration-300 hover:border-blue-200 dark:border-gray-800 dark:bg-gray-950 dark:hover:border-blue-900">
                <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-blue-700 dark:text-blue-300">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Key Features
                </h2>
                <div className="flex flex-wrap gap-3">
                  {features.map((feature, i) => (
                        <span key={i} className="rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-300 dark:border-blue-900 dark:bg-gray-900 dark:text-blue-300">{feature}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        </section>

        {galleryImages.length > 0 && (
          <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-7">
            <div className="mb-8 text-center">
              <h2 className="mb-3 flex items-center justify-center gap-3 text-3xl font-black text-gray-950 dark:text-white">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Project Gallery
              </h2>
              <div className="mx-auto h-1 w-24 rounded-full bg-blue-600"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryImages.map((img, idx) => (
                <div key={idx} className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900 dark:hover:border-blue-800">
                  <div className="flex aspect-[4/3] w-full items-center justify-center overflow-hidden bg-white dark:bg-gray-900">
                    {isVideo(img) ? (
                      <video
                        src={img}
                        controls
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <img
                        src={img}
                        alt={`Gallery image ${idx + 1}`}
                        className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
