# Bright Component Registry 

A curated collection of high-quality React components for restaurant websites and food service applications, built by [Bright Development](https://bright-development.com).

<!-- ![Toolkit Preview](https://placehold pub /800x400?text=Bright+Toolkit+Registry) -->

## What's Inside

This registry is packed with restaurant-focused components that'll level up your Next.js projects:

- **Complete section layouts** with thoughtful spacing, theming, and decorative elements
- **Hero components** with parallax effects and customizable CTAs
- **Menu displays** that showcase your culinary creations with style
- **Reservation widgets** for seamless booking experiences
- **Food galleries** with masonry layouts and filtering
- **Testimonial carousels** to highlight happy customers

(SAMPLE PoC NOT COMPANY OPERATED)

All components are built with accessibility, performance, and developer experience in mind (YMMV SAMPLE COMPONENTS).

## Quick Start

Getting these components into your project is straightforward:

```bash
# Install the shadcn CLI if you haven't already
npm install -g shadcn

# Add components to your project
!!!WARN This doesnt currently work because registry is not serviced
shadcn add button card calendar tabs badge select -r https://toolkit.bright-development.com
shadcn add restaurant-hero menu-display reservation-widget -r https://toolkit.bright-development.com
```

## Running This Registry Locally

If you want to explore the components or contribute:

```bash
# Clone the repo
git clone https://github.com/bright-dev/toolkit-registry.git
cd toolkit-registry

# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

Then open [http://localhost:3000](http://localhost:3000) to see the registry in action.

## Component Showcase

### Restaurant Section Layout

Our flexible section layout component that brings consistency and style to your restaurant pages:

```tsx
import { RestaurantSectionLayout } from "@/components/restaurant-section-layout";

export function AboutSection() {
  return (
    <RestaurantSectionLayout 
      background="accent" 
      spacing="normal"
      decorativeElement="wave"
      decorativePosition="top"
    >
      <h2 className="text-3xl font-serif mb-4">Our Story</h2>
      <p>Your compelling restaurant story goes here...</p>
    </RestaurantSectionLayout>
  );
}
```

### Menu Display

Showcase your culinary offerings with an elegant, interactive menu:

```tsx
import { MenuDisplay } from "@/components/menu-display";

const menuCategories = [
  {
    id: "starters",
    name: "Starters",
    description: "Begin your culinary journey",
    items: [
      {
        id: "1",
        name: "Crispy Calamari",
        description: "Lightly fried with lemon aioli",
        price: "$12.95",
        isSpecial: true
      },
      // More menu items...
    ]
  },
  // More categories...
];

export function OurMenu() {
  return (
    <MenuDisplay 
      categories={menuCategories} 
      variant="grid"
      highlightSpecials={true}
    />
  );
}
```

## Customization

Each component accepts a range of props for customization. Check the component documentation for details on customizing colors, spacing, layouts and more.

## How It Works

This registry is built on:

- **Next.js 15** with Turbopack for blazing-fast development
- **Tailwind CSS** for styling
- **shadcn/ui** for the component registry system
- **TypeScript** for type safety

## Contributing

We welcome contributions! If you'd like to improve existing components or add new ones:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-component`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-component`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Created By

Built with ❤️ by [Isaac Hall](https://github.com/isaaccdhall) and the team at [Bright Development](https://bright-development.com).

---

*"Cheesy Quote by someone goes here" — Isaac Christopher*
