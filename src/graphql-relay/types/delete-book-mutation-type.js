import { GraphQLID } from 'graphql';
import { mutationWithClientMutationId, fromGlobalId } from 'graphql-relay';
import { viewerType } from './viewer-type';
import { getViewer, deleteBook } from '../resources';

export const deleteBookMutationType = mutationWithClientMutationId({
    // name of the mutation
    name: 'DeleteBook',

    inputFields: {
        bookId: {
            type: GraphQLID
        }
    },

    mutateAndGetPayload: ({ bookId }, { baseUrl }) =>
        deleteBook(baseUrl, fromGlobalId(bookId).id),

    outputFields: {
        viewer: {
            type: viewerType,
            resolve: (_1, _2, { baseUrl }) => getViewer(baseUrl, 1)
        },
        bookId: {
            type: GraphQLID,
            resolve: book => book.id
        }
    }

});