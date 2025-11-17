import type { InventoryCategory } from "./types";

export const inventoryCategories: InventoryCategory[] = [
  {
    slug: "nnn",
    name: "NNN Properties",
    route: "/inventory/nnn",
    note: "Triple net lease properties with tenant responsibility for taxes, insurance, and maintenance",
    heroImage: "/inventory/nnn-1031-exchange.jpg",
  },
  {
    slug: "retail",
    name: "Retail Properties",
    route: "/inventory/retail",
    note: "Single tenant retail properties suitable for 1031 exchange",
    heroImage: "/inventory/retail-1031-exchange.jpg",
  },
  {
    slug: "industrial",
    name: "Industrial Properties",
    route: "/inventory/industrial",
    note: "Industrial and logistics properties for exchange",
    heroImage: "/inventory/industrial-1031-exchange.jpg",
  },
  {
    slug: "medical",
    name: "Medical Properties",
    route: "/inventory/medical",
    note: "Medical office buildings and clinics",
    heroImage: "/inventory/medical-1031-exchange.jpg",
  },
  {
    slug: "auto",
    name: "Auto Related Properties",
    route: "/inventory/auto",
    note: "Auto parts, service, and tire stores",
    heroImage: "/inventory/auto-1031-exchange.jpg",
  },
  {
    slug: "food-service",
    name: "Food Service Properties",
    route: "/inventory/food-service",
    note: "Quick service restaurants and drive thru properties",
    heroImage: "/inventory/food-service-1031-exchange.jpg",
  },
];

