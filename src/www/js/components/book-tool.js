import React from 'react';
import Relay from 'react-relay';
import { BaseComponent } from './base-component';
import { BookTable } from './book-table';
import { InsertBookMutation } from '../mutations/insert-book-mutation';
import { UpdateBookMutation } from '../mutations/update-book-mutation';
import { DeleteBookMutation } from '../mutations/delete-book-mutation';

export class BookTool extends BaseComponent {

    static propTypes = {
        viewer: React.PropTypes.shape({
            books: React.PropTypes.object
        })
    };

    constructor(props) {
        super(props);

        this.state = {
            editBookId: null,
        };
    }

    appendBook(book) {
        Relay.Store.commitUpdate(new InsertBookMutation(
            Object.assign({
                viewer: this.props.viewer,
                book: null
            }, book)
        ));
    }

    updateBook(book) {
        Relay.Store.commitUpdate(new UpdateBookMutation(
            Object.assign({
                viewer: this.props.viewer,
                book: book
            }, book)
        ));
    }

    saveBook = (book) => {
        if (book.id !== -1) {
            this.updateBook(book);
        } else {
            this.appendBook(book);
        }
        this.setState({
            editBookId: null
        });
    }

    editBook = (bookId) => {
        this.setState({
            editBookId: bookId
        });
    }

    cancelEditBook = () => {
        this.setState({
            editBookId: null
        });
    }

    deleteBook = (book) => {
        Relay.Store.commitUpdate(new DeleteBookMutation({
            viewer: this.props.viewer,
            book,
            bookId: book.id
        }));
    }

    onVariableChange = ({ target }) => {
        this.props.relay.setVariables({
            currentPage: 0,
            [target.name]: target.value,
            beforeBookPageSize: null,
            beforeBookCursor: null,
            afterBookPageSize: target.value,
            afterBookCursor: null, 
        });
    };

    doNext(cursor) {
        this.props.relay.setVariables({
            currentPage: this.props.relay.variables.currentPage + 1,
            beforeBookPageSize: null,
            beforeBookCursor: null,
            afterBookPageSize: this.props.relay.variables.bookPageSize,
            afterBookCursor: cursor,
        });
    }

    doPrev(cursor) {
        this.props.relay.setVariables({
            currentPage: this.props.relay.variables.currentPage - 1,
            beforeBookPageSize: this.props.relay.variables.bookPageSize,
            beforeBookCursor: cursor,
            afterBookPageSize: null,
            afterBookCursor: null,
        });
    }

    onPrevPage = () => {
        this.doPrev(this.props.viewer.books.edges[0].cursor);
    };

    onNextPage = () => {
        this.doNext(this.props.viewer.books
            .edges[this.props.viewer.books.edges.length-1].cursor);
    };

    getPageCount() {

        const totalBookCount = this.props.viewer.books.totalCount;
        const bookPageSize = this.props.relay.variables.bookPageSize;

        let pageCount = totalBookCount / bookPageSize >> 0;

        if (totalBookCount % bookPageSize !== 0) {
            pageCount++;
        }

        return pageCount;
    }

    render() {

        const currentPage = this.props.relay.variables.currentPage;
        const pageCount = this.getPageCount();

        return <div className='col-md-12'>
            <BookTable
                books={this.props.viewer.books} editBookId={this.state.editBookId}
                onSave={this.saveBook} onDelete={this.deleteBook}
                onEdit={this.editBook} onCancelEdit={this.cancelEditBook} />

            <label htmlFor="book-page-size-select">Page Length:</label>
            <select id="book-page-size-select" name="bookPageSize"
                value={this.props.relay.variables.bookPageSize}
                onChange={this.onVariableChange}>
                <option value="2">2</option>
                <option value="5">5</option>
            </select>

            <button type="button" onClick={this.onPrevPage}
                disabled={currentPage === 0}>Prev</button>
            <button type="button" onClick={this.onNextPage}
                disabled={currentPage >= (pageCount - 1)}>Next</button>
            <br /><span>Total Book Count: {this.props.viewer.books.totalCount}</span>
            <br /><span>Total Page Count: {pageCount}</span>
            <br /><span>Current Page: {currentPage + 1}</span>
        </div>;
    }

}