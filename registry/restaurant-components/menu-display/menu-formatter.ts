import { MenuCategoryProps, MenuItemProps } from "./menu-display";

/**
 * Sorts menu items by price from lowest to highest
 */
export function sortMenuItemsByPrice(items: MenuItemProps[]): MenuItemProps[] {
  return [...items].sort((a, b) => {
    // Extract numeric values from price strings (assuming format like "$10.99")
    const priceA = parseFloat(a.price.replace(/[^0-9.]/g, ""));
    const priceB = parseFloat(b.price.replace(/[^0-9.]/g, ""));

    return priceA - priceB;
  });
}

/**
 * Sorts menu items by name alphabetically
 */
export function sortMenuItemsByName(items: MenuItemProps[]): MenuItemProps[] {
  return [...items].sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Filters menu items by tag
 */
export function filterMenuItemsByTag(
  items: MenuItemProps[],
  tag: string
): MenuItemProps[] {
  return items.filter((item) => item.tags?.includes(tag));
}

/**
 * Puts special items at the top of the list
 */
export function prioritizeSpecialItems(
  items: MenuItemProps[]
): MenuItemProps[] {
  return [...items].sort((a, b) => {
    if (a.isSpecial && !b.isSpecial) return -1;
    if (!a.isSpecial && b.isSpecial) return 1;
    return 0;
  });
}

/**
 * Formats a numeric price to a price string with currency symbol
 */
export function formatPrice(price: number, currency: string = "$"): string {
  return `${currency}${price.toFixed(2)}`;
}

/**
 * Transforms Prismic menu data to component props
 * This is an example function that would need to be adjusted
 * based on your actual Prismic schema
 */
export function transformPrismicMenuData(
  prismicData: any
): MenuCategoryProps[] {
  if (!prismicData?.data?.menu_categories) {
    return [];
  }

  return prismicData.data.menu_categories.map((category: any) => ({
    id:
      category.category_id ||
      `category-${Math.random().toString(36).substr(2, 9)}`,
    name: category.category_name || "Untitled Category",
    description: category.category_description || "",
    items: (category.items || []).map((item: any) => ({
      id: item.item_id || `item-${Math.random().toString(36).substr(2, 9)}`,
      name: item.item_name || "Untitled Item",
      description: item.item_description || "",
      price: item.item_price || "$0.00",
      isSpecial: Boolean(item.is_special),
      tags: item.tags || [],
      imageUrl: item.item_image?.url || "",
      allergens: item.allergens || [],
    })),
  }));
}

// Example usage
export const ExampleUsage = `
import { 
  transformPrismicMenuData,
  sortMenuItemsByPrice,
  prioritizeSpecialItems
} from '@/components/restaurant/menu-formatter';
import { createClient } from '@prismicio/client';

export async function getMenuData() {
  const client = createClient('your-repo-name');
  const menuData = await client.getSingle('menu_page');
  
  // Transform the raw Prismic data to our component format
  const categories = transformPrismicMenuData(menuData);
  
  // Process the data - put specials at the top, then sort by price
  const processedCategories = categories.map(category => ({
    ...category,
    items: sortMenuItemsByPrice(prioritizeSpecialItems(category.items))
  }));
  
  return processedCategories;
}
`;
