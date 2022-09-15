import { v4 as uuid } from 'uuid';
// const { v4: uuid } = require('uuid');

export const Mutation = {
    addCategory: (parent, { input }, { categories }) => {
        const categoryName = input.name;

        if (categories.find((c) => c.name === categoryName)) {
            console.log(`Category with the given name "${categoryName}" already exists!`);
            return;
        }

        const category = {
            id: uuid(),
            name: categoryName,
        };

        categories.push(category);

        return category;
    },
    addProduct: (parent, { input }, { categories, products, reviews }) => {
        const {
            name,
            description,
            image,
            quantity,
            price,
            onSale,
            categoryId,
        } = input;

        if (products.find((p) => p.name === name)) {
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
            reviews: [],
        };

        products.push(newProduct);

        return newProduct;
    },
    addReview: (parent, { input }, { categories, products, reviews }) => {
        const {
            title,
            comment,
            date,
            rating,
            productId,
        } = input;

        if (reviews.find((r) => r.title === title)) {
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

        reviews.push(newReview);

        return newReview;
    },
};