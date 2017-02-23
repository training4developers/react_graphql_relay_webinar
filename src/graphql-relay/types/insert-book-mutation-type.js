import { mutationWithClientMutationId, offsetToCursor } from 'graphql-relay';
import { insertBookInputType } from './book-input-types';
import { viewerType } from './viewer-type';
import { bookEdgeType } from '../connections/book-connection';
import { getViewer, getBooks, insertBook } from '../resources';

export const insertBookMutationType = mutationWithClientMutationId({
    // name of the mutation
    name: 'InsertBook',

    inputFields: {
        book: {
            type: insertBookInputType
        }
    },

    mutateAndGetPayload: ({ book }, { baseUrl }) => {
        // save book with extracted ids
        return insertBook(baseUrl, book);
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