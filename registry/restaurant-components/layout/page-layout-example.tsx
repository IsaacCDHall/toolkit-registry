"use client";

import React from "react";
import { RestaurantSectionLayout } from "./section-layout";
import { RestaurantHero } from "../../restaurant-components/hero/hero";
import {
  MenuDisplay,
  MenuCategoryProps,
} from "../../restaurant-components/menu-display/menu-display";
import {
  FoodGallery,
  GalleryItem,
} from "../../restaurant-components/food-gallery/food-gallery";
import {
  TestimonialsCarousel,
  TestimonialItem,
} from "../../restaurant-components/testimonials/testimonials-carousel";
import { ReservationWidget } from "../../restaurant-components/reservation/reservation-widget";

/**
 * Example of how to use the section layout with other restaurant components
 * to create a cohesive restaurant page.
 */
export function RestaurantPageExample() {
  // Sample data for hero section
  const heroData = {
    title: "Bistro Luminoso",
    subtitle: "Modern Italian cuisine in the heart of the city",
    backgroundImage: {
      url: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2070&auto=format&fit=crop",
      alt: "Restaurant interior with ambient lighting",
    },
    cta: {
      text: "Reserve a Table",
      url: "#reservation",
    },
    overlay: true,
    height: "large" as const,
    textAlign: "center" as const,
  };

  // Sample data for menu section
  const menuData: {
    categories: MenuCategoryProps[];
  } = {
    categories: [
      {
        id: "starters",
        name: "Starters",
        description: "Perfect dishes to begin your culinary journey",
        items: [
          {
            id: "bruschetta",
            name: "Bruschetta",
            description: "Toasted bread with fresh tomatoes, garlic and basil",
            price: "$8.95",
            tags: ["Vegetarian"],
          },
          {
            id: "calamari",
            name: "Crispy Calamari",
            description:
              "Tender calamari lightly fried, served with lemon aioli",
            price: "$12.95",
            isSpecial: true,
          },
        ],
      },
      {
        id: "mains",
        name: "Main Courses",
        description: "Our chef's finest creations",
        items: [
          {
            id: "risotto",
            name: "Wild Mushroom Risotto",
            description:
              "Creamy arborio rice with assorted wild mushrooms and truffle oil",
            price: "$19.95",
            tags: ["Vegetarian", "Gluten-Free"],
          },
          {
            id: "salmon",
            name: "Grilled Salmon",
            description:
              "Fresh salmon fillet with lemon herb butter and seasonal vegetables",
            price: "$24.95",
            allergens: ["Fish"],
          },
        ],
      },
    ],
  };

  // Sample data for gallery section
  const galleryImages: GalleryItem[] = [
    {
      id: "img1",
      src: "https://images.unsplash.com/photo-1488900128323-21503983a07e?q=80&w=1974&auto=format&fit=crop",
      alt: "Pasta dish with fresh herbs",
      width: 1974,
      height: 1316,
      category: "Pasta",
      description: "House-made pasta with seasonal ingredients",
    },
    {
      id: "img2",
      src: "https://images.unsplash.com/photo-1460306855393-0410f61241c7?q=80&w=1973&auto=format&fit=crop",
      alt: "Artisan pizza",
      width: 1973,
      height: 1315,
      category: "Pizza",
      description: "Wood-fired pizza with fresh mozzarella",
    },
    {
      id: "img3",
      src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop",
      alt: "Steak dinner",
      width: 2070,
      height: 1380,
      category: "Mains",
      description: "Prime cut steak with roasted vegetables",
    },
  ];

  // Sample data for testimonials section
  const testimonials: TestimonialItem[] = [
    {
      id: "t1",
      author: "Maria Garcia",
      role: "Food Critic",
      content:
        "Bistro Luminoso offers the perfect balance of traditional Italian flavors with modern culinary techniques. Every dish tells a story.",
      rating: 5,
    },
    {
      id: "t2",
      author: "James Wilson",
      content:
        "The atmosphere and service were as exceptional as the food. A true gem in the city's dining scene.",
      rating: 4.5,
    },
    {
      id: "t3",
      author: "Sophia Chen",
      role: "Local Guide",
      content:
        "I've been to many Italian restaurants, but the freshness and quality of ingredients here is unmatched. Highly recommended!",
      rating: 5,
    },
  ];

  return (
    <div className="restaurant-page">
      {/* Hero Section */}
      <RestaurantHero {...heroData} />

      {/* About Section */}
      <RestaurantSectionLayout
        background="light"
        spacing="normal"
        decorativeElement="dots"
        decorativePosition="top"
      >
        <div className="max-w-4xl mx-auto text-center py-8">
          <h2 className="text-3xl font-serif mb-4">Our Story</h2>
          <p className="mb-6 text-gray-700">
            Founded in 2010, Bistro Luminoso brings the authentic flavors of
            Italy to your table. Using only the freshest local ingredients and
            traditional recipes passed down through generations, our chef
            creates dishes that capture the essence of Italian cuisine.
          </p>
          <p className="text-gray-700">
            We believe in sustainable sourcing, supporting local farmers, and
            creating memorable dining experiences that bring people together
            around the table.
          </p>
        </div>
      </RestaurantSectionLayout>

      {/* Menu Section */}
      <RestaurantSectionLayout
        background="pattern"
        spacing="spacious"
        id="menu"
      >
        <div className="max-w-5xl mx-auto py-8">
          <h2 className="text-3xl font-serif text-center mb-12">Our Menu</h2>
          <MenuDisplay
            categories={menuData.categories}
            variant="grid"
            highlightSpecials={true}
            showAllergens={true}
          />
        </div>
      </RestaurantSectionLayout>

      {/* Gallery Section */}
      <RestaurantSectionLayout
        background="dark"
        spacing="normal"
        decorativeElement="wave"
        decorativePosition="both"
      >
        <FoodGallery
          items={galleryImages}
          title="Culinary Artistry"
          subtitle="A visual feast of our signature dishes"
          variant="grid"
          enableLightbox={true}
        />
      </RestaurantSectionLayout>

      {/* Testimonials Section */}
      <RestaurantSectionLayout
        background="accent"
        spacing="normal"
        withDivider={true}
      >
        <TestimonialsCarousel
          testimonials={testimonials}
          variant="branded"
          titleText="What Our Guests Say"
          autoplay={true}
          showDots={true}
          showArrows={true}
        />
      </RestaurantSectionLayout>

      {/* Reservation Section */}
      <RestaurantSectionLayout
        background="light"
        spacing="normal"
        id="reservation"
        decorativeElement="plate"
        decorativePosition="bottom"
      >
        <div className="max-w-md mx-auto py-8">
          <h2 className="text-3xl font-serif text-center mb-8">
            Reserve Your Table
          </h2>
          <ReservationWidget
            title="Book Your Experience"
            subtitle="Secure your preferred date and time"
            darkMode={false}
            minGuests={1}
            maxGuests={10}
          />
        </div>
      </RestaurantSectionLayout>

      {/* Contact & Hours Section */}
      <RestaurantSectionLayout background="dark" spacing="compact">
        <div className="max-w-4xl mx-auto py-6 text-center text-white">
          <h2 className="text-2xl font-serif mb-4">Hours & Location</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl mb-2">Opening Hours</h3>
              <p className="mb-1">Monday - Thursday: 5pm - 10pm</p>
              <p className="mb-1">Friday - Saturday: 5pm - 11pm</p>
              <p>Sunday: 5pm - 9pm</p>
            </div>
            <div>
              <h3 className="text-xl mb-2">Find Us</h3>
              <p className="mb-1">123 Culinary Avenue</p>
              <p className="mb-1">Food District, City 12345</p>
              <p className="mb-4">Phone: (555) 123-4567</p>
              <a
                href="https://maps.google.com"
                className="inline-block px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </RestaurantSectionLayout>
    </div>
  );
}
