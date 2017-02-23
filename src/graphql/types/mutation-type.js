import fetch from 'node-fetch';
import {
    GraphQLObjectType, GraphQLString, GraphQLFloat,
    GraphQLID, GraphQLInputObjectType
} from 'graphql';

export const insertBookType = new GraphQLInputObjectType({

    name: 'InsertBookType',
    description: 'A type for inserting a book',
    fields: () => ({
        title: {
            type: GraphQLString
        },
        category: {
            type: GraphQLString
        },
        price: {
            type: GraphQLFloat
        },
        authorId: {
            type: GraphQLID
        }        
    })
});

import { bookType } from './book-type';

export const mutation = new GraphQLObjectType({

    name: 'Mutation',
    description: 'Our mutation type',
    fields: () => ({

        insertBook: {
            type: bookType,
            description: 'Insert a book',
            args: {
                book: {
                    type: insertBookType,
                    description: 'The book to insert'
                }
            },
            resolve: (_, { book }, { baseUrl }) => {

                return fetch(`${baseUrl}/books`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(book)
                })
                .then(res => res.json());

            }
        }

    })

});