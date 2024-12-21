import { create } from "zustand";
import {
  Address,
  AddressAndContactsData,
  CheckoutCalculate,
  Contact,
  ProductWithImageData,
} from "../types/ResponceTypes";

interface UserState {
  isLogedIn: boolean;
  setIsLogedIn: (val: boolean) => void;
  isSignedUP: boolean;
  setIsSignedUP: (val: boolean) => void;
  isLoginSkipped: boolean;
  setIsLoginSkipped: (val: boolean) => void;
}

interface ProductState {
  selectedSize: string;
  setSelectedSize: (val: string) => void;
  selectedColorId: string;
  setSelectedColorId: (val: string) => void;
}

interface CheckoutCalculateState {
  checkoutCalculate: CheckoutCalculate | null;
  setCheckoutCalculate: (val: CheckoutCalculate) => void;
}

interface CouponBoxState {
  coupon: string;
  setCoupon: (val: string) => void;
  isCoinRedeemed: boolean;
  setIsCoinRedeemed: (val: boolean) => void;
}

interface BagState {
  selectedBagIdsStore: string[];
  setSelectedBagIdsStore: (val: string[]) => void;
}

interface AddressAndContactState {
  contactsAndAddress: AddressAndContactsData | null;
  setContactsAndAddress: (val: AddressAndContactsData) => void;
  selectedContactId: number | null;
  setSelectedContactId: (val: number | null) => void;
  selectedAddressId?: number;
  setSelectedAddressId: (val?: number) => void;
  selectedDefaultAddressId?: number;
  setSelectedDefaultAddressId: (val?: number) => void;
  selectedContactAndAddress: {
    contact: Contact;
    address: Address;
  } | null;
  setSelectedContactAndAddress: (val: {
    contact: Contact;
    address: Address;
  }) => void;
  addedNewAddress: string;
  setAddedNewAddress: (val: string) => void;
}

interface CategoryTypeState {
  productForCategoryType: ProductWithImageData[] | null;
  setProductForCategoryType: (val: ProductWithImageData[]) => void;
  isLoading: boolean;
  setIsLoading: (val: boolean) => void;
}

interface Slide {
  image: string;
  link: string;
}

interface BannerState {
  slides: Slide[] | null;
  setSlides: (val: Slide[]) => void;
}

export const useBannerStore = create<BannerState>((set) => ({
  slides: null,
  setSlides: (val) => set(() => ({ slides: val })),
}));

export const useUserStore = create<UserState>((set) => ({
  isLogedIn: false,
  setIsLogedIn: (val) => set(() => ({ isLogedIn: val })),
  isSignedUP: false,
  setIsSignedUP: (val) => set(() => ({ isSignedUP: val })),
  isLoginSkipped: false,
  setIsLoginSkipped: (val) => set(() => ({ isLoginSkipped: val })),
}));

export const useProductStore = create<ProductState>((set) => ({
  selectedSize: "",
  setSelectedSize: (val) => set(() => ({ selectedSize: val })),
  selectedColorId: "",
  setSelectedColorId: (val) => set(() => ({ selectedColorId: val })),
}));

export const useCheckoutCalculateStore = create<CheckoutCalculateState>(
  (set) => ({
    checkoutCalculate: null,
    setCheckoutCalculate: (val) => set(() => ({ checkoutCalculate: val })),
  })
);

export const useCouponBoxStore = create<CouponBoxState>((set) => ({
  coupon: "",
  setCoupon: (val) => set(() => ({ coupon: val })),
  isCoinRedeemed: false,
  setIsCoinRedeemed: (val) => set(() => ({ isCoinRedeemed: val })),
}));

export const useBagStore = create<BagState>((set) => ({
  selectedBagIdsStore: [],
  setSelectedBagIdsStore: (val) => set(() => ({ selectedBagIdsStore: val })),
}));

export const useAddressAndContactStore = create<AddressAndContactState>(
  (set) => ({
    contactsAndAddress: null,
    setContactsAndAddress: (val) => set(() => ({ contactsAndAddress: val })),
    selectedContactId: null,
    setSelectedContactId: (val) => set(() => ({ selectedContactId: val })),
    selectedAddressId: undefined,
    setSelectedAddressId: (val) => set(() => ({ selectedAddressId: val })),
    selectedDefaultAddressId: undefined,
    setSelectedDefaultAddressId: (val) =>
      set(() => ({ selectedDefaultAddressId: val })),
    selectedContactAndAddress: null,
    setSelectedContactAndAddress: (val) =>
      set(() => ({ selectedContactAndAddress: val })),
    addedNewAddress: "",
    setAddedNewAddress: (val) => set(() => ({ addedNewAddress: val })),
  })
);

export const useCategoryTypeStore = create<CategoryTypeState>((set) => ({
  productForCategoryType: null,
  setProductForCategoryType: (val) =>
    set(() => ({ productForCategoryType: val })),
  isLoading: false,
  setIsLoading: (val) => set(() => ({ isLoading: val })),
}));
