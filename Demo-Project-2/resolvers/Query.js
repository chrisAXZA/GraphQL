// import { categories, products } from '../data.js';

export const Query = {
    hello: () => {
        return 'Hello World';
    },
    // products: (parent, { filter }, { products, reviews }) => {
    products: (parent, { filter }, { db }) => {
        let filteredProducts = db.products;

        if (filter) {
            for (const item in filter) {
                // console.log(item);
                if (item === 'onSale') {
                    filteredProducts = filteredProducts.filter((p) => p[item]);
                } else if (item === 'price') {
                    const num = Number(filter.price);
                    filteredProducts = filteredProducts.filter((p) => p.price >= num);
                } else if (item === 'rating') {
                    const num = Number(filter.rating);

                    if (![1, 2, 3, 4, 5].includes(num)) {
                        return;
                    }

                    filteredProducts = filteredProducts.filter((p) => {
                        const productReviews = db.reviews.filter((r) => r.productId === p.id);
                        p.reviews = productReviews;

                        const averageRating = p.reviews.reduce((acc, curr) => {
                            acc += Number(curr.rating);
                            return acc;
                        }, 0) / p.reviews.length;

                        if (averageRating >= num) {
                            return p;
                        }
                    });
                }
            }
        }

        return filteredProducts;
    },
    // product: (parent, { id: productId }, { products }) => {
    product: (parent, { id: productId }, { db }) => {
        // const productId = args.id;
        return db.products.find((p) => p.id === productId);
    },
    categories: (parent, args, { db }) => {
        return db.categories;
    },
    category: (parent, { id: categoryId }, { db }) => {
        // const categoryId = args.id;
        // const { id: categoryId } = args;
        const category = db.categories.find((c) => c.id === categoryId);
        // const productsByCategory = products.filter((p) => p.categoryId === categoryId);
        // category.products = productsByCategory;

        return category;
    },
    reviews: (parent, args, { db }) => {
        return db.reviews;
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

// if (filter) {
//     if (filter.onSale === true) {
//         filteredProducts = filteredProducts.filter((p) => {
//             return p.onSale;
//         });
//     }
// }