import Relay from 'react-relay';

export class UpdateBookMutation extends Relay.Mutation {

    static fragments = {
        viewer: () => Relay.QL `fragment on Viewer { id }`
    }

    getMutation() {
        // the name 'updateWidget' is hanging off the
        // mutation type
        return Relay.QL `mutation { updateBook }`;
    }

    // receives the parameters from the constructor, builds
    // the variables to send the GraphQL server
    getVariables() {
        return {
            book: {
                id: this.props.id,
                title: this.props.title,
                category: this.props.category,
                price: this.props.price,
                authorId: this.props.authorId
            }
        };
    }

    getConfigs() {
        return [{
            // update operation
            type: 'FIELDS_CHANGE',
            fieldIDs: {
                // id of the top level fragment
                // id of the viewer updated
                viewer: this.props.viewer.id
            }
        }];
    }

    getFatQuery() {
        // corresponds to the structure of the output types
        // patten is used to not specify the parameters for the connections
        // name of the 'payload' is derived from the mutation name,
        // with the first work of the mutation name being capitalized
        return Relay.QL `
			fragment on UpdateBookPayload @relay(pattern: true) {
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