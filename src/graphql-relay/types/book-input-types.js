import { GraphQLInputObjectType, GraphQLString, GraphQLFloat, GraphQLInt, GraphQLID } from 'graphql';

const bookInputFields = ({
    title: {
        type: GraphQLString
    },
    category: {
        type: GraphQLString
    },
    price: {
        type: GraphQLFloat
    },
    authorId: {
        type: GraphQLInt
    }                
});

export const insertBookInputType = new GraphQLInputObjectType({

    name: 'InputInsertBook',
    fields: () => bookInputFields

});

export const updateBookInputType = new GraphQLInputObjectType({
    name: 'InputUpdateBook',
    fields: () => Object.assign(bookInputFields, { id: { type: GraphQLID } })    
});