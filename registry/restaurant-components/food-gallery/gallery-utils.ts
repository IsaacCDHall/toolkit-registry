import { GalleryItem } from "./food-gallery";

/**
 * Generate sample food gallery items for demonstration purposes
 *
 * @returns Array of GalleryItem objects
 */
export function getSampleGalleryItems(): GalleryItem[] {
  return [
    {
      id: "dish-1",
      src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
      alt: "Grilled salmon dish",
      width: 1200,
      height: 800,
      category: "Main Course",
      description:
        "Pan-seared Atlantic salmon with lemon dill sauce and seasonal vegetables",
    },
    {
      id: "dish-2",
      src: "https://images.unsplash.com/photo-1551183053-bf91a1d81141",
      alt: "Chocolate dessert",
      width: 1200,
      height: 1600, // Taller image for masonry layout
      category: "Dessert",
      description:
        "Chocolate lava cake with vanilla bean ice cream and berry compote",
    },
    {
      id: "dish-3",
      src: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe",
      alt: "Fresh salad",
      width: 1200,
      height: 800,
      category: "Appetizer",
      description:
        "Organic mixed greens with house-made vinaigrette, local goat cheese and candied walnuts",
    },
    {
      id: "dish-4",
      src: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327",
      alt: "Steak dinner",
      width: 1200,
      height: 900,
      category: "Main Course",
      description:
        "Dry-aged ribeye steak with truffle mashed potatoes and roasted asparagus",
    },
    {
      id: "dish-5",
      src: "https://images.unsplash.com/photo-1563805042-7684c019e1cb",
      alt: "Artisan cocktail",
      width: 1200,
      height: 1800, // Taller image for masonry layout
      category: "Drinks",
      description:
        "Hand-crafted old fashioned with house-made bitters and orange zest",
    },
    {
      id: "dish-6",
      src: "https://images.unsplash.com/photo-1534766555764-ce878a5e3a2b",
      alt: "Seafood appetizer",
      width: 1200,
      height: 800,
      category: "Appetizer",
      description: "Fresh oysters with mignonette sauce and lemon",
    },
    {
      id: "dish-7",
      src: "https://images.unsplash.com/photo-1551024506-0bccd828d307",
      alt: "Vegetarian entree",
      width: 1200,
      height: 800,
      category: "Main Course",
      description: "Wild mushroom risotto with truffle oil and parmesan crisp",
    },
    {
      id: "dish-8",
      src: "https://images.unsplash.com/photo-1513442542250-854d436a73f2",
      alt: "Signature dessert",
      width: 1200,
      height: 900,
      category: "Dessert",
      description:
        "Deconstructed tiramisu with espresso reduction and mascarpone cream",
    },
    {
      id: "dish-9",
      src: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543",
      alt: "Craft beer",
      width: 1200,
      height: 800,
      category: "Drinks",
      description: "House-brewed IPA with notes of citrus and pine",
    },
  ];
}

/**
 * Format Prismic gallery data to match component structure
 *
 * @param prismicData Raw data from Prismic CMS
 * @returns Formatted gallery items array
 */
export interface PrismicGalleryItem {
  id?: string;
  data?: {
    image?: {
      url?: string;
      alt?: string;
      dimensions?: {
        width?: number;
        height?: number;
      };
    };
    title?: { text?: string };
    description?: { text?: string };
    category?: { text?: string };
  };
}

export function formatPrismicGalleryItems(
  prismicData: PrismicGalleryItem[]
): GalleryItem[] {
  if (!prismicData || !Array.isArray(prismicData)) {
    return [];
  }

  return prismicData
    .filter((item) => item?.data?.image?.url) // Only include items with images
    .map((item, index) => ({
      id: item.id || `gallery-item-${index}`,
      src: item.data?.image?.url || "",
      alt:
        item.data?.image?.alt ||
        item.data?.title?.text ||
        `Gallery image ${index}`,
      width: item.data?.image?.dimensions?.width || 1200,
      height: item.data?.image?.dimensions?.height || 800,
      category: item.data?.category?.text || undefined,
      description: item.data?.description?.text || undefined,
    }));
}
