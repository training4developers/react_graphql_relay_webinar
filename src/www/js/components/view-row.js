import React from 'react';

export const ViewRow = props => <tr>
	<td>{props.book.title}</td>
	<td className='capitalize'>{props.book.category}</td>
	<td className='number'>{props.book.price}</td>
	<td className='number'>{props.book.authorId}</td>
	<td>
		<button className='btn btn-primary btn-sm' type='button'
			onClick={() => props.onEdit(props.book.id)}>Edit</button>
		<button className='btn btn-danger btn-sm' type='button'
			onClick={() => props.onDelete(props.book)}>Delete</button>
	</td>
</tr>;

ViewRow.propTypes = {

    book: React.PropTypes.shape({
        id: React.PropTypes.string,
        title: React.PropTypes.string,
        category: React.PropTypes.string,
        price: React.PropTypes.number,
        authorId: React.PropTypes.number
    }),
    onEdit: React.PropTypes.func,
    onDelete: React.PropTypes.func

};
