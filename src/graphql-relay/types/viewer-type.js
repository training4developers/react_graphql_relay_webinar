import { GraphQLObjectType } from 'graphql';
import {
    globalIdField, connectionArgs,
    connectionFromPromisedArray, connectionFromArray
} from 'graphql-relay';

import { nodeInterface } from '../utils/node-definitions';
import { registerType } from '../utils/resolve-type';

import { Viewer } from '../models';
import { bookConnectionType } from '../connections/book-connection';
import { getBooks } from '../resources';

export const viewerType = new GraphQLObjectType({

    name: 'Viewer',

    fields: () => ({
        id: globalIdField('Viewer'),
        books: {
            type: bookConnectionType,
            description: 'A list of books',
            args: connectionArgs,
            resolve: (_, args, { baseUrl }) => {

                // must return a promise to delay resolution until the async
                // operation has completed
                return getBooks(baseUrl).then(books => {
                    
                    // create a connection object from the array of data, and
                    // the user supplied args
                    // typically, this will return a subset of the array
                    const connection = connectionFromArray(books, args);
                    
                    // populating the connection object with additional data
                    connection.totalCount = books.length;

                    // return the connection object to be used to populate the
                    // connection type
                    return connection;
                });

                //return connectionFromPromisedArray(getBooks(baseUrl), args);
            }
        }
    }),

    interfaces: () => [ nodeInterface ]

});

registerType(Viewer, viewerType, id => Object.assign(new Viewer(), { id }));