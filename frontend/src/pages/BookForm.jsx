import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from '../api/axios';
import { toast } from 'react-toastify';

const BookForm = () => {
  const [formData, setFormData] = useState({ title: '', author: '', isbn: '', genre: '', totalCopies: 1, publishedYear: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  useEffect(() => {
    if (isEditMode) {
      const fetchBook = async () => {
        try {
          const res = await api.get(`/books/${id}`);
          const book = res.data;
          setFormData({
            title: book.title || '',
            author: book.author || '',
            isbn: book.isbn || '',
            genre: book.genre || '',
            totalCopies: book.totalCopies || 1,
            publishedYear: book.publishedYear || '',

            
          });
          


        } catch (err) {
          console.error(err);
          alert('Failed to load book details');
        }
      };
      fetchBook();
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEditMode) {
        await api.put(`/books/${id}`, formData);
      } else {
        await api.post('/books', formData);
      }
      toast.success("Book Added Successfully")
      navigate('/books');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Error saving book');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 bg-white p-8 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center justify-between border-b pb-4">
        <h2 className="text-2xl font-bold text-gray-800">
          {isEditMode ? 'Edit Book Details' : 'Add New Book'}
        </h2>
        <Link to="/books" className="text-blue-600 hover:underline text-sm font-medium">
          Back to List
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="md:col-span-2">
            <label className="block text-gray-700 font-semibold mb-1">Book Title <span className="text-red-500">*</span></label>
            <input type="text" name="title" required value={formData.title} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded focus:outline-none focus:border-blue-500" />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Author<span className="text-red-500">*</span></label>
            <input type="text" name="author" required value={formData.author} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded focus:outline-none focus:border-blue-500" />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">ISBN <span className="text-red-500">*</span></label>
            <input type="text" name="isbn" required value={formData.isbn} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded focus:outline-none focus:border-blue-500" />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Genre / Category</label>
            <input type="text" name="genre" value={formData.genre} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded focus:outline-none focus:border-blue-500" />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Published Year</label>
            <input type="number" name="publishedYear" value={formData.publishedYear} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded focus:outline-none focus:border-blue-500" />
          </div>

          <div className="md:col-span-2">
            <label className="block text-gray-700 font-semibold mb-1">Total Copies <span className="text-red-500">*</span></label>
            <input type="number" name="totalCopies" required min="1" value={formData.totalCopies} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded focus:outline-none focus:border-blue-500" />
          </div>
        </div>

        <div className="pt-4 flex justify-end gap-3">
          <Link to="/books" className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-5 py-2.5 rounded transition-colors font-medium border border-gray-300">
            Cancel
          </Link>
          <button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded transition-colors font-medium disabled:opacity-50">
            {loading ? 'Saving...' : (isEditMode ? 'Update Book' : 'Add Book')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookForm;
