// import { categories, products } from '../data.js';

export const Query = {
    hello: () => {
        return 'Hello World';
    },
    products: (parent, { filter }, { products }) => {
        let filteredProducts = products;

        if (filter) {
            for (const item in filter) {
                console.log(item);
                if (item === 'onSale') {
                    filteredProducts = filteredProducts.filter((p) => p[item]);
                } else {
                    const num = Number(filter.price);
                    filteredProducts = filteredProducts.filter((p) => p.price >= num);
                }
            }
        }

        // if (filter) {
        //     if (filter.onSale === true) {
        //         filteredProducts = filteredProducts.filter((p) => {
        //             return p.onSale;
        //         });
        //     }
        // }

        return filteredProducts;
    },
    product: (parent, { id: productId }, { products }) => {
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

// return [
//     {
//         name: 'Bike',
//         description: 'Mountain Bike',
//         quantity: 20,
//         price: 999.99,
//         onSale: false,
//     },
// ];