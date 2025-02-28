"use client";

import React from "react";
import { RestaurantSectionLayout } from "./section-layout";

/**
 * Demo component to showcase different restaurant section layout configurations
 */
export function RestaurantLayoutDemo() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Section Layout Variants</h2>

      {/* Light background with normal spacing */}
      <RestaurantSectionLayout
        background="light"
        spacing="normal"
        className="border rounded-lg"
      >
        <div className="text-center py-8">
          <h3 className="text-xl font-semibold mb-4">Light Background</h3>
          <p className="max-w-md mx-auto">
            Default section with light background and normal spacing. Perfect
            for menu sections, about us content, or general information.
          </p>
        </div>
      </RestaurantSectionLayout>

      {/* Dark background with compact spacing */}
      <RestaurantSectionLayout
        background="dark"
        spacing="compact"
        className="border rounded-lg"
      >
        <div className="text-center py-4">
          <h3 className="text-xl font-semibold mb-2">Dark Background</h3>
          <p className="max-w-md mx-auto">
            Compact section with dark background. Great for CTAs, special
            announcements, or footer sections.
          </p>
        </div>
      </RestaurantSectionLayout>

      {/* Accent background with spacious spacing */}
      <RestaurantSectionLayout
        background="accent"
        spacing="spacious"
        className="border rounded-lg"
      >
        <div className="text-center py-10">
          <h3 className="text-xl font-semibold mb-4">Accent Background</h3>
          <p className="max-w-md mx-auto">
            Spacious section with accent background. Ideal for highlighting
            special offerings, chef's recommendations, or featured content.
          </p>
        </div>
      </RestaurantSectionLayout>

      {/* With decorative elements */}
      <RestaurantSectionLayout
        background="light"
        spacing="normal"
        decorativeElement="dots"
        decorativePosition="both"
        className="border rounded-lg"
      >
        <div className="text-center py-8">
          <h3 className="text-xl font-semibold mb-4">With Decorative Dots</h3>
          <p className="max-w-md mx-auto">
            Section with decorative dots at top and bottom. Adds a subtle
            decorative touch while maintaining a clean look.
          </p>
        </div>
      </RestaurantSectionLayout>

      <RestaurantSectionLayout
        background="light"
        spacing="normal"
        decorativeElement="wave"
        decorativePosition="bottom"
        className="border rounded-lg"
      >
        <div className="text-center py-8">
          <h3 className="text-xl font-semibold mb-4">With Wave Decoration</h3>
          <p className="max-w-md mx-auto">
            Section with wave decoration at the bottom. Creates a flowing
            transition between sections.
          </p>
        </div>
      </RestaurantSectionLayout>

      <RestaurantSectionLayout
        background="light"
        spacing="normal"
        decorativeElement="plate"
        decorativePosition="both"
        className="border rounded-lg"
      >
        <div className="text-center py-8">
          <h3 className="text-xl font-semibold mb-4">With Plate Decoration</h3>
          <p className="max-w-md mx-auto">
            Section with plate decoration at corners. Subtle reference to dining
            experience without being overpowering.
          </p>
        </div>
      </RestaurantSectionLayout>

      {/* With divider */}
      <RestaurantSectionLayout
        background="light"
        spacing="normal"
        withDivider={true}
        className="border rounded-lg"
      >
        <div className="text-center py-8">
          <h3 className="text-xl font-semibold mb-4">With Top Divider</h3>
          <p className="max-w-md mx-auto">
            Section with a subtle divider at the top. Useful for visually
            separating content sections.
          </p>
        </div>
      </RestaurantSectionLayout>
    </div>
  );
}
