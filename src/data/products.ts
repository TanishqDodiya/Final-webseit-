export interface Product {
  id: string;
  name: string;
  price: number;
  unit: string;
  image: string;
  images?: string[]; // Multiple images for gallery
  category: string;
  sku: string;
  description?: string;
  features?: string[];
  specifications?: { [key: string]: string };
  useCases?: string[];
  inStock: boolean;
  stockQuantity: number;
  rating?: number;
  reviewCount?: number;
  brand?: string;
  tags?: string[];
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
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&h=600&fit=crop"
    ],
    category: "60v-lithium",
    sku: "0268",
    description: "High-performance 67.2V 6A lithium battery charger designed for electric vehicles. Features advanced charging algorithms, temperature monitoring, and overcharge protection for safe and efficient charging.",
    features: [
      "Advanced charging algorithm for optimal battery life",
      "Temperature monitoring and protection",
      "Overcharge and short circuit protection",
      "LED status indicators",
      "Compact and lightweight design",
      "Universal compatibility with 60V lithium batteries"
    ],
    specifications: {
      "Input Voltage": "AC 100-240V, 50/60Hz",
      "Output Voltage": "67.2V DC",
      "Output Current": "6A",
      "Charging Time": "4-6 hours (depending on battery capacity)",
      "Efficiency": ">90%",
      "Operating Temperature": "-10°C to +45°C",
      "Dimensions": "180 x 85 x 60mm",
      "Weight": "0.8kg",
      "Certification": "CE, RoHS, FCC"
    },
    useCases: [
      "Electric scooters and bikes",
      "E-rickshaws and small EVs",
      "Electric wheelchairs",
      "Golf carts",
      "Industrial equipment"
    ],
    inStock: true,
    stockQuantity: 25,
    rating: 4.5,
    reviewCount: 128,
    brand: "ELYF",
    tags: ["charger", "60v", "lithium", "fast-charging", "portable"]
  },
  {
    id: "2",
    name: "[IMP 54.6V+5A] LITHIUM EV CHARGER (0280)",
    price: 648,
    unit: "PCS",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=600&fit=crop"
    ],
    category: "48v-lithium",
    sku: "0280",
    description: "Reliable 54.6V 5A lithium battery charger for 48V electric vehicle systems. Built with premium components for long-lasting performance and safety.",
    features: [
      "Smart charging technology",
      "Automatic voltage detection",
      "Thermal protection",
      "Reverse polarity protection",
      "Energy efficient design"
    ],
    specifications: {
      "Input Voltage": "AC 100-240V, 50/60Hz",
      "Output Voltage": "54.6V DC",
      "Output Current": "5A",
      "Charging Time": "3-5 hours",
      "Efficiency": ">88%",
      "Operating Temperature": "-5°C to +40°C",
      "Dimensions": "170 x 80 x 55mm",
      "Weight": "0.7kg"
    },
    useCases: [
      "Electric bicycles",
      "Small electric scooters",
      "Portable power tools",
      "Emergency backup systems"
    ],
    inStock: true,
    stockQuantity: 18,
    rating: 4.3,
    reviewCount: 89,
    brand: "ELYF",
    tags: ["charger", "48v", "lithium", "compact", "efficient"]
  },
  {
    id: "25",
    name: "48V 25A SINE WAVE CONTROLLER (0400)",
    price: 1250,
    unit: "PCS",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&h=600&fit=crop"
    ],
    category: "controllers",
    sku: "0400",
    description: "Advanced 48V 25A sine wave motor controller with regenerative braking and smooth acceleration control. Perfect for electric vehicles requiring precise motor control.",
    features: [
      "Pure sine wave output for smooth operation",
      "Regenerative braking system",
      "Programmable acceleration curves",
      "Over-current and over-voltage protection",
      "Temperature monitoring",
      "Bluetooth connectivity for configuration"
    ],
    specifications: {
      "Input Voltage": "36V-52V DC",
      "Rated Current": "25A",
      "Peak Current": "35A (30 seconds)",
      "Motor Type": "Brushless DC (BLDC)",
      "Control Method": "Sine wave (FOC)",
      "Efficiency": ">95%",
      "Operating Temperature": "-20°C to +60°C",
      "Dimensions": "120 x 80 x 40mm",
      "Weight": "0.5kg",
      "Protection": "IP65"
    },
    useCases: [
      "Electric bicycles and scooters",
      "Light electric vehicles",
      "Industrial automation",
      "Robotics applications",
      "Marine propulsion systems"
    ],
    inStock: true,
    stockQuantity: 12,
    rating: 4.7,
    reviewCount: 156,
    brand: "ELYF Pro",
    tags: ["controller", "48v", "sine-wave", "regenerative", "bluetooth"]
  },
  {
    id: "28",
    name: "350W HUB MOTOR - REAR (0500)",
    price: 3500,
    unit: "PCS",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=600&fit=crop"
    ],
    category: "motors",
    sku: "0500",
    description: "High-efficiency 350W rear hub motor with integrated planetary gear system. Designed for reliable performance in electric bicycles and light electric vehicles.",
    features: [
      "Brushless DC motor technology",
      "Integrated planetary gear reduction",
      "Waterproof design (IP65)",
      "Low noise operation",
      "High torque output",
      "Easy installation"
    ],
    specifications: {
      "Power Rating": "350W",
      "Voltage": "36V/48V compatible",
      "Speed": "25-35 km/h (depending on voltage)",
      "Torque": "35 Nm",
      "Efficiency": ">85%",
      "Wheel Size": "20\", 24\", 26\", 28\"",
      "Weight": "3.2kg",
      "Protection": "IP65",
      "Bearing": "Sealed ball bearings"
    },
    useCases: [
      "Electric bicycle conversion",
      "E-bike manufacturing",
      "Light electric scooters",
      "Cargo bikes",
      "Mobility aids"
    ],
    inStock: true,
    stockQuantity: 8,
    rating: 4.6,
    reviewCount: 203,
    brand: "ELYF Motors",
    tags: ["motor", "hub", "350w", "rear", "brushless", "waterproof"]
  },
  {
    id: "31",
    name: "48V 20AH LITHIUM BATTERY PACK (0600)",
    price: 12500,
    unit: "PCS",
    image: "https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=600&fit=crop"
    ],
    category: "batteries",
    sku: "0600",
    description: "Premium 48V 20Ah lithium-ion battery pack with advanced BMS (Battery Management System). Provides long range and reliable power for electric vehicles.",
    features: [
      "High-quality lithium-ion cells",
      "Advanced Battery Management System (BMS)",
      "Overcharge and discharge protection",
      "Temperature monitoring",
      "Long cycle life (>1000 cycles)",
      "Lightweight aluminum housing"
    ],
    specifications: {
      "Voltage": "48V (51.8V max)",
      "Capacity": "20Ah",
      "Energy": "960Wh",
      "Cell Type": "Lithium-ion 18650",
      "Cycle Life": ">1000 cycles",
      "Charging Time": "4-6 hours",
      "Operating Temperature": "-10°C to +60°C",
      "Dimensions": "350 x 150 x 100mm",
      "Weight": "6.5kg",
      "Protection": "IP54"
    },
    useCases: [
      "Electric bicycles and scooters",
      "E-rickshaws",
      "Solar energy storage",
      "Backup power systems",
      "Marine applications"
    ],
    inStock: true,
    stockQuantity: 5,
    rating: 4.8,
    reviewCount: 94,
    brand: "ELYF Energy",
    tags: ["battery", "48v", "20ah", "lithium", "bms", "long-range"]
  }
];
