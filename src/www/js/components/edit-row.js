import React from 'react';

export class EditRow extends React.Component {

    static propTypes = {

        book: React.PropTypes.shape({
            id: React.PropTypes.string,
            title: React.PropTypes.string,
            category: React.PropTypes.string,
            price: React.PropTypes.number,
            authorId: React.PropTypes.number
        }),
        onSave: React.PropTypes.func,
        onCancelEdit: React.PropTypes.func

    };

    constructor(props) {
        super(props);

        if (props.book) {
            this.state = {
                id: props.book.id,
                title: props.book.title,
                category: props.book.category,
                price: props.book.price,
                authorId: props.book.authorId
            };
        } else {
            this.state = {
                id: -1,
                title: '',
                category: '',
                price: 0,
                authorId: -1
            };
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSave = () => {
        const book = Object.assign({}, this.state);
        book.price = parseInt(book.price, 10);
        book.authorId = parseInt(book.authorId, 10);
        this.props.onSave(book);
    }

    render() {

        return <tr>
            <td><input className="form-control form-control-sm" type="text" name="title" value={this.state.title} onChange={this.onChange} /></td>
            <td><input className="form-control form-control-sm" type="text" name="category" value={this.state.category} onChange={this.onChange} /></td>
            <td><input className="form-control form-control-sm" type="number" name="price" value={this.state.price} onChange={this.onChange} /></td>
            <td><input className="form-control form-control-sm" type="number" name="authorId" value={this.state.authorId} onChange={this.onChange} /></td>            
            <td>
                <button className='btn btn-primary btn-sm'
                    type='button' onClick={this.onSave}>Save</button>
                <button className='btn btn-default btn-sm'
                    type='button' onClick={this.props.onCancelEdit}>Cancel</button>
            </td>
        </tr>;

    }
}