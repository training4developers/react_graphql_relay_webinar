import fetch from 'node-fetch';
import {
    GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLInt
} from 'graphql';

import { Book } from '../models/book';

import { bookConnectionType } from './book-connection-type';

import { nodeInterface } from './node-interface';
import { bookType } from './book-type';

export const authorType = new GraphQLObjectType({

    name: 'Author',
    description: 'An author type',
    fields: () => ({
        id: {
            type: GraphQLID,
            description: 'Id of author',
            resolve: ({ id: authorId }) => 'author:' + authorId
        },
        firstName: {
            type: GraphQLString,
            description: 'First name  of the author'
        },
        lastName: {
            type: GraphQLString,
            description: 'Las name  of the author'
        },
        fullName: {
            type: GraphQLString,
            description: 'Full name of the author',
            resolve: ({ firstName, lastName }) => firstName + ' ' + lastName
        },
        books: {
            type: new GraphQLList(bookType),
            description: 'Books from the author',
            resolve: ({ id: authorId }, _, { baseUrl}) =>
                fetch(`${baseUrl}/books?authorId=${authorId}`)
                    .then(res => res.json())
        },
        bookConnection: {
            type: bookConnectionType,
            description: 'Connection to author\'s books',
            args: {
                pageSize: {
                    type: GraphQLInt,
                    description: 'Number of edges per page'
                }
            },
            resolve: ({ id: authorId }, { pageSize }, { baseUrl}) =>
                fetch(`${baseUrl}/books?authorId=${authorId}`)
                    .then(res => res.json())
                    .then(booksData => {

                        const connectionData = {
                            pageSize
                        };

                        connectionData.books = booksData.map(bookData =>
                            Object.assign(new Book(), bookData));

                        return connectionData;

                    })
        }        

    }),
    interfaces: () => [ nodeInterface ]

});