"use client";

const MAX_CHARS = 50_000;

interface TextInputProps {
  value: string;
  onChange: (text: string) => void;
  disabled: boolean;
}

export function TextInput({ value, onChange, disabled }: TextInputProps) {
  const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0;
  const charCount = value.length;
  const isMinimumMet = wordCount >= 50;

  const charColour =
    charCount >= MAX_CHARS
      ? "text-red-400"
      : charCount > 45_000
        ? "text-amber-400"
        : "";

  return (
    <div className="relative">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        maxLength={MAX_CHARS}
        placeholder="Paste your text here to analyse..."
        rows={10}
        className={`
          w-full resize-y rounded-xl border border-neutral-200 bg-neutral-50
          dark:border-neutral-800 dark:bg-neutral-900
          px-5 py-4 text-base leading-relaxed text-neutral-900 dark:text-neutral-100
          placeholder:text-neutral-400 dark:placeholder:text-neutral-500
          focus:border-neutral-400 dark:focus:border-neutral-600 focus:outline-none focus:ring-1 focus:ring-neutral-400 dark:focus:ring-neutral-600
          disabled:cursor-not-allowed disabled:opacity-50
          transition-all duration-300
          [scrollbar-color:theme(color.neutral.300)_transparent]
          dark:[scrollbar-color:theme(color.neutral.700)_transparent]
        `}
      />
      <div className="mt-3 flex items-center justify-between text-sm">
        <div className="flex items-center gap-4 text-neutral-500">
          <span>
            <span
              className={`
                tabular-nums transition-colors duration-200
                ${wordCount > 0 ? "text-neutral-700 dark:text-neutral-300" : ""}
              `}
            >
              {wordCount.toLocaleString()}
            </span>{" "}
            words
          </span>
          <span className={charColour}>
            <span className="tabular-nums">{charCount.toLocaleString()}</span>
            {" / "}
            <span className="tabular-nums">{MAX_CHARS.toLocaleString()}</span>
          </span>
        </div>
        {wordCount > 0 && !isMinimumMet && (
          <span className="text-amber-400/80 transition-opacity duration-200">
            Minimum 50 words needed
          </span>
        )}
      </div>
    </div>
  );
}
