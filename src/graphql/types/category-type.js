import { GraphQLEnumType } from 'graphql';

export const categoryType = new GraphQLEnumType({
    name: 'Category',
    description: 'List of Category Options',
    values: {
        'Romance': { value: 'Romance', description: 'romance novels' },
        'Historical': { value: 'Historical', description: 'non-fiction history' },
        'Inspirational': { value: 'Inspiration', description: 'inspiring words' },
        'Humor': { value: 'Humor', description: 'something to make us laugh' },
        'Mystery': { value: 'Mystery', description: 'something to make us scared' }
    }
});