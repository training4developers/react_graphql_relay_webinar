import { GraphQLObjectType, GraphQLString, GraphQLFloat, GraphQLInt } from 'graphql';
import { globalIdField } from 'graphql-relay';

import { nodeInterface } from '../utils/node-definitions';
import { registerType } from '../utils/resolve-type';

import { Book } from '../models';
import { getBook } from '../resources';

export const bookType = new GraphQLObjectType({

    name: 'Book',
    fields: () => ({
        id: globalIdField('Book'),
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
            type: GraphQLInt
        }
    }),
    interfaces: () => [ nodeInterface ]

});

// TODO
const baseUrl = 'http://localhost:3010';

registerType(Book, bookType, id => getBook(baseUrl, id));
//registerType(Book, bookType, id => Object.assign(new Book(), { id }));