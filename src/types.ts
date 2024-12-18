// Type definitions for product related data structures.

// Represents the color of a product
export type ProductColor = {
    id: string;           // Unique identifier for the color
    color_name: string;    // Name of the color (e.g., "Red", "Blue")
    hex_value: string;     // Hexadecimal color code (e.g., "#FF0000")
    isDefault: boolean;   // Flag to indicate if this is the default color
    productId: number;    // Foreign key referencing the product
  };
  
  // Represents a list of ProductColor objects
  export type ProductColorData = {
    productColor: ProductColor[]; // Array of ProductColor objects
  };
  
  // Represents the basic information of a product
  export type Product = {
    product_name: string;    // Name of the product
    short_description: string;// Short description of the product
    long_description: string; // Long description of the product
    price: number;           // Price of the product
  };
  
  // Represents a list of Product objects
  export type ProductData = {
    product: Product[];  // Array of Product objects
  };
  
  
  // Represents the measurements for a product size
  export type Measurements = {
    measurementType: { measurement_name: string };  // Type of measurement (e.g., "chest")
    value: number;                                 // Measurement value
    unit: { unit: string };                       // Measurement unit (e.g., "in", "cm")
  };
  
  // Represents the sizes for a product
  export type Size = {
    size: string;                    // Size of the product (e.g., "S", "M", "L")
    ProductSizeMeasurement: Measurements[]; // Array of measurement for each size
  };
  
  // Represents a list of Size objects
  export type SizeData = {
      size: Size[];            // Array of Size objects
  };
  
  
  // Represents a product with a list of available sizes
  export interface ProductWithSizeArr extends Product {
      sizeAvailable: string[];  // Array of available sizes for the product
  }
  
  // Represents an item in the shopping bag
  export type Bag = {
    id: string;             // Unique identifier for the bag item
    productId: number;       // Foreign key referencing the product
    product: ProductWithSizeArr; // Product object along with available sizes
      colorId: number;       // Id of the color of the product
      color: {                 // Color details of the product
          color_name: string;
          hex_value: string;
          medias: { url: string }[] // Array of media urls
      };
      size: string;          // Selected size for the product
    quantity: number;        // Number of product items in the bag
    sizeAvailable: string[]; // List of size available
  };
  
  // Represents a list of Bag objects
  export type BagData = {
    status: boolean;    // Status of operation
    bag: Bag[];         // Array of Bag objects
  };
  
  // Represents the calculated checkout information
  export interface CheckoutCalculate {
    status: boolean;    // Status of operation
    subTotal: number;   // Subtotal of items
    shipping: number;   // Shipping costs
    discount: number;   // Discount amount
    coinsRedeemed: number; // Coins redeemed
    membershipDiscount: number; // Membership discount
    coupon: number;       // Coupon applied
    total: number;        // Final total after all calculations
  }
  
  // Represents contact information
  export interface Contact {
    id: number;       // Unique identifier for contact
    name: string;     // Name of the contact
    email: string;    // Email of the contact
    phone: string;    // Phone number of the contact
  }
  
  // Represents address information
  export interface Address {
    id: number;       // Unique identifier for address
    address: string;  // Street address
    locality: string;  // Locality
    city: string;     // City
    state: string;    // State
    country: string;  // Country
    postal_code: string; // Postal code
    isDefault: boolean; // Flag if this is the default address
  }
  
  // Represents combined contact and address information
  export interface AddressAndContact {
    id: number;       // Unique identifier for address and contact
    name: string;     // Name of the contact
    email: string;    // Email of the contact
    phone: string;    // Phone number of the contact
    Address: Address[]; // Array of addresses associated with the contact
  }
  
  // Represents a list of AddressAndContact objects
  export interface AddressAndContactsData {
    status: boolean;            // Status of the operation
    contact: AddressAndContact[]; // Array of AddressAndContact objects
  }
  
  
  // Represents a product with associated image data
  export interface ProductWithImageData {
    id: number;        // Unique identifier for the product
    product_name: string; // Name of the product
    price: number;      // Price of the product
    ProductColor: {        // Array of Product Color and Medias
        medias: { url: string }[]
    }[];
  }
  
  // Represents the structure of category types and their categories
  export interface CategoryTypeData {
    categoryType: {
      id: number;                // Unique identifier for the category type
      type_name: string;           // Name of the category type
      categories: {           // Array of categories under this type
        id: number;           // Unique identifier for category
        category_name: string;  // Name of the category
      }[];
    }[];
  }