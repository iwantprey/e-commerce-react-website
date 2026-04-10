import { ENDPOINTS } from '../apiConfig.js';
import { fallbackProducts } from '../data/fallbackProducts.js';

const normalizeProducts = (products) => {
  if (!Array.isArray(products)) {
    return [];
  }

  return products
    .filter((product) => product && (product.title || product.name) && product.image)
    .map((product) => ({
      ...product,
      title: product.title || product.name,
      price: typeof product.price === 'number' ? product.price : Number(product.price) || 0,
      category: product.category || 'Fashion',
    }));
};

export const getProducts = async () => {
  try {
    const response = await fetch(ENDPOINTS.PRODUCTS);

    if (!response.ok) {
      throw new Error(`Failed to load products: ${response.status}`);
    }

    const data = await response.json();
    const normalized = normalizeProducts(data);

    if (!normalized.length) {
      throw new Error('No products returned from API.');
    }

    return normalized;
  } catch (error) {
    console.warn('Using fallback products because the API is unavailable.', error);
    return normalizeProducts(fallbackProducts);
  }
};
