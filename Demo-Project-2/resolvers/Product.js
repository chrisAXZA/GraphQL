// import { categories } from '../data.js';

export const Product = {
    // category: (parent, args, context) => {
    category: ({ categoryId }, args, { db }) => {
        // const { categoryId } = parent;
        return db.categories.find((c) => c.id === categoryId);
    },
    reviews: ({ id }, args, { reviews }) => {
        return db.reviews.filter((r) => r.productId === id);
    },
};