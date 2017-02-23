import { GraphQLObjectType } from 'graphql';

import { nodeField } from '../utils/node-definitions';
import { viewerType } from './viewer-type';
import { Viewer } from '../models';

export const query = new GraphQLObjectType({

    name: 'Query',
    fields: () => ({
        node: nodeField,
        viewer: {
            type: viewerType,
            resolve: () => Object.assign(new Viewer(), { id: 1 })
        } 
    })

});