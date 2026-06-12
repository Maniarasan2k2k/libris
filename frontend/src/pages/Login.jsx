import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // If already logged in, redirect to dashboard
  useEffect(() => {
    if (localStorage.getItem('adminToken') === 'true') {
      navigate('/');
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simple credential check with small timeout for realistic feedback
    setTimeout(() => {
      if (username.trim() === 'admin' && password === 'password123') {
        localStorage.setItem('adminToken', 'true');


        toast.success("Login Successfully")

        
        setTimeout(() => {
          navigate("/books")
        },5000);
        
        
      } else {
        setError('Invalid username or password. (Use admin / password123)');
        setLoading(false);

        toast.error("Invalid Password or Email")
      }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4">
      <div className="w-full max-w-md bg-white border border-gray-200 p-8 rounded-xl shadow-md">

        {/* Title */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Libris Admin Panel</h1>
          <p className="text-gray-500 text-sm mt-1">Simple Library Management</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 bg-red-100 border border-red-400 text-red-700 p-3 rounded text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-1" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded-lg text-gray-900 bg-gray-50 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              placeholder="e.g. admin"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-1" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded-lg text-gray-900 bg-gray-50 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              placeholder="e.g. password123"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all cursor-pointer disabled:opacity-50"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center border-t border-gray-200 pt-4">
          <p className="text-xs text-gray-500">
            Demo Credentials: <code className="bg-gray-100 px-1 py-0.5 rounded text-gray-700 font-mono">admin</code> / <code className="bg-gray-100 px-1 py-0.5 rounded text-gray-700 font-mono">password123</code>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Login;
