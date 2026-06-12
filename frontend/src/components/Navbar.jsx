import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path
      ? 'text-blue-600 font-bold'
      : 'text-gray-600 hover:text-gray-900';
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="text-xl font-bold text-gray-800">
            Libris<span className="text-blue-600">Admin</span>
          </Link>

          {/* Links */}
          <div className="flex space-x-6 items-center">
            <Link to="/books" className={`text-sm ${isActive('/books')}`}>
              Books
            </Link>
            <Link to="/members" className={`text-sm ${isActive('/members')}`}>
              Members
            </Link>
            <button
              onClick={handleLogout}
              className="px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded text-xs font-semibold cursor-pointer transition-all"
            >
              Logout
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
