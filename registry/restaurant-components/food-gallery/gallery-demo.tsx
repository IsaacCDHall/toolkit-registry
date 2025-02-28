"use client";

import React, { useState } from "react";
import { FoodGallery } from "./food-gallery";
import { getSampleGalleryItems } from "./gallery-utils";

export interface GalleryDemoProps {
  initialVariant?: "grid" | "masonry";
}

export function GalleryDemo({ initialVariant = "masonry" }: GalleryDemoProps) {
  const [variant, setVariant] = useState<"grid" | "masonry">(initialVariant);
  const [columns, setColumns] = useState<2 | 3 | 4>(3);

  // Get sample gallery items
  const galleryItems = getSampleGalleryItems();

  // Handle variant change
  const handleVariantChange = (newVariant: "grid" | "masonry") => {
    setVariant(newVariant);
  };

  // Handle columns change
  const handleColumnsChange = (newColumns: 2 | 3 | 4) => {
    setColumns(newColumns);
  };

  return (
    <div className="w-full">
      {/* Demo controls */}
      <div className="max-w-4xl mx-auto mb-8 px-4">
        <h2 className="text-2xl font-semibold mb-4">Food Gallery Component</h2>
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-1">
              Layout Style
            </label>
            <div className="flex rounded-md overflow-hidden border">
              <button
                className={`px-4 py-2 flex-1 text-sm ${
                  variant === "grid" ? "bg-amber-500 text-white" : "bg-white"
                }`}
                onClick={() => handleVariantChange("grid")}
              >
                Grid
              </button>
              <button
                className={`px-4 py-2 flex-1 text-sm ${
                  variant === "masonry" ? "bg-amber-500 text-white" : "bg-white"
                }`}
                onClick={() => handleVariantChange("masonry")}
              >
                Masonry
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Columns</label>
            <div className="flex rounded-md overflow-hidden border">
              <button
                className={`px-4 py-2 flex-1 text-sm ${
                  columns === 2 ? "bg-amber-500 text-white" : "bg-white"
                }`}
                onClick={() => handleColumnsChange(2)}
              >
                2
              </button>
              <button
                className={`px-4 py-2 flex-1 text-sm ${
                  columns === 3 ? "bg-amber-500 text-white" : "bg-white"
                }`}
                onClick={() => handleColumnsChange(3)}
              >
                3
              </button>
              <button
                className={`px-4 py-2 flex-1 text-sm ${
                  columns === 4 ? "bg-amber-500 text-white" : "bg-white"
                }`}
                onClick={() => handleColumnsChange(4)}
              >
                4
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery component */}
      <FoodGallery
        items={galleryItems}
        variant={variant}
        columns={columns}
        title="Our Signature Dishes"
        subtitle="Explore our seasonal menu highlights and signature creations"
        showCategories={true}
        enableLightbox={true}
      />

      {/* Component usage example */}
      <div className="mt-12 border-t pt-8 px-4 max-w-4xl mx-auto">
        <h3 className="text-lg font-medium mb-2">Component Usage Example</h3>
        <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
          {`// Import the component
import { FoodGallery } from "@/components/food-gallery";

// Define your gallery items
const galleryItems = [
  {
    id: "dish-1",
    src: "/images/salmon-dish.jpg",
    alt: "Salmon dish",
    width: 1200,
    height: 800,
    category: "Main Course",
    description: "Pan-seared salmon with seasonal vegetables"
  },
  // More gallery items...
];

// Use the component in your page
export default function MenuGallery() {
  return (
    <FoodGallery
      items={galleryItems}
      variant="${variant}"
      columns={${columns}}
      title="Our Signature Dishes"
      showCategories={true}
      enableLightbox={true}
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
import { FoodGallery } from "@/components/food-gallery";
import { formatPrismicGalleryItems } from "@/lib/gallery-utils";

// Fetch data from Prismic
export async function getStaticProps() {
  const client = createClient(/* your Prismic config */);
  const galleryData = await client.getAllByType("gallery_item");
  
  return {
    props: {
      galleryItems: formatPrismicGalleryItems(galleryData)
    }
  };
}

export default function GalleryPage({ galleryItems }) {
  return (
    <FoodGallery
      items={galleryItems}
      variant="${variant}"
      columns={${columns}}
      title="Our Menu Gallery"
    />
  );
}`}
        </pre>
      </div>
    </div>
  );
}
