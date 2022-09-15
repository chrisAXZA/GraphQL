// import { products } from '../data.js';

export const Category = {
    products: ({ id }, { filter }, { db }) => {
        // const { id } = parent;
        // return products.filter((p) => p.categoryId === id);

        let filteredProducts = db.products.filter((p) => p.categoryId === id);

        if (filter) {
            for (const item in filter) {
                // console.log(item);
                if (item === 'onSale') {
                    filteredProducts = filteredProducts.filter((p) => p[item] === filter.onSale);
                } else if (item === 'price') {
                    const num = Number(filter.price);
                    filteredProducts = filteredProducts.filter((p) => p.price >= num);
                } else if (item === 'rating') {
                    const num = Number(filter.rating);
                    
                    filteredProducts = filteredProducts.filter((p) => {
                        const productReviews = reviews.filter((r) => r.productId === p.id);
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
};