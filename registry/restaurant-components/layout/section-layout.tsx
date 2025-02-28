"use client";

import React from "react";
import { cn } from "@/lib/utils";

export type BackgroundStyle = "light" | "dark" | "accent" | "pattern" | "none";
export type Spacing = "compact" | "normal" | "spacious";

export interface SectionLayoutProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  background?: BackgroundStyle;
  spacing?: Spacing;
  withDivider?: boolean;
  decorativeElement?: "dots" | "wave" | "plate" | "none";
  decorativePosition?: "top" | "bottom" | "both" | "none";
}

/**
 * A restaurant-specific section layout component that provides consistent spacing,
 * theming, and decorative elements for restaurant website sections.
 */
export function RestaurantSectionLayout({
  children,
  className,
  id,
  background = "light",
  spacing = "normal",
  withDivider = false,
  decorativeElement = "none",
  decorativePosition = "none",
}: SectionLayoutProps) {
  const spacingClasses = {
    compact: "py-6 md:py-10",
    normal: "py-10 md:py-16",
    spacious: "py-16 md:py-24",
  };

  const backgroundClasses = {
    light: "bg-white text-slate-900",
    dark: "bg-slate-900 text-white",
    accent: "bg-amber-50 text-slate-900",
    pattern:
      "bg-white bg-[url('/patterns/restaurant-pattern.svg')] bg-repeat text-slate-900",
    none: "",
  };

  const renderDecorativeElement = (position: "top" | "bottom") => {
    if (
      (decorativePosition !== position && decorativePosition !== "both") ||
      decorativeElement === "none"
    ) {
      return null;
    }

    switch (decorativeElement) {
      case "dots":
        return (
          <div
            className={`absolute ${
              position === "top" ? "top-0" : "bottom-0"
            } left-0 w-full h-4 opacity-20`}
          >
            <div className="container mx-auto px-4">
              <div className="flex space-x-2">
                {[...Array(20)].map((_, i) => (
                  <div key={i} className="h-2 w-2 rounded-full bg-amber-500" />
                ))}
              </div>
            </div>
          </div>
        );
      case "wave":
        return (
          <div
            className={`absolute ${
              position === "top" ? "top-0" : "bottom-0"
            } left-0 w-full h-8 overflow-hidden`}
          >
            <svg
              className="absolute w-full h-24"
              style={{ transform: position === "top" ? "rotate(180deg)" : "" }}
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                className="fill-amber-100"
              ></path>
            </svg>
          </div>
        );
      case "plate":
        return (
          <div
            className={`absolute ${
              position === "top" ? "-top-6" : "-bottom-6"
            } ${position === "top" ? "left-6" : "right-6"} opacity-10`}
          >
            <div className="rounded-full border-2 border-amber-500 w-12 h-12 md:w-24 md:h-24"></div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section
      id={id}
      className={cn(
        "relative w-full",
        backgroundClasses[background],
        spacingClasses[spacing],
        withDivider && "border-t border-slate-200",
        className
      )}
    >
      {renderDecorativeElement("top")}
      <div className="container mx-auto px-4 relative">{children}</div>
      {renderDecorativeElement("bottom")}
    </section>
  );
}
