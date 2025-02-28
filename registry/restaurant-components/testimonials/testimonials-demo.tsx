"use client";

import React from "react";
import { TestimonialsCarousel } from "./testimonials-carousel";
import { getSampleTestimonials } from "./testimonials-utils";

export interface TestimonialsDemoProps {
  variant?: "light" | "dark" | "branded";
  testimonialCount?: number;
  titleText?: string;
}

export function TestimonialsDemo({
  variant = "branded",
  testimonialCount = 4,
  titleText = "What Our Guests Are Saying",
}: TestimonialsDemoProps) {
  // Get sample testimonials data
  const testimonials = getSampleTestimonials(testimonialCount);

  return (
    <div className="w-full">
      <TestimonialsCarousel
        testimonials={testimonials}
        variant={variant}
        titleText={titleText}
        autoplay={true}
        autoplaySpeed={5000}
        showDots={true}
        showArrows={true}
      />

      {/* Component usage example code */}
      <div className="mt-8 border-t pt-8 px-4 max-w-4xl mx-auto">
        <h3 className="text-lg font-medium mb-2">Component Usage Example</h3>
        <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
          {`// Import the component
import { TestimonialsCarousel } from "@/components/testimonials-carousel";

// Define your testimonials data
const testimonials = [
  {
    id: "1",
    author: "Jane Smith",
    role: "Food Critic",
    content: "Exceptional dining experience with outstanding service.",
    rating: 5
  },
  // More testimonials...
];

// Use the component in your page
export default function TestimonialsSection() {
  return (
    <TestimonialsCarousel
      testimonials={testimonials}
      variant="branded"
      titleText="Guest Testimonials"
    />
  );
}`}
        </pre>
      </div>

      {/* Prismic integration example */}
      <div className="mt-8 border-t pt-8 px-4 max-w-4xl mx-auto">
        <h3 className="text-lg font-medium mb-2">
          Prismic Integration Example
        </h3>
        <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
          {`import { createClient } from "@prismicio/client";
import { TestimonialsCarousel } from "@/components/testimonials-carousel";
import { formatPrismicTestimonials } from "@/lib/testimonials-utils";

// Fetch data from Prismic
export async function getStaticProps() {
  const client = createClient(/* your Prismic config */);
  const testimonialData = await client.getAllByType("testimonial");
  
  return {
    props: {
      testimonials: formatPrismicTestimonials(testimonialData)
    }
  };
}

export default function TestimonialsPage({ testimonials }) {
  return (
    <TestimonialsCarousel
      testimonials={testimonials}
      variant="dark"
    />
  );
}`}
        </pre>
      </div>
    </div>
  );
}
