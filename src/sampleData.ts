
import {
  ProductColor,
  ProductColorData,
  Product,
  ProductData,
  Measurements,
  Size,
  SizeData,
  ProductWithSizeArr,
  Bag,
  BagData,
  CheckoutCalculate,
  Contact,
  Address,
  AddressAndContact,
  AddressAndContactsData,
  ProductWithImageData,
  CategoryTypeData,
} from "./types"; // Import the defined types

// Sample ProductColor data
export const sampleProductColor: ProductColor = {
  id: "1",
  color_name: "Coral",
  hex_value: "#FF7F50",
  isDefault: true,
  productId: 1,
};

export const sampleProductColorData: ProductColorData = {
  productColor: [
    sampleProductColor,
    {
      id: "2",
      color_name: "Purple",
      hex_value: "#9400D3",
      isDefault: false,
      productId: 1,
    },
    {
      id: "3",
      color_name: "Cyan",
      hex_value: "#00FFFF",
      isDefault: false,
      productId: 1,
    },
  ],
};

// Sample Product data
export const sampleProduct: Product = {
  product_name: "Sample Crop Top",
  short_description: "A stylish sample crop top",
  long_description:
    "This is a sample crop top with a detailed description. It is made with the finest materials. It has all the properties mentioned on the page",
  price: 2300,
};

export const sampleProductData: ProductData = {
  product: [sampleProduct],
};

// Sample Measurements data
export const sampleMeasurements: Measurements = {
  measurementType: { measurement_name: "chest" },
  value: 34,
  unit: { unit: "in" },
};

// Sample Size data
export const sampleSize: Size = {
  size: "S",
  ProductSizeMeasurement: [sampleMeasurements],
};

export const sampleSizeData: SizeData = {
  size: [
    sampleSize,
    {
      size: "M",
      ProductSizeMeasurement: [
        {
          measurementType: { measurement_name: "chest" },
          value: 36,
          unit: { unit: "in" },
        },
      ],
    },
  ],
};

// Sample ProductWithSizeArr data
export const sampleProductWithSizeArr: ProductWithSizeArr = {
  ...sampleProduct,
  sizeAvailable: ["S", "M", "L"],
};

// Sample Bag data
export const sampleBag: Bag = {
  id: "1",
  productId: 1,
  product: sampleProductWithSizeArr,
  colorId: 1,
  color: {
    color_name: "Coral",
    hex_value: "#FF7F50",
    medias: [{ url: "https://example.com/coral.jpg" }],
  },
  size: "M",
  sizeAvailable: ["S", "M", "L"],
  quantity: 2,
};

export const sampleBagData: BagData = {
  status: true,
  bag: [sampleBag],
};

// Sample CheckoutCalculate data
export const sampleCheckoutCalculate: CheckoutCalculate = {
  status: true,
  subTotal: 100,
  shipping: 10,
  discount: 5,
  coinsRedeemed: 2,
  membershipDiscount: 3,
  coupon: 1,
  total: 100,
};

// Sample Contact data
export const sampleContact: Contact = {
  id: 1,
  name: "Sample User",
  email: "sample@example.com",
  phone: "123-456-7890",
};

// Sample Address data
export const sampleAddress: Address = {
  id: 1,
  address: "123 Main St",
  locality: "Sample Locality",
  city: "Sample City",
  state: "Sample State",
  country: "Sample Country",
  postal_code: "12345",
  isDefault: true,
};

// Sample AddressAndContact data
export const sampleAddressAndContact: AddressAndContact = {
  id: 1,
  name: "Sample User",
  email: "sample@example.com",
  phone: "123-456-7890",
  Address: [sampleAddress],
};

export const sampleAddressAndContactsData: AddressAndContactsData = {
  status: true,
  contact: [sampleAddressAndContact],
};

// Sample ProductWithImageData data
export const sampleProductWithImageData: ProductWithImageData = {
  id: 1,
  product_name: "Sample Crop Top",
  price: 2300,
  ProductColor: [
    {
      medias: [{ url: "https://example.com/sample-product-image.jpg" }],
    },
  ],
};

// Sample CategoryTypeData data
export const sampleCategoryTypeData: CategoryTypeData = {
  categoryType: [
    {
      id: 1,
      type_name: "Apparel",
      categories: [
        { id: 1, category_name: "Tops" },
        { id: 2, category_name: "Dresses" },
      ],
    },
    {
      id: 2,
      type_name: "Shoes",
      categories: [
        { id: 3, category_name: "Sneakers" },
        { id: 4, category_name: "Boots" },
      ],
    },
  ],
};
// Sample data for the ProductInformation component
import { UseQueryResult } from "@tanstack/react-query";

export const sampleProductQueryData: UseQueryResult<ProductData> = {
  data: sampleProductData,
  isLoading: false,
  isError: false,
  isFetching: false,
  error: null,
  refetch: () => Promise.resolve(sampleProductData),
  fetchStatus: "idle",
  status: "success",
};

export const sampleSizeQueryData: UseQueryResult<{
  sizedata: Size[];
  sizeArr: string[];
}> = {
  data: {
    sizedata: sampleSizeData.size,
    sizeArr: sampleSizeData.size.map((s) => s.size),
  },
  isLoading: false,
  isError: false,
  isFetching: false,
  error: null,
  refetch: () =>
    Promise.resolve({
      sizedata: sampleSizeData.size,
      sizeArr: sampleSizeData.size.map((s) => s.size),
    }),
  fetchStatus: "idle",
  status: "success",
};

export const sampleColorQueryData: UseQueryResult<{
  colorData: ProductColor[];
  colorArr: {
    name: string;
    id: string;
    hex: string;
  }[];
}> = {
  data: {
    colorData: sampleProductColorData.productColor,
    colorArr: sampleProductColorData.productColor.map((s) => ({
      name: s.color_name,
      id: s.id,
      hex: s.hex_value,
    })),
  },
  isLoading: false,
  isError: false,
  isFetching: false,
  error: null,
  refetch: () =>
    Promise.resolve({
      colorData: sampleProductColorData.productColor,
      colorArr: sampleProductColorData.productColor.map((s) => ({
        name: s.color_name,
        id: s.id,
        hex: s.hex_value,
      })),
    }),
  fetchStatus: "idle",
  status: "success",
};
