"use client";

import { useState } from "react";

type VideoCategory = "Claims" | "Searching" | "Asset holders";

export type DIYVideo = {
  id: string;
  title: string;
  category: VideoCategory;
};

const filters = ["All videos", "Claims", "Searching", "Asset holders"] as const;
type VideoFilter = (typeof filters)[number];

const categoryStyles: Record<VideoCategory, string> = {
  Claims: "bg-ledger-50 text-ledger-800",
  Searching: "bg-ochre-soft text-ledger-900",
  "Asset holders": "bg-sage-soft text-sage",
};

export function DIYVideoGrid({ videos }: { videos: DIYVideo[] }) {
  const [filter, setFilter] = useState<VideoFilter>("All videos");
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const visibleVideos =
    filter === "All videos" ? videos : videos.filter((video) => video.category === filter);

  function selectFilter(nextFilter: VideoFilter) {
    setFilter(nextFilter);
    setActiveVideoId(null);
  }

  return (
    <>
      <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-ledger-700">UFAA video guides</p>
          <h2 className="mt-1 font-serif text-2xl font-bold text-ledger-900">Find the guide you need</h2>
        </div>
        <p className="text-sm font-medium text-muted" aria-live="polite">
          Showing {visibleVideos.length} {visibleVideos.length === 1 ? "video" : "videos"}
        </p>
      </div>

      <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter video guides">
        {filters.map((option) => {
          const isSelected = filter === option;
          return (
            <button
              key={option}
              type="button"
              onClick={() => selectFilter(option)}
              aria-pressed={isSelected}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ochre ${
                isSelected
                  ? "border-ledger-900 bg-ledger-900 text-white shadow-sm"
                  : "border-line bg-white text-ledger-900 hover:-translate-y-0.5 hover:border-ledger-700 hover:bg-ledger-50"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>

      <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {visibleVideos.map((video, index) => {
          const isPlaying = activeVideoId === video.id;

          return (
            <li
              key={video.id}
              className="video-card-enter"
              style={{ animationDelay: `${index * 65}ms` }}
            >
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-[0_8px_24px_rgba(16,23,68,0.06)] transition duration-300 hover:-translate-y-1 hover:border-ledger-900/20 hover:shadow-[0_18px_38px_rgba(16,23,68,0.13)]">
                <div className="relative aspect-video overflow-hidden bg-ledger-950">
                  {isPlaying ? (
                    <iframe
                      key={video.id}
                      src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1`}
                      title={video.title}
                      referrerPolicy="strict-origin-when-cross-origin"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                      allowFullScreen
                      className="video-player-enter size-full"
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={() => setActiveVideoId(video.id)}
                      aria-label={`Play video: ${video.title}`}
                      className="group/play absolute inset-0 flex size-full items-center justify-center overflow-hidden text-white focus-visible:outline-4 focus-visible:outline-offset-[-4px] focus-visible:outline-ochre"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
                        alt=""
                        loading="lazy"
                        className="absolute inset-0 size-full object-cover transition-transform duration-500 ease-out group-hover/play:scale-105"
                      />
                      <span className="absolute inset-0 bg-gradient-to-t from-ledger-950/75 via-ledger-950/10 to-ledger-950/15 transition-colors duration-300 group-hover/play:from-ledger-950/85 group-hover/play:via-ledger-950/25" />
                      <span className="relative flex size-16 items-center justify-center rounded-full bg-[#d7193f] shadow-lg ring-4 ring-white/25 transition duration-300 group-hover/play:scale-110 group-hover/play:bg-[#bd1234] group-hover/play:ring-white/45 group-active/play:scale-95">
                        <svg aria-hidden="true" viewBox="0 0 24 24" className="ml-1 size-7 fill-current">
                          <path d="M7 4.8v14.4a.8.8 0 0 0 1.2.7l11-7.2a.8.8 0 0 0 0-1.4l-11-7.2A.8.8 0 0 0 7 4.8Z" />
                        </svg>
                      </span>
                      <span className="absolute bottom-3 left-4 text-xs font-semibold tracking-wide text-white/90">
                        PLAY VIDEO
                      </span>
                    </button>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${categoryStyles[video.category]}`}>
                      {video.category}
                    </span>
                    <span className="font-mono text-xs font-semibold text-muted/70">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg font-bold leading-snug text-ledger-900 transition-colors duration-200 group-hover:text-ledger-700">
                    {video.title}
                  </h3>
                  <div className="mt-auto flex items-center justify-between gap-3 pt-5">
                    {isPlaying ? (
                      <button
                        type="button"
                        onClick={() => setActiveVideoId(null)}
                        className="inline-flex items-center gap-2 rounded-full bg-ledger-50 px-3.5 py-2 text-sm font-semibold text-ledger-900 transition hover:bg-ledger-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ochre"
                      >
                        <svg aria-hidden="true" viewBox="0 0 16 16" className="size-4 fill-current">
                          <path d="M4 3.5h3v9H4zm5 0h3v9H9z" />
                        </svg>
                        Close video
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setActiveVideoId(video.id)}
                        className="inline-flex items-center gap-2 rounded-full bg-ledger-900 px-3.5 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-ledger-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ochre"
                      >
                        Play video
                        <svg aria-hidden="true" viewBox="0 0 16 16" className="size-4 fill-current">
                          <path d="M5 3.5v9l7-4.5-7-4.5Z" />
                        </svg>
                      </button>
                    )}
                    <a
                      href={`https://youtu.be/${video.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-ledger-800 underline decoration-ledger-300 underline-offset-4 transition-colors hover:text-ledger-950 hover:decoration-ledger-800"
                    >
                      YouTube
                    </a>
                  </div>
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    </>
  );
}
