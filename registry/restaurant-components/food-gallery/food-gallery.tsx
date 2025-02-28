"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  category?: string;
  description?: string;
}

export interface FoodGalleryProps {
  items: GalleryItem[];
  title?: string;
  subtitle?: string;
  variant?: "grid" | "masonry";
  columns?: 2 | 3 | 4;
  gap?: "small" | "medium" | "large";
  showCategories?: boolean;
  enableLightbox?: boolean;
  className?: string;
}

export function FoodGallery({
  items,
  title = "Our Culinary Creations",
  subtitle,
  variant = "masonry",
  columns = 3,
  gap = "medium",
  showCategories = true,
  enableLightbox = true,
  className,
}: FoodGalleryProps) {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!items || items.length === 0) {
    return null;
  }

  // Extract unique categories
  const categories = items
    .map((item) => item.category)
    .filter(
      (category, index, self) => category && self.indexOf(category) === index
    ) as string[];

  // Filter items by active category
  const filteredItems = activeFilter
    ? items.filter((item) => item.category === activeFilter)
    : items;

  // Column and gap classes
  const columnClasses = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  };

  const gapClasses = {
    small: "gap-2",
    medium: "gap-4",
    large: "gap-6",
  };

  // Handle image click for lightbox
  const openLightbox = (index: number) => {
    if (enableLightbox) {
      setActiveImageIndex(index);
      setLightboxOpen(true);
    }
  };

  // Lightbox navigation
  const navigateLightbox = (direction: "next" | "prev") => {
    if (direction === "next") {
      setActiveImageIndex((prevIndex) =>
        prevIndex === filteredItems.length - 1 ? 0 : prevIndex + 1
      );
    } else {
      setActiveImageIndex((prevIndex) =>
        prevIndex === 0 ? filteredItems.length - 1 : prevIndex - 1
      );
    }
  };

  return (
    <div className={cn("w-full py-12 px-4", className)}>
      {/* Header */}
      <div className="text-center mb-8">
        {title && <h2 className="text-3xl font-serif mb-2">{title}</h2>}
        {subtitle && (
          <p className="text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
        )}
      </div>

      {/* Category filters */}
      {showCategories && categories.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <button
            className={`px-4 py-2 rounded-full text-sm transition-colors ${
              activeFilter === null
                ? "bg-amber-500 text-white"
                : "bg-gray-100 hover:bg-gray-200 text-gray-800"
            }`}
            onClick={() => setActiveFilter(null)}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                activeFilter === category
                  ? "bg-amber-500 text-white"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-800"
              }`}
              onClick={() => setActiveFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {/* Gallery grid */}
      {variant === "grid" ? (
        <div className={`grid ${columnClasses[columns]} ${gapClasses[gap]}`}>
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-lg bg-gray-100 group"
              onClick={() => openLightbox(index)}
            >
              <div className="relative aspect-square bg-gray-100 cursor-pointer">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {item.description && (
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p className="text-white text-sm">{item.description}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Masonry layout
        <div className={`grid ${columnClasses[columns]} ${gapClasses[gap]}`}>
          {filteredItems.map((item, index) => {
            // For masonry layout, calculate aspect ratio to create visual variety
            const aspectRatio = item.height / item.width;
            const spanClasses = aspectRatio > 1.2 ? "row-span-2" : "";

            return (
              <div
                key={item.id}
                className={`overflow-hidden rounded-lg bg-gray-100 group ${spanClasses}`}
                onClick={() => openLightbox(index)}
              >
                <div
                  className="relative cursor-pointer"
                  style={{
                    paddingBottom: `${(item.height / item.width) * 100}%`,
                  }}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {item.description && (
                    <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <p className="text-white text-sm">{item.description}</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Lightbox */}
      {lightboxOpen && filteredItems.length > 0 && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
          <button
            className="absolute top-4 right-4 text-white p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 z-10"
            onClick={() => setLightboxOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>

          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70"
            onClick={() => navigateLightbox("prev")}
          >
            &lt;
          </button>

          <div className="relative max-w-4xl max-h-[80vh] w-full">
            <Image
              src={filteredItems[activeImageIndex].src}
              alt={filteredItems[activeImageIndex].alt}
              width={filteredItems[activeImageIndex].width}
              height={filteredItems[activeImageIndex].height}
              className="mx-auto max-h-[80vh] object-contain"
            />

            {filteredItems[activeImageIndex].description && (
              <div className="absolute bottom-0 inset-x-0 bg-black bg-opacity-60 p-4 text-white">
                <p>{filteredItems[activeImageIndex].description}</p>
                {filteredItems[activeImageIndex].category && (
                  <span className="inline-block px-2 py-1 bg-amber-500 text-white text-xs rounded mt-2">
                    {filteredItems[activeImageIndex].category}
                  </span>
                )}
              </div>
            )}
          </div>

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70"
            onClick={() => navigateLightbox("next")}
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
}
