"use client";

import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import type { LottieRefCurrentProps } from "lottie-react";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

function useDarkMode() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const html = document.documentElement;
    const update = () => setDark(html.classList.contains("dark"));
    update();
    const observer = new MutationObserver(update);
    observer.observe(html, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);
  return dark;
}

const FILTER_LIGHT = "brightness(0)";
const FILTER_DARK = "brightness(0) invert(1)";

function useLottieAnimation(src: string) {
  const [animationData, setAnimationData] = useState(null);
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const directionRef = useRef<1 | -1>(1);

  useEffect(() => {
    fetch(src)
      .then((res) => res.json())
      .then(setAnimationData)
      .catch(console.error);
  }, [src]);

  const handleComplete = () => {
    setTimeout(() => {
      directionRef.current = directionRef.current === 1 ? -1 : 1;
      lottieRef.current?.setDirection(directionRef.current);
      lottieRef.current?.play();
    }, 800);
  };

  return { animationData, lottieRef, handleComplete };
}

export function LottieFeature({
  src,
  title,
  description,
}: {
  src: string;
  title: string;
  description: string;
}) {
  const { animationData, lottieRef, handleComplete } = useLottieAnimation(src);
  const dark = useDarkMode();

  return (
    <div className="flex items-start gap-5">
      <div
        className="shrink-0"
        style={{ width: 56, height: 56, filter: dark ? FILTER_DARK : FILTER_LIGHT }}
      >
        {animationData && (
          <Lottie
            lottieRef={lottieRef}
            animationData={animationData}
            loop={false}
            autoplay={true}
            onComplete={handleComplete}
            style={{ width: 56, height: 56 }}
          />
        )}
      </div>
      <div>
        <h4 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
          {title}
        </h4>
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          {description}
        </p>
      </div>
    </div>
  );
}

export function LottieFeatureCompact({
  src,
  title,
  description,
}: {
  src: string;
  title: string;
  description?: string;
}) {
  const { animationData, lottieRef, handleComplete } = useLottieAnimation(src);
  const dark = useDarkMode();

  return (
    <div className="flex items-start gap-3 bg-white p-4 dark:bg-neutral-950">
      <div
        className="shrink-0 mt-0.5"
        style={{ width: 28, height: 28, filter: dark ? FILTER_DARK : FILTER_LIGHT }}
      >
        {animationData && (
          <Lottie
            lottieRef={lottieRef}
            animationData={animationData}
            loop={false}
            autoplay={true}
            onComplete={handleComplete}
            style={{ width: 28, height: 28 }}
          />
        )}
      </div>
      <div>
        <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
          {title}
        </span>
        {description && (
          <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

export function HowItWorksStep({
  step,
  lottieSrc,
  title,
  description,
}: {
  step: number;
  lottieSrc: string;
  title: string;
  description: string;
}) {
  const { animationData, lottieRef, handleComplete } =
    useLottieAnimation(lottieSrc);
  const dark = useDarkMode();

  return (
    <div className="flex items-center gap-5 bg-white p-5 dark:bg-neutral-950">
      <div
        className="shrink-0"
        style={{ width: 40, height: 40, filter: dark ? FILTER_DARK : FILTER_LIGHT }}
      >
        {animationData && (
          <Lottie
            lottieRef={lottieRef}
            animationData={animationData}
            loop={false}
            autoplay={true}
            onComplete={handleComplete}
            style={{ width: 40, height: 40 }}
          />
        )}
      </div>
      <div>
        <p className="text-xs font-medium uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
          Step {step}
        </p>
        <h3 className="mt-1.5 font-medium text-neutral-900 dark:text-neutral-100">
          {title}
        </h3>
        <p className="mt-1.5 text-sm text-neutral-500 dark:text-neutral-400">
          {description}
        </p>
      </div>
    </div>
  );
}
