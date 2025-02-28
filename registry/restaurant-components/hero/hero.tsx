import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface HeroProps {
  title: string;
  subtitle?: string;
  backgroundImage: {
    url: string;
    alt: string;
  };
  cta?: {
    text: string;
    url: string;
  };
  overlay?: boolean;
  height?: "small" | "medium" | "large" | "full";
  textAlign?: "left" | "center" | "right";
  textColor?: string;
}

export function RestaurantHero({
  title,
  subtitle,
  backgroundImage,
  cta,
  overlay = true,
  height = "medium",
  textAlign = "center",
  textColor = "white",
}: HeroProps) {
  // Map height values to actual classes
  const heightClasses = {
    small: "h-[300px]",
    medium: "h-[500px]",
    large: "h-[700px]",
    full: "h-screen",
  };

  // Map text alignment to classes
  const alignClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <div className={`relative w-full ${heightClasses[height]} overflow-hidden`}>
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={backgroundImage.url}
          alt={backgroundImage.alt}
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />

        {/* Optional overlay for better text readability */}
        {overlay && <div className="absolute inset-0 bg-black/40"></div>}
      </div>

      {/* Content */}
      <div
        className={`relative z-10 h-full flex flex-col items-center justify-center px-4 sm:px-6 ${alignClasses[textAlign]}`}
      >
        <div className="max-w-4xl mx-auto">
          <h1
            className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-4`}
            style={{ color: textColor }}
          >
            {title}
          </h1>

          {subtitle && (
            <p
              className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
              style={{ color: textColor }}
            >
              {subtitle}
            </p>
          )}

          {cta && (
            <Button asChild size="lg" className="mt-4">
              <a href={cta.url}>{cta.text}</a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

// Add Prismic integration example for documentation
export const PrismicHeroExampleUsage = `
// Example of using the Hero component with Prismic data
import { createClient } from '@prismicio/client';
import { RestaurantHero } from '@/components/restaurant/hero';

// In your page component
export async function HomePage() {
  const client = createClient('your-repo-name');
  const page = await client.getSingle('home_page');
  
  return (
    <RestaurantHero
      title={page.data.hero_title}
      subtitle={page.data.hero_subtitle}
      backgroundImage={{
        url: page.data.hero_background.url,
        alt: page.data.hero_background.alt
      }}
      cta={page.data.hero_cta_text ? {
        text: page.data.hero_cta_text,
        url: page.data.hero_cta_link.url
      } : undefined}
      overlay={page.data.hero_overlay ?? true}
      height={page.data.hero_height ?? "medium"}
      textAlign={page.data.hero_text_align ?? "center"}
      textColor={page.data.hero_text_color ?? "white"}
    />
  );
}
`;
