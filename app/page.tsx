import * as React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OpenInV0Button } from "@/components/open-in-v0-button";

// Basic components
import { HelloWorld } from "@/registry/hello-world/hello-world";
import { ExampleForm } from "@/registry/example-form/example-form";
import PokemonPage from "@/registry/complex-component/page";

// Restaurant components
import { TestimonialsDemo } from "@/registry/restaurant-components/testimonials/testimonials-demo";
import { GalleryDemo } from "@/registry/restaurant-components/food-gallery/gallery-demo";
import { RestaurantHero } from "@/registry/restaurant-components/hero/hero";
import { MenuDisplay } from "@/registry/restaurant-components/menu-display/menu-display";
import { ReservationWidget } from "@/registry/restaurant-components/reservation/reservation-widget";

// This page displays items from the custom registry.
// You are free to implement this with your own design as needed.

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto flex flex-col min-h-svh px-4 py-8 gap-8">
      <header className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold tracking-tight">
          Component Registry
        </h1>
        <p className="text-muted-foreground">
          A collection of ready-to-use components for building restaurant
          websites.
        </p>
      </header>

      <Tabs defaultValue="restaurant" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="restaurant">Restaurant Components</TabsTrigger>
          <TabsTrigger value="basic">Basic Components</TabsTrigger>
        </TabsList>

        {/* Restaurant Components Tab */}
        <TabsContent value="restaurant" className="mt-6">
          <div className="grid grid-cols-1 gap-8">
            {/* Hero Component */}
            <div className="flex flex-col gap-4 border rounded-lg p-4 overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h2 className="text-xl font-semibold">Restaurant Hero</h2>
                  <p className="text-sm text-muted-foreground">
                    Hero section with configurable background image, headline,
                    and CTA for restaurant sites
                  </p>
                </div>
                <OpenInV0Button name="restaurant-hero" className="w-fit" />
              </div>
              <div className="relative overflow-hidden rounded-md">
                <RestaurantHero
                  title="Delicious Cuisine"
                  subtitle="Experience fine dining at its best"
                  backgroundImage={{
                    url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1470&auto=format&fit=crop",
                    alt: "Restaurant interior with soft lighting",
                  }}
                />
              </div>
            </div>

            {/* Menu Component */}
            <div className="flex flex-col gap-4 border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h2 className="text-xl font-semibold">Menu Display</h2>
                  <p className="text-sm text-muted-foreground">
                    Interactive menu display with category filtering and item
                    details
                  </p>
                </div>
                <OpenInV0Button name="menu-display" className="w-fit" />
              </div>
              <div className="relative">
                <MenuDisplay
                  categories={[
                    {
                      id: "appetizers",
                      name: "Appetizers",
                      description:
                        "Start your meal with these delicious options",
                      items: [
                        {
                          id: "bruschetta",
                          name: "Bruschetta",
                          description:
                            "Toasted bread with fresh tomatoes, basil and garlic",
                          price: "$8.99",
                        },
                        {
                          id: "calamari",
                          name: "Calamari",
                          description: "Crispy fried squid with marinara sauce",
                          price: "$12.99",
                          isSpecial: true,
                        },
                      ],
                    },
                    {
                      id: "mains",
                      name: "Main Courses",
                      items: [
                        {
                          id: "pasta",
                          name: "Pasta Carbonara",
                          description:
                            "Classic carbonara with pancetta and egg",
                          price: "$16.99",
                        },
                        {
                          id: "steak",
                          name: "Ribeye Steak",
                          description: "10oz ribeye with herb butter and sides",
                          price: "$28.99",
                          isSpecial: true,
                        },
                      ],
                    },
                  ]}
                />
              </div>
            </div>

            {/* Testimonials Component */}
            <div className="flex flex-col gap-4 border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h2 className="text-xl font-semibold">
                    Testimonials Carousel
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Interactive carousel to showcase customer testimonials,
                    reviews and ratings
                  </p>
                </div>
                <OpenInV0Button
                  name="testimonials-carousel"
                  className="w-fit"
                />
              </div>
              <div className="relative">
                <TestimonialsDemo />
              </div>
            </div>

            {/* Food Gallery Component */}
            <div className="flex flex-col gap-4 border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h2 className="text-xl font-semibold">Food Gallery</h2>
                  <p className="text-sm text-muted-foreground">
                    Beautiful food gallery with masonry layout, filtering, and
                    lightbox functionality
                  </p>
                </div>
                <OpenInV0Button name="food-gallery" className="w-fit" />
              </div>
              <div className="relative">
                <GalleryDemo />
              </div>
            </div>

            {/* Reservation Component */}
            <div className="flex flex-col gap-4 border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h2 className="text-xl font-semibold">Reservation Widget</h2>
                  <p className="text-sm text-muted-foreground">
                    Interactive reservation form with date/time selection and
                    guest information
                  </p>
                </div>
                <OpenInV0Button name="reservation-widget" className="w-fit" />
              </div>
              <div className="relative p-4 bg-gray-50 rounded-md">
                <ReservationWidget />
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Basic Components Tab */}
        <TabsContent value="basic" className="mt-6">
          <div className="grid grid-cols-1 gap-8">
            {/* Hello World */}
            <div className="flex flex-col gap-4 border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h2 className="text-xl font-semibold">Hello World</h2>
                  <p className="text-sm text-muted-foreground">
                    A simple hello world component
                  </p>
                </div>
                <OpenInV0Button name="hello-world" className="w-fit" />
              </div>
              <div className="flex items-center justify-center min-h-[100px] bg-gray-50 rounded-md">
                <HelloWorld />
              </div>
            </div>

            {/* Example Form */}
            <div className="flex flex-col gap-4 border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h2 className="text-xl font-semibold">Example Form</h2>
                  <p className="text-sm text-muted-foreground">
                    A contact form with Zod validation
                  </p>
                </div>
                <OpenInV0Button name="example-form" className="w-fit" />
              </div>
              <div className="relative p-4 bg-gray-50 rounded-md">
                <ExampleForm />
              </div>
            </div>

            {/* Complex Component */}
            <div className="flex flex-col gap-4 border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h2 className="text-xl font-semibold">Pokemon Cards</h2>
                  <p className="text-sm text-muted-foreground">
                    A complex component showing hooks, libs and components
                  </p>
                </div>
                <OpenInV0Button name="complex-component" className="w-fit" />
              </div>
              <div className="relative p-4 bg-gray-50 rounded-md">
                <PokemonPage />
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <footer className="py-6 border-t">
        <p className="text-center text-sm text-muted-foreground">
          Component Registry © {new Date().getFullYear()}. Built with Next.js
          and shadcn.
        </p>
      </footer>
    </div>
  );
}
