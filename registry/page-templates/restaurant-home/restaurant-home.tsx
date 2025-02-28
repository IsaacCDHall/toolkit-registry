import React from "react";
import { RestaurantHero } from "../../restaurant-components/hero/hero";
import {
  MenuDisplay,
  MenuCategoryProps,
} from "../../restaurant-components/menu-display/menu-display";
import { ReservationWidget } from "../../restaurant-components/reservation/reservation-widget";

export interface RestaurantHomeProps {
  heroSection: {
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
  };
  aboutSection?: {
    title: string;
    content: string;
    image?: {
      url: string;
      alt: string;
    };
  };
  featuredMenuItems: MenuCategoryProps[];
  reservationSection: {
    title?: string;
    subtitle?: string;
    darkMode?: boolean;
    reservationUrl?: string;
  };
  testimonials?: Array<{
    id: string;
    quote: string;
    author: string;
    rating?: number;
  }>;
}

export function RestaurantHome({
  heroSection,
  aboutSection,
  featuredMenuItems,
  reservationSection,
  testimonials,
}: RestaurantHomeProps) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full">
        <RestaurantHero
          title={heroSection.title}
          subtitle={heroSection.subtitle}
          backgroundImage={heroSection.backgroundImage}
          cta={heroSection.cta}
          height="large"
        />
      </section>

      {/* About Section (if provided) */}
      {aboutSection && (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {aboutSection.image && (
                <div className="w-full md:w-1/2">
                  <div className="rounded-lg overflow-hidden">
                    <img
                      src={aboutSection.image.url}
                      alt={aboutSection.image.alt}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>
              )}
              <div className={`w-full ${aboutSection.image ? "md:w-1/2" : ""}`}>
                <h2 className="text-3xl font-bold mb-4">
                  {aboutSection.title}
                </h2>
                <div className="prose max-w-none">{aboutSection.content}</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Featured Menu Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">
            Featured Menu
          </h2>
          <MenuDisplay
            categories={featuredMenuItems}
            variant="grid"
            highlightSpecials={true}
            showImages={true}
          />
          {heroSection.cta && (
            <div className="mt-8 text-center">
              <a
                href="/menu"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                View Full Menu
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Section (if provided) */}
      {testimonials && testimonials.length > 0 && (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10">
              What Our Guests Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-background p-6 rounded-lg shadow-md"
                >
                  {testimonial.rating && (
                    <div className="flex items-center mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={i}
                          className={`w-5 h-5 ${
                            i < testimonial.rating!
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  )}
                  <p className="text-lg italic mb-4">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <p className="font-semibold">— {testimonial.author}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Reservation Section */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto">
            <ReservationWidget
              title={reservationSection.title}
              subtitle={reservationSection.subtitle}
              darkMode={reservationSection.darkMode}
              reservationUrl={reservationSection.reservationUrl}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

// Example of Prismic integration
export const PrismicRestaurantHomeExample = `
import { createClient } from '@prismicio/client';
import { RestaurantHome } from '@/components/templates/restaurant-home';
import { transformPrismicMenuData } from '@/components/restaurant/menu-formatter';

export async function HomePage() {
  const client = createClient('your-repository-name');
  
  // Fetch homepage data from Prismic
  const homepage = await client.getSingle('homepage');
  
  // Fetch menu data for featured items
  const menuData = await client.getSingle('menu_page');
  const allCategories = transformPrismicMenuData(menuData);
  
  // Filter for featured items only
  const featuredMenuItems = allCategories.map(category => ({
    ...category,
    items: category.items.filter(item => item.isSpecial)
  })).filter(category => category.items.length > 0);
  
  // Fetch testimonials
  const testimonialData = await client.getAllByType('testimonial');
  const testimonials = testimonialData.map(item => ({
    id: item.id,
    quote: item.data.quote,
    author: item.data.author,
    rating: item.data.rating || 5
  }));
  
  return (
    <RestaurantHome
      heroSection={{
        title: homepage.data.hero_title,
        subtitle: homepage.data.hero_subtitle,
        backgroundImage: {
          url: homepage.data.hero_background.url,
          alt: homepage.data.hero_background.alt
        },
        cta: homepage.data.hero_cta_text ? {
          text: homepage.data.hero_cta_text,
          url: homepage.data.hero_cta_link.url
        } : undefined
      }}
      aboutSection={{
        title: homepage.data.about_title,
        content: homepage.data.about_content,
        image: homepage.data.about_image.url ? {
          url: homepage.data.about_image.url,
          alt: homepage.data.about_image.alt
        } : undefined
      }}
      featuredMenuItems={featuredMenuItems}
      reservationSection={{
        title: homepage.data.reservation_title,
        subtitle: homepage.data.reservation_subtitle,
        darkMode: homepage.data.reservation_dark_mode,
        reservationUrl: homepage.data.reservation_url
      }}
      testimonials={testimonials}
    />
  );
}
`;
