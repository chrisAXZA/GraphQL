// import { categories, products } from '../data.js';

export const Query = {
    hello: () => {
        return 'Hello World';
    },
    products: (parent, args, { products }) => {
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
    product: (parent, { productId }, { products }) => {
        // const productId = args.id;
        return products.find((p) => p.id === productId);
    },
    categories: (parent, args, { categories }) => {
        return categories;
    },
    category: (parent, { id: categoryId }, { categories }) => {
        // const categoryId = args.id;
        // const { id: categoryId } = args;
        const category = categories.find((c) => c.id === categoryId);
        // const productsByCategory = products.filter((p) => p.categoryId === categoryId);
        // category.products = productsByCategory;

        return category;
    },
};