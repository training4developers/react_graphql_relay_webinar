import { GraphQLInterfaceType, GraphQLID } from 'graphql';

import { Book } from '../models/book';
import { Author } from '../models/author';

import { bookType } from './book-type';
import { authorType } from './author-type';

export const nodeInterface = new GraphQLInterfaceType({

    name: 'NodeInterface',
    description: 'Interface for all Nodes in the system',
    fields: () => ({
        id: {
            type: GraphQLID,
            description: 'id of the node'
        }
    }),
    resolveType: (value) => {
        if (value instanceof Book) {
            return bookType;
        } else if (value instanceof Author) {
            return authorType;
        }
    }


});