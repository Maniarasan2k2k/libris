import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

const MemberList = () => {
  const [members, setMembers] = useState([]);

  const fetchMembers = async () => {
    try {
      const res = await api.get('/members');
      setMembers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchMembers(); }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      try {
        await api.delete(`/members/${id}`);
        fetchMembers();
      } catch (err) {
        alert('Error deleting member');
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex flex-col sm:flex-row justify-between items-center border-b pb-4 gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Manage Members</h2>
        <Link to="/members/add" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded transition-colors font-medium whitespace-nowrap">
          + Add New Member
        </Link>
      </div>

      <div className="overflow-x-auto border border-gray-200 rounded-md">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200">
              <th className="p-4 font-semibold text-gray-700">Member Details</th>
              <th className="p-4 font-semibold text-gray-700">Classification</th>
              <th className="p-4 font-semibold text-gray-700">Status</th>
              <th className="p-4 font-semibold text-gray-700 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {members.length > 0 ? members.map((m) => (
              <tr key={m._id} className="hover:bg-gray-50 transition-colors">
                <td className="p-4">
                  <div className="font-bold text-gray-800">{m.name}</div>
                  <div className="text-sm text-gray-500">{m.email} {m.phone && `| ${m.phone}`}</div>
                </td>
                <td className="p-4 text-sm text-gray-600">
                  <span className="capitalize font-semibold text-gray-700">{m.memberType}</span>
                  <div className="text-gray-500">{m.department || '-'}</div>
                </td>
                <td className="p-4 text-sm">
                  {m.isActive ? (
                    <span className="text-green-600 font-bold">Active</span>
                  ) : (
                    <span className="text-red-600 font-bold">Inactive</span>
                  )}
                </td>
                <td className="p-4 text-right space-x-3">
                  <Link to={`/members/edit/${m._id}`} className="text-blue-600 hover:text-blue-800 font-medium">Edit</Link>
                  <button onClick={() => handleDelete(m._id)} className="text-red-600 hover:text-red-800 font-medium">Delete</button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="4" className="p-8 text-center text-gray-500">No members registered yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MemberList;
