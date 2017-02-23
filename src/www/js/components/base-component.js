import React from 'react';

export class BaseComponent extends React.Component {

    _fromEdges(collection, labelField = 'name') {
        return collection.edges.map(edge => ({
            value: edge.node.id,
            label: edge.node[labelField]
        }));
    }

    _fromEnumType(enumType) {
        return enumType.enumValues.map(enumValue => ({
            value: enumValue.name,
            label: enumValue.description
        }));
    }

}