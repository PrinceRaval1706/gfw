import type { Availability, Product, Shop, LatLng } from "../types";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const PRODUCTS: Product[] = [
  { id: "p1", name: "Milk (1L)", category: "Dairy" },
  { id: "p2", name: "Maggi 2-Minute Noodles", category: "Instant" },
  { id: "p3", name: "Bread", category: "Bakery" },
  { id: "p4", name: "Eggs (6 pcs)", category: "Dairy" },
  { id: "p5", name: "Coca-Cola (500ml)", category: "Beverage" },
];

export const SHOPS: Shop[] = [
  {
    id: "s1",
    name: "Patel Kirana",
    address: "Near XYZ, Ahmedabad",
    phone: "9999999999",
    whatsapp: "919999999999",
    rating: 4.3,
    isOpen: true,
    location: { lat: 23.0225, lng: 72.5714 },
  },
  {
    id: "s2",
    name: "Shiv General Store",
    address: "SG Highway, Ahmedabad",
    phone: "8888888888",
    whatsapp: "918888888888",
    rating: 4.1,
    isOpen: false,
    location: { lat: 23.0402, lng: 72.5315 },
  },
  {
    id: "s3",
    name: "Radhe Mart",
    address: "Maninagar, Ahmedabad",
    phone: "7777777777",
    whatsapp: "917777777777",
    rating: 4.6,
    isOpen: true,
    location: { lat: 23.0020, lng: 72.6040 },
  },
];

export const AVAIL: Availability[] = [
  { shopId: "s1", productId: "p1", inStock: true, price: 58, lastUpdatedAt: new Date().toISOString() },
  { shopId: "s1", productId: "p2", inStock: true, price: 15, lastUpdatedAt: new Date().toISOString() },
  { shopId: "s1", productId: "p3", inStock: false, price: 40, lastUpdatedAt: new Date().toISOString() },

  { shopId: "s2", productId: "p2", inStock: false, price: 16, lastUpdatedAt: new Date().toISOString() },
  { shopId: "s2", productId: "p1", inStock: true, price: 60, lastUpdatedAt: new Date().toISOString() },

  { shopId: "s3", productId: "p1", inStock: true, price: 57, lastUpdatedAt: new Date().toISOString() },
  { shopId: "s3", productId: "p4", inStock: true, price: 45, lastUpdatedAt: new Date().toISOString() },
  { shopId: "s3", productId: "p2", inStock: true, price: 14, lastUpdatedAt: new Date().toISOString() },
];

export async function mockGetNearbyShops(_: LatLng) {
  await sleep(250);
  return SHOPS;
}

export async function mockSearchProducts(query: string) {
  await sleep(200);
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return PRODUCTS.filter((p) => p.name.toLowerCase().includes(q)).slice(0, 8);
}

export async function mockGetAvailability(productId: string) {
  await sleep(200);
  return AVAIL.filter((a) => a.productId === productId);
}