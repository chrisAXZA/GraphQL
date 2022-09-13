// import { products } from '../data.js';

export const Category = {
    products: ({ id }, args, { products }) => {
        // const { id } = parent;
        return products.filter((p) => p.categoryId === id);
    },
};