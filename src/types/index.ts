export type LatLng = {
  lat: number;
  lng: number;
};

export type Shop = {
  id: string;
  name: string;
  address: string;
  phone?: string;
  whatsapp?: string;
  rating?: number;
  isOpen: boolean;
  location: LatLng;
};

export type Product = {
  id: string;
  name: string;
  category?: string;
};

export type Availability = {
  shopId: string;
  productId: string;
  inStock: boolean;
  price?: number;
  lastUpdatedAt: string;
};