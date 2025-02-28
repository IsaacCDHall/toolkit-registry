"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star, StarHalf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface TestimonialItem {
  id: string;
  author: string;
  role?: string;
  content: string;
  rating?: number; // Out of 5
  image?: {
    url: string;
    alt: string;
  };
  date?: string;
}

export interface TestimonialsCarouselProps {
  testimonials: TestimonialItem[];
  autoplay?: boolean;
  autoplaySpeed?: number;
  showDots?: boolean;
  showArrows?: boolean;
  variant?: "light" | "dark" | "branded";
  className?: string;
  titleText?: string;
}

export function TestimonialsCarousel({
  testimonials,
  autoplay = true,
  autoplaySpeed = 5000,
  showDots = true,
  showArrows = true,
  variant = "light",
  className,
  titleText = "What Our Guests Say",
}: TestimonialsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Handle auto-rotation
  useEffect(() => {
    if (!autoplay || isPaused || testimonials.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, autoplaySpeed);

    return () => clearInterval(interval);
  }, [autoplay, autoplaySpeed, isPaused, testimonials.length]);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Generate star rating display
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={`full-${i}`}
          className="fill-yellow-400 text-yellow-400 w-5 h-5"
        />
      );
    }

    // Add half star if needed
    if (hasHalfStar) {
      stars.push(
        <StarHalf
          key="half"
          className="fill-yellow-400 text-yellow-400 w-5 h-5"
        />
      );
    }

    // Add empty stars to complete 5
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="text-gray-300 w-5 h-5" />);
    }

    return stars;
  };

  // Variant styling
  const variantClasses = {
    light: "bg-white text-gray-800",
    dark: "bg-gray-900 text-white",
    branded: "bg-amber-50 text-amber-900",
  };

  if (!testimonials.length) {
    return null;
  }

  return (
    <div
      className={cn(
        "w-full py-12 px-4 relative",
        variantClasses[variant],
        className
      )}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Title */}
      {titleText && (
        <h2 className="text-3xl font-serif text-center mb-10">{titleText}</h2>
      )}

      {/* Testimonial carousel */}
      <div className="max-w-4xl mx-auto">
        <div className="relative h-full">
          {/* Navigation arrows */}
          {showArrows && testimonials.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 -ml-4"
                onClick={goToPrevious}
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 -mr-4"
                onClick={goToNext}
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </>
          )}

          {/* Testimonial cards */}
          <div className="overflow-hidden">
            <div className="transition-transform duration-500 ease-in-out">
              <div className="px-8 sm:px-12 md:px-16">
                <div className="flex flex-col items-center text-center">
                  {/* Author image */}
                  {testimonials[currentIndex].image && (
                    <div className="mb-6">
                      <img
                        src={testimonials[currentIndex].image.url}
                        alt={
                          testimonials[currentIndex].image.alt ||
                          testimonials[currentIndex].author
                        }
                        className="w-20 h-20 rounded-full object-cover border-2 border-amber-300"
                      />
                    </div>
                  )}

                  {/* Rating */}
                  {testimonials[currentIndex].rating && (
                    <div className="flex items-center mb-4">
                      {renderStars(testimonials[currentIndex].rating)}
                    </div>
                  )}

                  {/* Content */}
                  <blockquote className="text-xl italic mb-5">
                    &ldquo;{testimonials[currentIndex].content}&rdquo;
                  </blockquote>

                  {/* Author */}
                  <cite className="not-italic font-semibold block">
                    {testimonials[currentIndex].author}
                  </cite>

                  {/* Role/title */}
                  {testimonials[currentIndex].role && (
                    <span className="text-sm opacity-75">
                      {testimonials[currentIndex].role}
                    </span>
                  )}

                  {/* Date */}
                  {testimonials[currentIndex].date && (
                    <span className="text-xs opacity-60 mt-1">
                      {testimonials[currentIndex].date}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Dot indicators */}
          {showDots && testimonials.length > 1 && (
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 w-2 rounded-full transition-all ${
                    currentIndex === index
                      ? "bg-amber-500 w-4"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
