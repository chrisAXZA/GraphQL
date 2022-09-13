import { products } from '../data.js';

export const Category = {
    products: (parent, args, context) => {
        const { id } = parent;
        return products.filter((p) => p.categoryId === id);
    },
};