import { v4 as uuid } from 'uuid';
// const { v4: uuid } = require('uuid');

export const Mutation = {
    addCategory: (parent, { input }, { categories }) => {
        const categoryName = input.name;
        const category = {
            id : uuid(),
            name : categoryName,
        };

        categories.push(category);

        return category;
    },
};