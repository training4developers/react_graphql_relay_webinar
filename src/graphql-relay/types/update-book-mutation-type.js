import { mutationWithClientMutationId, fromGlobalId, offsetToCursor } from 'graphql-relay';
import { updateBookInputType } from './book-input-types';
import { viewerType } from './viewer-type';
import { bookEdgeType } from '../connections/book-connection';
import { getViewer, getBooks, updateBook } from '../resources';

export const updateBookMutationType = mutationWithClientMutationId({
    // name of the mutation
    name: 'UpdateBook',

    inputFields: {
        book: {
            type: updateBookInputType
        }
    },

    mutateAndGetPayload: ({ book }, { baseUrl }) => {
        // extract numeric book id from global id
        book.id = fromGlobalId(book.id).id;
        // save book with extracted ids
        return updateBook(baseUrl, book);
    },

    outputFields: {
        viewer: {
            type: viewerType,
            resolve: (_1, _2, { baseUrl }) => getViewer(baseUrl, 1)
        },
        bookEdge: {
            type: bookEdgeType,
            resolve: (book, _, { baseUrl }) => {
                return getBooks(baseUrl).then(books => {
                    const offset = books.indexOf(books.find(b => b.id === book.id));
                    return {
                        cursor: offsetToCursor(offset),
                        node: book
                    };
                });
            }
        }
    }

});