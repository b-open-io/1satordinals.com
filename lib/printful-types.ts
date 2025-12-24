// App-level types for Printful integration

export interface Product {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  category: string;
  variants: ProductVariant[];
  minPrice: number;
  maxPrice: number;
}

export interface ProductVariant {
  id: number;
  variantId: number;
  name: string;
  size: string | null;
  color: string | null;
  price: number;
  sku: string | null;
  image: string;
  availability:
    | "active"
    | "discontinued"
    | "out_of_stock"
    | "temporary_out_of_stock";
}

export interface CartItem {
  productId: string;
  variantId: number;
  printfulVariantId: number;
  name: string;
  variantName: string;
  price: number;
  image: string;
  quantity: number;
}

export interface ShippingOption {
  id: string;
  name: string;
  rate: number;
  currency: string;
  minDays: number;
  maxDays: number;
  minDate: string;
  maxDate: string;
}

export interface ShippingAddress {
  name: string;
  address1: string;
  address2?: string;
  city: string;
  stateCode?: string;
  countryCode: string;
  zip: string;
  phone?: string;
  email?: string;
}
