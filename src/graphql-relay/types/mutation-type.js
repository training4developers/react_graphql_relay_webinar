import { GraphQLObjectType } from 'graphql';
import { insertBookMutationType } from './insert-book-mutation-type';
import { updateBookMutationType } from './update-book-mutation-type';
import { deleteBookMutationType } from './delete-book-mutation-type';

export const mutation = new GraphQLObjectType({

    name: 'Mutation',
    fields: () => ({
        insertBook: insertBookMutationType,
        updateBook: updateBookMutationType,
        deleteBook: deleteBookMutationType
    })

});