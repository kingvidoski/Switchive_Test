export interface IProductData {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string[];
  thumbnail: string;
}

export interface IProductResponse {
  products: IProductData[];
}
