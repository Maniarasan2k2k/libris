import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

const BookList = () => {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    try {
      const res = await api.get('/books');
      setBooks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchBooks(); }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await api.delete(`/books/${id}`);
        fetchBooks();
      } catch (err) {
        alert('Error deleting book');
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex flex-col sm:flex-row justify-between items-center border-b pb-4 gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Manage Books</h2>
        <Link to="/books/add" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded transition-colors font-medium whitespace-nowrap">
          + Add New Book
        </Link>
      </div>

      <div className="overflow-x-auto border border-gray-200 rounded-md">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200">
              <th className="p-4 font-semibold text-gray-700">Book Details</th>
              <th className="p-4 font-semibold text-gray-700">ISBN & Category</th>
              <th className="p-4 font-semibold text-gray-700">Stock Status</th>
              <th className="p-4 font-semibold text-gray-700 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {books.length > 0 ? books.map((b) => (
              <tr key={b._id} className="hover:bg-gray-50 transition-colors">
                <td className="p-4">
                  <div className="font-bold text-gray-800">{b.title}</div>
                  <div className="text-sm text-gray-500">by {b.author}</div>
                </td>

                <td className="p-4 text-sm text-gray-600">
                  <div className="font-mono text-gray-500">{b.isbn}</div>
                  <div>{b.genre || '-'} | {b.publishedYear || '-'}</div>
                </td>

                <td className="p-4 text-sm">
                  <span className={`font-bold ${b.availableCopies > 0 ? 'text-green-600' : 'text-red-500'}`}>
                    {b.availableCopies} available
                  </span>
                  <div className="text-gray-500">of {b.totalCopies} total</div>
                </td>
                <td className="p-4 text-right space-x-3">
                  <Link to={`/books/edit/${b._id}`} className="text-blue-600 hover:text-blue-800 font-medium">Edit</Link>
                  <button onClick={() => handleDelete(b._id)} className="text-red-600 hover:text-red-800 font-medium">Delete</button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="4" className="p-8 text-center text-gray-500">No books registered in the catalogue yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookList;
