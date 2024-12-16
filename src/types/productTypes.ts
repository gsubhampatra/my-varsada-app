export type VarsadaBagPayload = {
  productId: string;
  selectedSizeId: string;
  selectedColorId: string;
  quantity: number;
};

export interface Filter {
  categoryTypeIds: number[];
  color: string;
  size: string;
  min_price: number;
  max_price: number;
  sort: 'new' | 'lth' | 'htl';
  search: string;
}
