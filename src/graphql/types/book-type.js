import fetch from 'node-fetch';
import {
    GraphQLObjectType, GraphQLString,
    GraphQLID, GraphQLFloat
} from 'graphql';

import { nodeInterface } from './node-interface';
import { authorType } from './author-type';
import { categoryType } from './category-type'; 

export const bookType = new GraphQLObjectType({

    name: 'Book',
    description: 'A book type',
    fields: () => ({
        id: {
            type: GraphQLID,
            description: 'Id of book',
            resolve: ({ id: bookId }) => 'book:' + bookId
        },
        title: {
            type: GraphQLString,
            description: 'Title of the book'
        },
        category: {
            type: categoryType,
            description: 'Category of the book'
        },
        price: {
            type: GraphQLFloat,
            description: 'Price of the book'
        },
        author: {
            type: authorType,
            description: 'Author of the book',
            resolve: ({ authorId }, _, { baseUrl }) =>
                fetch(`${baseUrl}/authors/${authorId}`)
                    .then(res => res.json())
        }
    }),
    interfaces: () => [ nodeInterface ]
});