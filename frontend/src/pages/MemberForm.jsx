import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from '../api/axios';

const MemberForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', department: '', memberType: 'student', isActive: true });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  useEffect(() => {
    if (isEditMode) {
      const fetchMember = async () => {
        try {
          const res = await api.get(`/members/${id}`);
          const member = res.data;
          setFormData({
            name: member.name || '',
            email: member.email || '',
            phone: member.phone || '',
            department: member.department || '',
            memberType: member.memberType || 'student',
            isActive: member.isActive !== undefined ? member.isActive : true,
          });
        } catch (err) {
          console.error(err);
          alert('Failed to load member details');
        }
      };
      fetchMember();
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEditMode) {
        await api.put(`/members/${id}`, formData);
      } else {
        await api.post('/members', formData);
      }
      navigate('/members');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Error saving member');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 bg-white p-8 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center justify-between border-b pb-4">
        <h2 className="text-2xl font-bold text-gray-800">
          {isEditMode ? 'Edit Member Profile' : 'Register New Member'}
        </h2>
        <Link to="/members" className="text-blue-600 hover:underline text-sm font-medium">
          Back to List
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="md:col-span-2">
            <label className="block text-gray-700 font-semibold mb-1">Full Name <span className="text-red-500">*</span></label>
            <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded focus:outline-none focus:border-blue-500" />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Email Address <span className="text-red-500">*</span></label>
            <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded focus:outline-none focus:border-blue-500" />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Phone Number</label>
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded focus:outline-none focus:border-blue-500" />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Department / Class</label>
            <input type="text" name="department" value={formData.department} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded focus:outline-none focus:border-blue-500" />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Member Type <span className="text-red-500">*</span></label>
            <select name="memberType" required value={formData.memberType} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded focus:outline-none focus:border-blue-500 bg-white">
              <option value="student">Student</option>
              <option value="faculty">Faculty</option>
            </select>
          </div>

          {isEditMode && (
            <div className="md:col-span-2 flex items-center mt-2 p-3 bg-gray-50 rounded border border-gray-200">
              <input type="checkbox" id="isActive" name="isActive" checked={formData.isActive} onChange={handleChange} className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer" />
              <label htmlFor="isActive" className="ml-3 text-gray-700 font-semibold cursor-pointer">
                Account Active
              </label>
            </div>
          )}
        </div>

        <div className="pt-4 flex justify-end gap-3">
          <Link to="/members" className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-5 py-2.5 rounded transition-colors font-medium border border-gray-300">
            Cancel
          </Link>
          <button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded transition-colors font-medium disabled:opacity-50">
            {loading ? 'Saving...' : (isEditMode ? 'Update Member' : 'Add Member')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MemberForm;
