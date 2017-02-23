import {
    fromGlobalId
} from 'graphql-relay';

const types = {};

// model comes from the models folder
// type is the graphql type from the graphql/types folder
// lookupFn is the function for retrieving the data from the database
export const registerType = (model, type, lookupFn) => {
    types[type.name] = {
        type,
        model,
        lookupFn
    };
};

export const getNode = globalId => {

    const {
        type: typeName,
        id
    } = fromGlobalId(globalId);

    if (types[typeName]) {
        return types[typeName].lookupFn(id);
    } else {
        return null;
    }

};

export const getNodeType = obj => {

    for (let typeName of Object.keys(types)) {
        if (obj instanceof types[typeName].model) {
            return types[typeName].type;
        }
    }

    return null;
};