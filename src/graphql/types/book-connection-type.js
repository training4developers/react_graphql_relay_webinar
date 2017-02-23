import { GraphQLObjectType, GraphQLInt, GraphQLList } from 'graphql';

import { bookType } from './book-type';

export const bookEdgeType = new GraphQLObjectType({

    name: 'BookEdge',
    description: 'Edges containing a book node',
    fields: () => ({
        node: {
            type: bookType,
            description: 'A book node',
            resolve: ({ book }) => book
        }
    })

});

export const pageInfoType = new GraphQLObjectType({

    name: 'PageInfo',
    description: 'Page information',
    fields: () => ({
        pageSize: {
            type: GraphQLInt,
            description: 'Number of edges per page'
        }
    })

});

export const bookConnectionType = new GraphQLObjectType({

    name: 'BookConnection',
    description: 'Connection to books',
    fields: () => ({
        totalCount: {
            type: GraphQLInt,
            description: 'Total count of books',
            resolve: ({ books }) => books.length
        },
        edges: {
            type: new GraphQLList(bookEdgeType),
            description: 'A list of book edges',
            resolve: ({ books }) => books.map(book => ({ book }))
        },
        pageInfo: {
            type: pageInfoType,
            description: 'Details about the current page',
            resolve: ({ pageSize }) => ({ pageSize })
        }
    })

});