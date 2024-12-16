export type ProductColor = {
  id: string;
  color_name: string;
  hex_value: string;
  isDefault: boolean;
  productId: number;
};

export type ProductColorData = {
  productColor: ProductColor[];
};

export type Product = {
  product_name: string;
  short_description: string;
  long_description: string;
  price: number;
};

export type ProductData = {
  product: Product[];
};

export type Measurements = {
  measurementType: { measurement_name: string };
  value: number;
  unit: { unit: string };
};

export type Size = {
  size: string;
  ProductSizeMeasurement: Measurements[];
};

export type SizeData = {
  size: Size[];
};

export interface ProductWithSizeArr extends Product {
  sizeAvailable: string[];
}

export type Bag = {
  id: string;
  productId: number;
  product: ProductWithSizeArr;
  colorId: number;
  color: {
    color_name: string;
    hex_value: string;
    medias: { url: string }[];
  };
  size: string;
  quantity: number;
  sizeAvailable: string[];
};

export type BagData = {
  status: boolean;
  bag: Bag[];
};

export interface CheckoutCalculate {
  status: boolean;
  subTotal: number;
  shipping: number;
  discount: number;
  coinsRedeemed: number;
  membershipDiscount: number;
  coupon: number;
  total: number;
}

export interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export interface Address {
  id: number;
  address: string;
  locality: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  isDefault: boolean;
}

export interface AddressAndContact {
  id: number;
  name: string;
  email: string;
  phone: string;
  Address: Address[];
}

export interface AddressAndContactsData {
  status: boolean;
  contact: AddressAndContact[];
}

export interface ProductWithImageData {
  id: number;
  product_name: string;
  price: number;
  ProductColor: {
    medias: {
      url: string;
    }[];
  }[];
}

export interface CategoryTypeData {
  categoryType: {
    id: number;
    type_name: string;
    categories: {
      id: number;
      category_name: string;
    }[];
  }[];
}
