# Bright Component Registry Technical Documentation

## 1. Architectural Overview

### 1.1 Registry Architecture

The Bright Component Registry is built on shadcn/ui's registry system, providing a collection of high-quality React components designed for various web applications across multiple industry sectors. The architecture follows a functional-first approach with clear separation of concerns, which was deliberately chosen to enable maximum component reuse across industry verticals while preserving domain-specific implementation capabilities.

### 1.2 Directory Structure

```
/
├── app/                    # Next.js application routes
├── components/             # Base application components
│   ├── ui/                 # shadcn/ui base components
│   └── [app components]    # App-specific components
├── registry/               # Component registry
│   ├── restaurant-components/  # Restaurant-specific components (example domain)
│   │   ├── hero/           # Hero section components
│   │   ├── menu-display/   # Menu display components
│   │   ├── reservation/    # Reservation components
│   │   ├── testimonials/   # Testimonial components
│   │   ├── food-gallery/   # Food gallery components
│   │   └── layout/         # Layout components
│   ├── page-templates/     # Full page templates
│   ├── hello-world/        # Simple example component
│   ├── complex-component/  # Complex component example
│   └── example-form/       # Form example component
├── lib/                    # Utility functions and helpers
├── registry.json           # Registry definition file
└── components.json         # shadcn/ui configuration
```

### 1.3 Rationale for Structure

The directory structure follows a functional-first approach where:

1. **Separation by Domain**: Components are organized by their domain (e.g., restaurant, e-commerce, healthcare) and function (hero, forms, galleries, etc.) rather than by technical type.

2. **Self-contained Components**: Each component in the registry is self-contained within its directory, including all related files:
   - Main component file (`.tsx`)
   - Utility functions (`.ts`)
   - Custom hooks (`use-*.ts`)
   - Demo components (`*-demo.tsx`)

3. **Registry Definition**: All components are defined in the central `registry.json` file, making it easy to discover and install components through the shadcn CLI.

4. **Dependency Management**: Component dependencies are explicitly defined in the registry, making it clear what needs to be installed for each component to work properly.

## 2. Developer Onboarding

### 2.1 Adding a New Component to the Registry

Follow these steps to add a new component to the registry:

#### Step 1: Create the component directory and files

```bash
# Example: Adding a new "food-item-card" component
mkdir -p registry/restaurant-components/food-item-card
touch registry/restaurant-components/food-item-card/food-item-card.tsx
```
 
#### Step 2: Implement the component
(This is a v0 placeholder)

```tsx
// registry/restaurant-components/food-item-card/food-item-card.tsx
import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface FoodItemCardProps {
  name: string;
  description: string;
  price: string;
  image?: {
    url: string;
    alt: string;
  };
  tags?: string[];
  isSpecial?: boolean;
}

export function FoodItemCard({
  name,
  description,
  price,
  image,
  tags = [],
  isSpecial = false,
}: FoodItemCardProps) {
  return (
    <Card className="overflow-hidden">
      {image && (
        <div className="relative h-48 w-full">
          <img
            src={image.url}
            alt={image.alt}
            className="object-cover w-full h-full"
          />
          {isSpecial && (
            <Badge className="absolute top-2 right-2">Special</Badge>
          )}
        </div>
      )}
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-bold">{name}</h3>
          <span className="font-medium text-primary">{price}</span>
        </div>
        <p className="text-sm text-gray-600 mb-2">{description}</p>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}

// TODO: Add better Prismic integration example from CB/Daniel
export const PrismicFoodItemCardExample = `
// Example of using the FoodItemCard with Prismic data
import { createClient } from '@prismicio/client';
import { FoodItemCard } from '@/components/food-item-card';

export async function FeaturedItem() {
  const client = createClient('your-repo-name');
  const menuItem = await client.getByUID('menu_item', 'featured-item');
  
  return (
    <FoodItemCard
      name={menuItem.data.name}
      description={menuItem.data.description}
      price={menuItem.data.price}
      image={menuItem.data.image.url ? {
        url: menuItem.data.image.url,
        alt: menuItem.data.image.alt
      } : undefined}
      tags={menuItem.data.tags}
      isSpecial={menuItem.data.is_special}
    />
  );
}
`;
```

#### Step 3: Add component to registry.json

```json
// Add this to the "items" array in registry.json
{
  "name": "food-item-card",
  "type": "registry:component",
  "title": "Food Item Card",
  "description": "Card component for displaying food items with image, description, price and tags",
  "registryDependencies": ["card", "badge"],
  "files": [
    {
      "path": "registry/restaurant-components/food-item-card/food-item-card.tsx",
      "type": "registry:component"
    }
  ]
}
```

#### Step 4: Create any additional files (utilities, hooks, etc.)

For example, if your component requires a utility function:

```typescript
// registry/restaurant-components/food-item-card/card-utils.ts
export function formatPrice(price: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(price);
}
```

Then update the registry.json entry to include this file:

```json
"files": [
  {
    "path": "registry/restaurant-components/food-item-card/food-item-card.tsx",
    "type": "registry:component"
  },
  {
    "path": "registry/restaurant-components/food-item-card/card-utils.ts",
    "type": "registry:lib"
  }
]
```

### 2.2 Component Structure Best Practices

When creating components for the registry, follow these best practices:

1. **Clear Props Interface**: Define a clear TypeScript interface for component props.
2. **Default Values**: Provide sensible defaults for optional props.
3. **Responsive Design**: Ensure components work well on all screen sizes.
4. **Accessibility**: Include proper ARIA attributes and keyboard navigation.
5. **Documentation**: Include JSDoc comments and usage examples.
6. **Prismic Integration**: Include examples of how to use the component with Prismic CMS data.
7. **Composition**: Design components to be easily composable with other components.

## 3. Integration Protocols

### 3.1 Consuming Registry Components in Client Projects

#### Using the shadcn CLI

```bash
# Add components to your project using the industry-standard pattern
npx shadcn-ui@latest add component-name --from=https://toolkit.bright-development.com

# Examples:
npx shadcn-ui@latest add button card --from=https://toolkit.bright-development.com
npx shadcn-ui@latest add restaurant-hero menu-display --from=https://toolkit.bright-development.com
```

This approach eliminates potential dependency conflicts and ensures consistent implementation across projects.

#### Manual Installation

If you prefer to manually add components(weird, but ok):

1. Copy the component files from the registry to your project
2. Ensure all dependencies are installed
3. Update import paths as needed

### 3.2 Prismic CMS Integration

The registry components are designed to work seamlessly with Prismic CMS. Each component includes a Prismic integration example.

#### Example: Restaurant Hero with Prismic

```tsx
// Example of using the Hero component with Prismic data
import { createClient } from '@prismicio/client';
import { RestaurantHero } from '@/components/restaurant/hero';

// In your page component
export async function HomePage() {
  const client = createClient('your-repo-name');
  const page = await client.getSingle('home_page');
  
  return (
    <RestaurantHero
      title={page.data.hero_title}
      subtitle={page.data.hero_subtitle}
      backgroundImage={{
        url: page.data.hero_background.url,
        alt: page.data.hero_background.alt
      }}
      cta={page.data.hero_cta_text ? {
        text: page.data.hero_cta_text,
        url: page.data.hero_cta_link.url
      } : undefined}
      overlay={page.data.hero_overlay ?? true}
      height={page.data.hero_height ?? "medium"}
      textAlign={page.data.hero_text_align ?? "center"}
      textColor={page.data.hero_text_color ?? "white"}
    />
  );
}
```

#### Prismic Custom Type Setup

For optimal integration, set up your Prismic custom types to match the component props. The registry includes examples specific to each component's integration requirements.

### 3.3 Component Relationships

```
Base Components (shadcn/ui)
├── Button
├── Card
├── Input
├── Label
├── Textarea
├── Select
├── Badge
├── Tabs
├── Popover
└── Calendar
    │
    ▼
Domain-Specific Components
├── Restaurant Components
│   ├── RestaurantHero
│   ├── MenuDisplay
│   ├── ReservationWidget
│   ├── TestimonialsCarousel
│   ├── FoodGallery
│   └── RestaurantSectionLayout
├── E-commerce Components (future)
├── Healthcare Components (future)
└── Other Domain Components (future)
    │
    ▼
Page Templates
└── Domain-Specific Page Templates
```
### 3.4 Local Development Workflow 
Developers can leverage our local testing infra for component development:
```bash
pnpm dev
```
in another repo
```bash
pnpm dlx shadcn@latest add http://localhost:3000/r/component-name/registry-item.json
```

This pattern enables 
- Pre-publication validation in implementation contexts
- Rapid iteration cycles without deployment overhead
- Concurrent development across multiple client projects

## 4. Implementation Standards and Best Practices

### 4.1 Code Standards

- **TypeScript**: Use TypeScript for all components and utilities
- **Props Interface**: Each component should have a well-defined props interface
- **JSDoc Comments**: Include JSDoc comments for props and functions
- **File Naming**: Use kebab-case for files and PascalCase for components
- **Default Exports**: Use named exports rather than default exports

### 4.2 Styling Standards

- **Tailwind CSS**: Use Tailwind for all styling
- **Variants**: Use the cva pattern for component variants
- **Dark Mode**: Ensure all components work in both light and dark mode
- **Responsive Design**: Design components to work on all screen sizes

### 4.3 Accessibility Standards

- **ARIA Attributes**: Include appropriate ARIA attributes
- **Keyboard Navigation**: Ensure all interactive elements are keyboard accessible
- **Screen Reader Text**: Include screen reader text for visual elements
- **Color Contrast**: Ensure sufficient color contrast for text

### 4.4 Performance Considerations

- **Lazy Loading**: Use lazy loading for images and heavy components
- **Component Splitting**: Split large components into smaller, reusable pieces
- **Memoization**: Use React.memo and useMemo for expensive calculations

## 5. CMS Integration Considerations

### 5.1 Prismic Integration

- **Content Structure**: Design components to match Prismic content structure
- **Slices**: Use Prismic slices for flexible content sections
- **Image Optimization**: Use Prismic's image optimization features
- **Preview Mode**: Support Prismic's preview mode for content editors

### 5.2 Other CMS Options

- **Contentful**: Components can be adapted for Contentful with similar field structures
- **Sanity**: Components can be adapted for Sanity with similar content models
- **Strapi**: Components can be adapted for Strapi with similar content types
- **PayloadCMS**: TODO: Prio here

## 6. Conclusion

The Bright Component Registry provides a powerful foundation for building all types of web applications with Next.js and shadcn/ui. While the initial focus was on restaurant websites, the architecture and patterns can be extended to any domain that Bright Development works with, including e-commerce, healthcare, finance, and more.

By following the architecture, development patterns, and integration protocols outlined in this documentation, developers can efficiently create high-quality, accessible, and performant websites across various industries and use cases.

For additional help or contributions to the registry, please refer to the project's GitHub repository.

---

*Documentation created for the Bright-Toolkit Registry - A shadcn/ui component registry for web applications developed by Bright Development.*
