import { categories, products } from '../data.js';

export const Query = {
    hello: () => {
        return 'Hello World';
    },
    products: () => {
        return products;
        // return [
        //     {
        //         name: 'Bike',
        //         description: 'Moutain Bike',
        //         quantity: 20,
        //         price: 999.99,
        //         onSale: false,
        //     },
        // ];
    },
    product: (parent, args, context) => {
        const productId = args.id;
        return products.find((p) => p.id === productId);
    },
    categories: () => {
        return categories;
    },
    category: (parent, args, context) => {
        // const categoryId = args.id;
        const { id: categoryId } = args;
        const category = categories.find((c) => c.id === categoryId);
        // const productsByCategory = products.filter((p) => p.categoryId === categoryId);
        // category.products = productsByCategory;

        return category;
    },
};