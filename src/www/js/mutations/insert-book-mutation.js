import Relay from 'react-relay';

export class InsertBookMutation extends Relay.Mutation {

    static fragments = {
        viewer: () => Relay.QL `fragment on Viewer { id }`
    }

    getMutation() {
        return Relay.QL `mutation { insertBook }`;
    }

    // receives the parameters from the constructor, builds
    // the variables to send the GraphQL server
    getVariables() {
        return {
            book: {
                // id is NOT included because we are insert and as such, there is id
                title: this.props.title,
                category: this.props.category,
                price: this.props.price,
                authorId: this.props.authorId
            }
        };
    }

    getConfigs() {
        return [{
            // insert operation
            type: 'RANGE_ADD',
            // triggers update from container fragment viewer id
            // this is the name of property from the output field
            parentName: 'viewer',
            // id of viewer being updated
            parentID: this.props.viewer.id,
            // name of the connection on viewer
            connectionName: 'books',
            // output field name on GraphQL server, should match the payload 
            edgeName: 'bookEdge',
            // operation - do an append or prepend and such
            rangeBehaviors: {
                '': 'append'
            }
        }];
    }

    getFatQuery() {
        // corresponds to the structure of the output types
        // patten is used to not specify the parameters for the connections
        return Relay.QL `
			fragment on InsertBookPayload @relay(pattern: true) {
				viewer {
					books {
						edges {
							node {
								id
								title
								category
								price
								authorId
							}
						}
					}
				}
				bookEdge
			}
		`;
    }

}