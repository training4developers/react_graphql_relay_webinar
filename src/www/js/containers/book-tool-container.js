import Relay from 'react-relay';

import { BookTool } from '../components/book-tool';
import { InsertBookMutation } from '../mutations/insert-book-mutation';
import { UpdateBookMutation } from '../mutations/update-book-mutation';
import { DeleteBookMutation } from '../mutations/delete-book-mutation';

export default Relay.createContainer(BookTool, {

    initialVariables: {
        bookPageSize: 30,
        beforeBookPageSize: null,
        beforeBookCursor: null,
        afterBookPageSize: 30,
        afterBookCursor: null
    },

    fragments: {

        viewer: () => Relay.QL `
			fragment on Viewer {
				id
				books(first: $afterBookPageSize last: $beforeBookPageSize after: $afterBookCursor before: $beforeBookCursor) {
                    totalCount
					edges {
                        cursor
						node {
							id
							title
							category
                            price
                            authorId
						}
					}
				}
				${InsertBookMutation.getFragment('viewer')}
				${UpdateBookMutation.getFragment('viewer')}
				${DeleteBookMutation.getFragment('viewer')}
			}
		
		`
    }
});