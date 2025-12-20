export interface Product {
  id: string;
  name: string;
  price: number;
  unit: string;
  image: string;
  category: string;
  sku: string;
}

export interface Category {
  id: string;
  name: string;
  count: number;
}

export const categories: Category[] = [
  { id: "60v-lithium", name: "60V Lithium Charger", count: 8 },
  { id: "48v-lithium", name: "48V Lithium Charger", count: 6 },
  { id: "72v-lithium", name: "72V Lithium Charger", count: 5 },
  { id: "liners-brake", name: "Liners & Brake Cables", count: 12 },
  { id: "controllers", name: "Controllers", count: 9 },
  { id: "motors", name: "Hub Motors", count: 7 },
  { id: "batteries", name: "Battery Packs", count: 4 },
  { id: "accessories", name: "Accessories", count: 15 },
];

export const products: Product[] = [
  // 60V Lithium Chargers
  {
    id: "1",
    name: "[IMP 67.2V+6A] LITHIUM EV CHARGER (0268)",
    price: 748,
    unit: "PCS",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop",
    category: "60v-lithium",
    sku: "0268"
  },
  {
    id: "2",
    name: "[IMP 67.2V+5A] LITHIUM EV CHARGER (0269)",
    price: 698,
    unit: "PCS",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop",
    category: "60v-lithium",
    sku: "0269"
  },
  {
    id: "3",
    name: "[IMP 67.2V+4A] LITHIUM EV CHARGER (0270)",
    price: 648,
    unit: "PCS",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop",
    category: "60v-lithium",
    sku: "0270"
  },
  {
    id: "4",
    name: "[IMP 67.2V+3A] LITHIUM EV CHARGER (0271)",
    price: 598,
    unit: "PCS",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop",
    category: "60v-lithium",
    sku: "0271"
  },
  {
    id: "5",
    name: "[IMP 67.2V+8A] FAST LITHIUM CHARGER (0272)",
    price: 898,
    unit: "PCS",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop",
    category: "60v-lithium",
    sku: "0272"
  },
  {
    id: "6",
    name: "[IMP 67.2V+10A] RAPID CHARGER (0273)",
    price: 1048,
    unit: "PCS",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop",
    category: "60v-lithium",
    sku: "0273"
  },
  {
    id: "7",
    name: "[IMP 67.2V+2A] COMPACT CHARGER (0274)",
    price: 498,
    unit: "PCS",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop",
    category: "60v-lithium",
    sku: "0274"
  },
  {
    id: "8",
    name: "[IMP 67.2V+6A] PREMIUM CHARGER (0275)",
    price: 848,
    unit: "PCS",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop",
    category: "60v-lithium",
    sku: "0275"
  },

  // 48V Lithium Chargers
  {
    id: "9",
    name: "[IMP 54.6V+5A] LITHIUM EV CHARGER (0280)",
    price: 648,
    unit: "PCS",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop",
    category: "48v-lithium",
    sku: "0280"
  },
  {
    id: "10",
    name: "[IMP 54.6V+4A] LITHIUM EV CHARGER (0281)",
    price: 598,
    unit: "PCS",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop",
    category: "48v-lithium",
    sku: "0281"
  },
  {
    id: "11",
    name: "[IMP 54.6V+3A] LITHIUM EV CHARGER (0282)",
    price: 548,
    unit: "PCS",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop",
    category: "48v-lithium",
    sku: "0282"
  },
  {
    id: "12",
    name: "[IMP 54.6V+6A] FAST CHARGER (0283)",
    price: 748,
    unit: "PCS",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop",
    category: "48v-lithium",
    sku: "0283"
  },
  {
    id: "13",
    name: "[IMP 54.6V+8A] RAPID CHARGER (0284)",
    price: 898,
    unit: "PCS",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop",
    category: "48v-lithium",
    sku: "0284"
  },
  {
    id: "14",
    name: "[IMP 54.6V+2A] COMPACT CHARGER (0285)",
    price: 448,
    unit: "PCS",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop",
    category: "48v-lithium",
    sku: "0285"
  },

  // 72V Lithium Chargers
  {
    id: "15",
    name: "[IMP 84V+5A] LITHIUM EV CHARGER (0290)",
    price: 848,
    unit: "PCS",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop",
    category: "72v-lithium",
    sku: "0290"
  },
  {
    id: "16",
    name: "[IMP 84V+6A] LITHIUM EV CHARGER (0291)",
    price: 948,
    unit: "PCS",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop",
    category: "72v-lithium",
    sku: "0291"
  },
  {
    id: "17",
    name: "[IMP 84V+4A] LITHIUM EV CHARGER (0292)",
    price: 798,
    unit: "PCS",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop",
    category: "72v-lithium",
    sku: "0292"
  },
  {
    id: "18",
    name: "[IMP 84V+8A] FAST CHARGER (0293)",
    price: 1148,
    unit: "PCS",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop",
    category: "72v-lithium",
    sku: "0293"
  },
  {
    id: "19",
    name: "[IMP 84V+10A] RAPID CHARGER (0294)",
    price: 1348,
    unit: "PCS",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop",
    category: "72v-lithium",
    sku: "0294"
  },

  // Liners & Brake Cables
  {
    id: "20",
    name: "FRONT BRAKE CABLE ASSEMBLY (0300)",
    price: 125,
    unit: "PCS",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop",
    category: "liners-brake",
    sku: "0300"
  },
  {
    id: "21",
    name: "REAR BRAKE CABLE ASSEMBLY (0301)",
    price: 145,
    unit: "PCS",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop",
    category: "liners-brake",
    sku: "0301"
  },
  {
    id: "22",
    name: "BRAKE LINER SET - FRONT (0302)",
    price: 85,
    unit: "SET",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop",
    category: "liners-brake",
    sku: "0302"
  },
  {
    id: "23",
    name: "BRAKE LINER SET - REAR (0303)",
    price: 95,
    unit: "SET",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop",
    category: "liners-brake",
    sku: "0303"
  },
  {
    id: "24",
    name: "UNIVERSAL BRAKE CABLE (0304)",
    price: 75,
    unit: "PCS",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop",
    category: "liners-brake",
    sku: "0304"
  },

  // Controllers
  {
    id: "25",
    name: "48V 25A SINE WAVE CONTROLLER (0400)",
    price: 1250,
    unit: "PCS",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop",
    category: "controllers",
    sku: "0400"
  },
  {
    id: "26",
    name: "60V 30A SINE WAVE CONTROLLER (0401)",
    price: 1450,
    unit: "PCS",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop",
    category: "controllers",
    sku: "0401"
  },
  {
    id: "27",
    name: "72V 35A SINE WAVE CONTROLLER (0402)",
    price: 1650,
    unit: "PCS",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop",
    category: "controllers",
    sku: "0402"
  },

  // Motors
  {
    id: "28",
    name: "350W HUB MOTOR - REAR (0500)",
    price: 3500,
    unit: "PCS",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop",
    category: "motors",
    sku: "0500"
  },
  {
    id: "29",
    name: "500W HUB MOTOR - REAR (0501)",
    price: 4500,
    unit: "PCS",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop",
    category: "motors",
    sku: "0501"
  },
  {
    id: "30",
    name: "750W HUB MOTOR - REAR (0502)",
    price: 5500,
    unit: "PCS",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop",
    category: "motors",
    sku: "0502"
  },

  // Batteries
  {
    id: "31",
    name: "48V 20AH LITHIUM BATTERY PACK (0600)",
    price: 12500,
    unit: "PCS",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop",
    category: "batteries",
    sku: "0600"
  },
  {
    id: "32",
    name: "60V 24AH LITHIUM BATTERY PACK (0601)",
    price: 15500,
    unit: "PCS",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop",
    category: "batteries",
    sku: "0601"
  },

  // Accessories
  {
    id: "33",
    name: "LED HEADLIGHT ASSEMBLY (0700)",
    price: 450,
    unit: "PCS",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop",
    category: "accessories",
    sku: "0700"
  },
  {
    id: "34",
    name: "DIGITAL SPEEDOMETER (0701)",
    price: 650,
    unit: "PCS",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop",
    category: "accessories",
    sku: "0701"
  },
  {
    id: "35",
    name: "HANDLEBAR GRIP SET (0702)",
    price: 150,
    unit: "SET",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop",
    category: "accessories",
    sku: "0702"
  },
];
