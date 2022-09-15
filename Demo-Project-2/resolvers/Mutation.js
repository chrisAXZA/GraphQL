import { v4 as uuid } from 'uuid';
// const { v4: uuid } = require('uuid');

export const Mutation = {
    addCategory: (parent, { input }, { db }) => {
        const categoryName = input.name;

        if (db.categories.find((c) => c.name === categoryName)) {
            console.log(`Category with the given name "${categoryName}" already exists!`);
            return;
        }

        const category = {
            id: uuid(),
            name: categoryName,
        };

        db.categories.push(category);

        return category;
    },
    // addProduct: (parent, { input }, { categories, products, reviews }) => {
    addProduct: (parent, { input }, { db }) => {
        const {
            name,
            description,
            image,
            quantity,
            price,
            onSale,
            categoryId,
        } = input;

        if (db.products.find((p) => p.name === name)) {
            console.log(`Product with the given name "${name}" already exists!`);
            return null;
        }

        const newProduct = {
            id: uuid(),
            name,
            description,
            image,
            quantity,
            price,
            onSale,
            categoryId,
            // reviews: [],
        };

        db.products.push(newProduct);

        return newProduct;
    },
    addReview: (parent, { input }, { db }) => {
        const {
            title,
            comment,
            date,
            rating,
            productId,
        } = input;

        if (db.reviews.find((r) => r.title === title)) {
            console.log(`Review with the given name "${title}" already exists!`);
            return null;
        }

        const newReview = {
            id: uuid(),
            title,
            comment,
            date,
            rating,
            productId,
        };

        db.reviews.push(newReview);

        return newReview;
    },
    deleteCategory: (parent, { id }, { db }) => {
        const categoryToDelete = db.categories.find((c) => c.id === id);
        db.categories = db.categories.filter((c) => c !== categoryToDelete);

        // console.log(categoryToDelete);

        return categoryToDelete !== null;
        // return `Category ${categoryToDelete.name} has been deleted!`;
    },
};