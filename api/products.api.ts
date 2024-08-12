import {IProductData, IProductResponse} from '@/types/api/product.types';
import {BASE_URLS} from '@env';
import {create} from 'apisauce';

const productApi = create({
  baseURL: BASE_URLS,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 12000,
  timeoutErrorMessage: 'Request Timed Out',
});

export const getAllProducts = async (limit: number) =>
  await productApi.get<IProductResponse>(`/products?limit=${limit}`);

export const getProductsByID = async (id: number) =>
  await productApi.get<IProductData>(`/products/${id}`);
