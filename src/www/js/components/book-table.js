import React from 'react';
import { ViewRow } from './view-row';
import { EditRow } from './edit-row';

export const BookTable = props => <table className="table table-inverse">
	<thead>
		<tr>
			<th>Title</th>
			<th>Category</th>
			<th>Price</th>
			<th>Author Id</th>
			<th>Action</th>
		</tr>
	</thead>
	<tbody>
		{props.books.edges.map(edge => props.editBookId === edge.node.id
			? <EditRow key={edge.node.id} book={edge.node}
				onSave={props.onSave} onCancelEdit={props.onCancelEdit} />
		: <ViewRow key={edge.node.id} book={edge.node}
			onEdit={props.onEdit} onDelete={props.onDelete} />)}
		<EditRow onSave={props.onSave} key="-1" />
	</tbody>
</table>;

BookTable.propTypes = {
    books: React.PropTypes.shape({
        edges: React.PropTypes.array
    }),
    onSave: React.PropTypes.func,
    onDelete: React.PropTypes.func,
    onCancelEdit: React.PropTypes.func,
    onEdit: React.PropTypes.func
};