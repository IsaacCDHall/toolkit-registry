import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface MenuItemProps {
  id: string;
  name: string;
  description?: string;
  price: string;
  isSpecial?: boolean;
  tags?: string[];
  imageUrl?: string;
  allergens?: string[];
}

export interface MenuCategoryProps {
  id: string;
  name: string;
  description?: string;
  items: MenuItemProps[];
}

export interface MenuDisplayProps {
  categories: MenuCategoryProps[];
  variant?: "grid" | "list";
  highlightSpecials?: boolean;
  showAllergens?: boolean;
  showImages?: boolean;
}

export function MenuDisplay({
  categories,
  variant = "grid",
  highlightSpecials = false,
  showAllergens = true,
  showImages = false,
}: MenuDisplayProps) {
  // If no categories, show empty state
  if (!categories || categories.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-muted-foreground">No menu items available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full">
      <Tabs defaultValue={categories[0]?.id} className="w-full">
        <TabsList className="mb-8 flex flex-wrap h-auto justify-center">
          {categories.map((category) => (
            <TabsTrigger
              key={category.id}
              value={category.id}
              className="px-4 py-2 data-[state=active]:font-medium"
            >
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="mt-0">
            {category.description && (
              <div className="mb-6 text-center">
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  {category.description}
                </p>
              </div>
            )}

            <div
              className={
                variant === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 gap-6"
                  : "space-y-6"
              }
            >
              {category.items.map((item) => (
                <MenuItemCard
                  key={item.id}
                  item={item}
                  highlightSpecials={highlightSpecials}
                  showAllergens={showAllergens}
                  showImage={showImages}
                />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

function MenuItemCard({
  item,
  highlightSpecials,
  showAllergens,
  showImage,
}: {
  item: MenuItemProps;
  highlightSpecials: boolean;
  showAllergens: boolean;
  showImage: boolean;
}) {
  return (
    <Card
      className={highlightSpecials && item.isSpecial ? "border-primary" : ""}
    >
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-semibold">
              {item.name}
              {highlightSpecials && item.isSpecial && (
                <Badge className="ml-2 bg-primary text-primary-foreground">
                  Special
                </Badge>
              )}
            </CardTitle>
            {item.tags && item.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-1">
                {item.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
          <span className="font-medium">{item.price}</span>
        </div>
      </CardHeader>
      <CardContent>
        {showImage && item.imageUrl && (
          <div className="w-full h-40 relative mb-4 overflow-hidden rounded-md">
            <img
              src={item.imageUrl}
              alt={item.name}
              className="object-cover w-full h-full"
            />
          </div>
        )}
        {item.description && (
          <CardDescription className="text-sm mt-1">
            {item.description}
          </CardDescription>
        )}
        {showAllergens && item.allergens && item.allergens.length > 0 && (
          <div className="mt-3 text-xs text-muted-foreground">
            <span className="font-medium">Allergens: </span>
            {item.allergens.join(", ")}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Example of Prismic integration
export const PrismicMenuExampleUsage = `
import { createClient } from '@prismicio/client';
import { MenuDisplay } from '@/components/restaurant/menu-display';

export async function RestaurantMenu() {
  const client = createClient('your-repository-name');
  
  // Fetch menu data from Prismic
  const menuData = await client.getSingle('menu_page');
  
  // Transform Prismic data to component props
  const categories = menuData.data.menu_categories.map(category => ({
    id: category.category_id,
    name: category.category_name,
    description: category.category_description,
    items: category.items.map(item => ({
      id: item.item_id,
      name: item.item_name,
      description: item.item_description,
      price: item.item_price,
      isSpecial: item.is_special,
      tags: item.tags,
      imageUrl: item.item_image?.url,
      allergens: item.allergens
    }))
  }));
  
  return (
    <div className="container mx-auto py-12">
      <h2 className="text-3xl font-bold text-center mb-10">Our Menu</h2>
      <MenuDisplay 
        categories={categories}
        variant="grid"
        highlightSpecials={true}
        showAllergens={true}
        showImages={true}
      />
    </div>
  );
}
`;
