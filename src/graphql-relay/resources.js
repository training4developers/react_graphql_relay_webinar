import fetch from 'node-fetch';
import { Viewer, Book } from './models';

export const getViewer = (baseUrl, id) => Object.assign(new Viewer(), { id });

export const getBooks = (baseUrl) =>
    fetch(`${baseUrl}/books`).then(res => res.json())
        .then(booksData => booksData.map(bookData => Object.assign(new Book(), bookData)));

export const getBook = (baseUrl, bookId) =>
    fetch(`${baseUrl}/books/${bookId}`).then(res => res.json())
        .then(bookData => Object.assign(new Book(), bookData));

export const insertBook = (baseUrl, book) =>
    fetch(`${baseUrl}/books`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book)
    }).then(res => res.json())
        .then(bookData => Object.assign(new Book(), bookData));

export const updateBook = (baseUrl, book) =>
    fetch(`${baseUrl}/books/${book.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book)
    }).then(res => res.json())
        .then(bookData => Object.assign(new Book(), bookData));

export const deleteBook = (baseUrl, bookId) =>
    getBook(baseUrl, bookId).then(book =>
        fetch(`${baseUrl}/books/${bookId}`, {
            method: 'DELETE'
        }).then(() => book));