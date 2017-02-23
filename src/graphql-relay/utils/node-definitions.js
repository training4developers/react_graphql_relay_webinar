import { nodeDefinitions } from 'graphql-relay';
import { getNode, getNodeType } from './resolve-type';

export const { nodeInterface, nodeField } =
	nodeDefinitions(getNode, getNodeType);