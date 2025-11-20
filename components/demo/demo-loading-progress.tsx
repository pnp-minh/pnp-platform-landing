"use client";

import { useEffect, useState } from "react";

interface DemoLoadingProgressProps {
  onComplete?: () => void;
}

const STEPS = [
  {
    id: 1,
    label: "Crawling website",
    sublabel: "Fetching your brand's homepage...",
    duration: 5000,
  },
  {
    id: 2,
    label: "Extracting brand intelligence",
    sublabel: "Analyzing colors, fonts, and visual identity...",
    duration: 8000,
  },
  {
    id: 3,
    label: "Generating insights",
    sublabel: "Understanding your brand positioning...",
    duration: 7000,
  },
];

export function DemoLoadingProgress({ onComplete }: DemoLoadingProgressProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (currentStep >= STEPS.length) {
      // All steps complete
      if (onComplete) {
        setTimeout(onComplete, 500);
      }
      return;
    }

    const step = STEPS[currentStep];
    const startTime = Date.now();

    // Animate progress bar
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const stepProgress = Math.min((elapsed / step.duration) * 100, 100);
      setProgress(stepProgress);

      if (stepProgress >= 100) {
        clearInterval(progressInterval);
        // Move to next step after a brief pause
        setTimeout(() => {
          setCurrentStep((prev) => prev + 1);
          setProgress(0);
        }, 300);
      }
    }, 50);

    return () => clearInterval(progressInterval);
  }, [currentStep, onComplete]);

  return (
    <div className="flex h-[calc(100vh-68px)] items-center justify-center overflow-hidden bg-white px-5">
      <div className="w-full max-w-[600px]">
        {/* Overall Progress */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-2xl font-semibold leading-tight tracking-[-1.2px] text-black md:text-3xl">
            Preparing Your Demo
          </h2>
          <p className="text-sm text-gray-11 md:text-base">
            This will take about 20 seconds
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-8">
          {STEPS.map((step, index) => {
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            const opacity = isActive
              ? "opacity-100"
              : isCompleted
                ? "opacity-60"
                : "opacity-30";

            return (
              <div
                key={step.id}
                className={`transition-opacity duration-500 ${opacity}`}
              >
                <div className="flex items-start gap-4">
                  {/* Status Indicator */}
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${
                      isActive
                        ? "bg-primary/10 scale-110"
                        : isCompleted
                          ? "bg-primary/20"
                          : "bg-gray-2"
                    }`}
                  >
                    <div
                      className={`h-3 w-3 rounded-full transition-all duration-300 ${
                        isActive
                          ? "bg-primary animate-pulse"
                          : isCompleted
                            ? "bg-primary"
                            : "bg-gray-7"
                      }`}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="mb-2 flex items-center justify-between">
                      <h3
                        className={`text-base font-semibold md:text-lg ${
                          isActive ? "text-black" : "text-gray-11"
                        }`}
                      >
                        {step.label}
                      </h3>
                      {isActive && (
                        <span className="text-sm font-medium text-primary">
                          {Math.round(progress)}%
                        </span>
                      )}
                    </div>
                    <p className="mb-3 text-sm text-gray-11">
                      {step.sublabel}
                    </p>

                    {/* Progress Bar */}
                    {isActive && (
                      <div className="h-2 overflow-hidden rounded-full bg-gray-3">
                        <div
                          className="h-full rounded-full bg-primary transition-all duration-300 ease-out"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
