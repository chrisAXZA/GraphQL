// import { categories } from '../data.js';

export const Product = {
    // category: (parent, args, context) => {
    category: ({ categoryId }, args, { categories }) => {
        // const { categoryId } = parent;
        return categories.find((c) => c.id === categoryId);
    },
    reviews: ({ id }, args, { reviews }) => {
        return reviews.filter((r) => r.productId === id);
    },
};