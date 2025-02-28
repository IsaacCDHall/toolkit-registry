import { useCallback, useEffect, useState } from "react";

interface UseParallaxOptions {
  speed?: number; // Speed factor (1 is normal, 0.5 is half speed, 2 is double speed)
  reverse?: boolean; // Whether to reverse the direction
  disabled?: boolean; // Whether to disable the effect
}

/**
 * A hook to create a parallax scrolling effect
 *
 * @param options Configuration options for the parallax effect
 * @returns An object with the calculated transform style
 */
export function useParallax({
  speed = 0.5,
  reverse = false,
  disabled = false,
}: UseParallaxOptions = {}) {
  const [offset, setOffset] = useState(0);
  const [isClient, setIsClient] = useState(false);

  // Only enable on client-side to avoid hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleScroll = useCallback(() => {
    if (disabled || !isClient) return;

    const scrollY = window.scrollY;
    const direction = reverse ? -1 : 1;
    const calculatedOffset = scrollY * speed * direction;

    setOffset(calculatedOffset);
  }, [speed, reverse, disabled, isClient]);

  useEffect(() => {
    if (!isClient) return;

    window.addEventListener("scroll", handleScroll);

    // Call once to set initial position
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll, isClient]);

  const transform =
    disabled || !isClient ? {} : { transform: `translateY(${offset}px)` };

  return { style: transform };
}

// Example usage
export const ExampleUsage = `
import { useParallax } from '@/components/hooks/use-parallax';
import Image from 'next/image';

export function ParallaxHero() {
  const { style } = useParallax({ speed: 0.3 });
  
  return (
    <div className="relative h-[600px] overflow-hidden">
      <div 
        className="absolute inset-0 w-full h-full"
        style={style}
      >
        <Image
          src="/hero-image.jpg"
          alt="Restaurant interior"
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="relative z-10 h-full flex items-center justify-center">
        <h1 className="text-5xl text-white font-bold">Our Restaurant</h1>
      </div>
    </div>
  );
}
`;
