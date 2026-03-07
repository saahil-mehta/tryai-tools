"use client";

import { useEffect, useState } from "react";

const upcomingTools = [
  {
    name: "Paraphraser",
    description: "Rewrite any text in a different tone or style, instantly.",
  },
  {
    name: "Universal Converter",
    description:
      "Convert any document into any format or size. PDF, DOCX, PNG, you name it.",
  },
  {
    name: "Resume Humaniser",
    description:
      "Turn AI-written CVs into natural, human-sounding copy. Powered by custom-trained models.",
  },
  {
    name: "Mortgage & Stamp Duty Calculator",
    description:
      "Rates, repayments, and stamp duty for the UK, US, and EU in one place.",
  },
  {
    name: "Salary Tax Calculator",
    description:
      "Take-home pay after tax for every UK, US, and EU bracket. Updated for 2026.",
  },
  {
    name: "JSON Formatter",
    description: "Paste messy JSON, get clean pretty-printed output.",
  },
  {
    name: "Translator",
    description: "Translate text between 100+ languages, powered by AI.",
  },
  {
    name: "Joke Generator",
    description: "AI-powered jokes on any topic. Some actually funny.",
  },
  {
    name: "Comeback Generator",
    description:
      "Need a witty reply? Paste what they said, get a sharp response back.",
  },
];

const ITEM_HEIGHT = 40;

export function UpcomingTools() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % upcomingTools.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rounded-lg border border-neutral-200 dark:border-neutral-700 px-5 py-3 feature-expand-glow">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0 flex-1" style={{ height: ITEM_HEIGHT }}>
          <div className="overflow-hidden" style={{ height: ITEM_HEIGHT }}>
            <div
              className="transition-transform duration-500 ease-in-out"
              style={{ transform: `translateY(-${index * ITEM_HEIGHT}px)` }}
            >
              {upcomingTools.map((tool) => (
                <div
                  key={tool.name}
                  className="flex flex-col justify-center"
                  style={{ height: ITEM_HEIGHT }}
                >
                  <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                    {tool.name}
                  </span>
                  <span className="text-xs text-neutral-400 dark:text-neutral-500 truncate">
                    {tool.description}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <span className="text-xs text-neutral-400 dark:text-neutral-500 tabular-nums shrink-0">
          {index + 1}/{upcomingTools.length}
        </span>
      </div>
    </div>
  );
}
