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
    <div className="flex flex-col items-center justify-center min-h-[40vh]">
      <div className="flex items-center justify-center mb-4">
        <span className="inline-block w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></span>
      </div>
      <div className="text-lg font-semibold text-blue-700 dark:text-blue-300 animate-fadeInUp">Loading project details...</div>
    </div>
  );
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!project) return <div className="p-8 text-center text-gray-700 dark:text-gray-200">Project not found.</div>;

  const galleryImages: string[] = Array.isArray(project.gallery)
    ? project.gallery
    : typeof project.gallery === "string"
    ? project.gallery.split(",").map((url: string) => url.trim())
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-100 dark:from-black dark:via-gray-900 dark:to-gray-900 py-10 px-4 flex flex-col items-center">
      
      {/* Back button */}
      <div className="w-full max-w-5xl flex items-center mb-6">
        <button
          type="button"
          className="text-blue-700 dark:text-blue-400 hover:underline flex items-center gap-1 font-medium"
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
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
      </div>

      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-center text-blue-800 dark:text-blue-300 drop-shadow-lg mb-8">
        {project.name || project.Title || project.title}
      </h1>

      {/* Hero Image */}
      {project.image && (
        <div className="w-full max-w-3xl flex justify-center items-center rounded-3xl overflow-hidden shadow-xl mb-8 border border-gray-200 dark:border-gray-700" style={{height: 'auto', maxHeight: '480px'}}>
          <img
            src={typeof project.image === 'string' ? project.image : ''}
            alt={typeof project.name === 'string' ? project.name : typeof project.Title === 'string' ? project.Title : typeof project.title === 'string' ? project.title : ''}
            className="max-w-full max-h-full object-contain transition-transform duration-300 hover:scale-105"
            style={{borderRadius: '1.5rem'}}
          />
        </div>
      )}

      {/* Overview */}
      {project.details && (
  <div className="max-w-3xl text-center text-gray-800 dark:text-gray-300 text-lg mb-10 max-h-60 overflow-auto break-words whitespace-pre-line overview-scroll">
          {project.details}
        </div>
      )}

      {/* Main Card */}
      <div className="w-full max-w-5xl bg-white dark:bg-gray-900/80 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
          
          {/* Left Column */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-blue-700 dark:text-blue-300 mb-2">Overview</h2>
              <div className="text-gray-700 dark:text-gray-200 max-h-60 overflow-auto break-words whitespace-pre-line overview-scroll">
                {project.overview || project.details || "No overview available."}
              </div>
            </div>

            {project.sources && (
              <div>
                <h2 className="text-xl font-semibold text-blue-700 dark:text-blue-300 mb-2">Sources</h2>
                {typeof project.sources === "string" && project.sources.startsWith("http") ? (
                  <a href={project.sources} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline break-all">{project.sources}</a>
                ) : Array.isArray(project.sources) ? (
                  <ul className="list-disc list-inside text-gray-700 dark:text-gray-200">
                    {project.sources.map((src: string, i: number) => (
                      <li key={i}><a href={src} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline break-all">{src}</a></li>
                    ))}
                  </ul>
                ) : null}
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-6 text-gray-800 dark:text-gray-200">
            {project.date && (
              <div>
                <h2 className="text-xl font-semibold text-blue-700 dark:text-blue-300 mb-2">Date</h2>
                <p>{formatDate(project.date)}</p>
              </div>
            )}
            {project.memberCount && (
              <div>
                <h2 className="text-xl font-semibold text-blue-700 dark:text-blue-300 mb-2">Members</h2>
                <p>{project.memberCount}</p>
              </div>
            )}
            {project.technologies && (
              <div>
                <h2 className="text-xl font-semibold text-blue-700 dark:text-blue-300 mb-2">Technologies</h2>
                <div className="flex flex-wrap gap-2">
                  {(Array.isArray(project.technologies)
                    ? project.technologies
                    : typeof project.technologies === "string"
                      ? project.technologies.split(",").map((t: string) => t.trim())
                      : []).map((tech: string, i: number) => (
                        <span key={i} className="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">{tech}</span>
                  ))}
                </div>
              </div>
            )}
            {project.features && (
              <div>
                <h2 className="text-xl font-semibold text-blue-700 dark:text-blue-300 mb-2">Features</h2>
                <div className="flex flex-wrap gap-2">
                  {(Array.isArray(project.features)
                    ? project.features
                    : typeof project.features === "string"
                      ? project.features.split(",").map((f: string) => f.trim())
                      : []).map((feature: string, i: number) => (
                        <span key={i} className="bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm font-medium">{feature}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Gallery */}
        {galleryImages.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-center text-blue-700 dark:text-blue-300">Gallery</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {galleryImages.map((img, idx) => (
                <div key={idx} className="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg bg-gray-50 dark:bg-gray-900 group">
                  <img
                    src={img}
                    alt={`Gallery image ${idx + 1}`}
                    className="w-full h-52 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
