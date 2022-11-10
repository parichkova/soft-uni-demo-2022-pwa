export interface Product {
  id: string
  barcode: string | number;
  weight: number;
  description?: string;
  imageUrl?: string;
  width?: number;
  length?: number;
  height?: number;
}
