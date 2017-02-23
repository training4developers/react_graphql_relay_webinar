import { GraphQLString, GraphQLInt } from 'graphql';
import { connectionDefinitions } from 'graphql-relay';

import { bookType } from '../types/book-type';

export const { connectionType: bookConnectionType, edgeType: bookEdgeType } =
    connectionDefinitions({
        name: 'Book',
        nodeType: bookType,
        // example of adding more data to the connection
        connectionFields: () => ({
            totalCount: {
                type: GraphQLInt
            }
        }),
        // example of adding more data to the edge
        edgeFields: () => ({
            sample: {
                type: GraphQLString,
                resolve: ({ node }) => node.title
            }
        })
    });