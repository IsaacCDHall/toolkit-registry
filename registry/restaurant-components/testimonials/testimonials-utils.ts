import { TestimonialItem } from "./testimonials-carousel";

/**
 * Generate sample restaurant testimonials data for demonstration purposes
 *
 * @param count Number of testimonials to generate
 * @returns Array of TestimonialItem objects
 */
export function getSampleTestimonials(count: number = 4): TestimonialItem[] {
  const sampleTestimonials: TestimonialItem[] = [
    {
      id: "t1",
      author: "Sarah Johnson",
      role: "Food Critic",
      content:
        "The tasting menu was a revelation. Each dish told a story of local ingredients and global inspiration.",
      rating: 5,
      image: {
        url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
        alt: "Sarah Johnson profile photo",
      },
      date: "March 15, 2023",
    },
    {
      id: "t2",
      author: "Michael Chen",
      role: "Local Diner",
      content:
        "We celebrated our anniversary here and the staff made it unforgettable. The wine pairing was exceptional.",
      rating: 4.5,
      date: "January 20, 2023",
    },
    {
      id: "t3",
      author: "Emma Williams",
      role: "Food Blogger",
      content:
        "The seasonal menu showcases incredible attention to detail. Their commitment to local farmers shines through in every bite.",
      rating: 5,
      image: {
        url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
        alt: "Emma Williams profile photo",
      },
      date: "February 2, 2023",
    },
    {
      id: "t4",
      author: "David Rodriguez",
      content:
        "Best dining experience in the city! The ambiance is perfect for special occasions.",
      rating: 4,
      date: "December 15, 2022",
    },
    {
      id: "t5",
      author: "Olivia Lee",
      role: "First-time Guest",
      content:
        "From the moment we walked in, the service was impeccable. Can't wait to return for the seasonal menu change.",
      rating: 5,
      date: "April 8, 2023",
    },
    {
      id: "t6",
      author: "James Thompson",
      role: "Regular Patron",
      content:
        "I've been dining here for years and the consistency is remarkable. The new chef's additions to the menu are brilliant.",
      rating: 4.5,
      image: {
        url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
        alt: "James Thompson profile photo",
      },
      date: "May 30, 2023",
    },
  ];

  // Return requested number of testimonials
  return sampleTestimonials.slice(
    0,
    Math.min(count, sampleTestimonials.length)
  );
}

/**
 * Interface representing the structure of Prismic testimonial data
 */
interface PrismicTestimonialData {
  id?: string;
  data?: {
    author_name?: { text?: string };
    author_role?: { text?: string };
    testimonial_text?: { text?: string };
    rating?: string | number;
    author_image?: {
      url?: string;
      alt?: string;
    };
    date?: string;
  };
}

/**
 * Format Prismic testimonials data to match component structure
 *
 * @param prismicData Raw data from Prismic CMS
 * @returns Formatted testimonials array
 */
export function formatPrismicTestimonials(
  prismicData: PrismicTestimonialData[]
): TestimonialItem[] {
  if (!prismicData || !Array.isArray(prismicData)) {
    return [];
  }

  return prismicData.map((item, index) => ({
    id: item.id || `testimonial-${index}`,
    author: item.data?.author_name?.text || "Anonymous",
    role: item.data?.author_role?.text || undefined,
    content: item.data?.testimonial_text?.text || "",
    rating: item.data?.rating
      ? parseFloat(String(item.data.rating)) || undefined
      : undefined,
    image: item.data?.author_image?.url
      ? {
          url: item.data.author_image.url,
          alt:
            item.data.author_image.alt ||
            `${item.data?.author_name?.text || "Anonymous"}'s photo`,
        }
      : undefined,
    date: item.data?.date
      ? new Date(item.data.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : undefined,
  }));
}
