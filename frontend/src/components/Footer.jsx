import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-6 text-center text-gray-500 text-sm mt-auto">
      <div className="max-w-6xl mx-auto px-4">
        <p>&copy; {new Date().getFullYear()} www.libris.com | +91-9876543210 | libris@gmail.com </p>
      </div>
    </footer>
  );
};

export default Footer;
