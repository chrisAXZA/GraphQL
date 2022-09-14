// import { products } from '../data.js';

export const Category = {
    products: ({ id }, { filter }, { products }) => {
        // const { id } = parent;
        // return products.filter((p) => p.categoryId === id);

        let filteredProducts = products.filter((p) => p.categoryId === id);

        if (filter) {
            for (const item in filter) {
                console.log(item);
                if (item === 'onSale') {
                    filteredProducts = filteredProducts.filter((p) => p[item] === filter.onSale);
                } else {
                    const num = Number(filter.price);
                    filteredProducts = filteredProducts.filter((p) => p.price >= num);
                }
            }
        }

        return filteredProducts;
    },
};