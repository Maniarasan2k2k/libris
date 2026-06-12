import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import BookList from './pages/BookList';
import BookForm from './pages/BookForm';
import MemberList from './pages/MemberList';
import MemberForm from './pages/MemberForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/books" replace />} />
          <Route path="books" element={<BookList />} />
          <Route path="books/add" element={<BookForm />} />
          <Route path="books/edit/:id" element={<BookForm />} />
          <Route path="members" element={<MemberList />} />
          <Route path="members/add" element={<MemberForm />} />
          <Route path="members/edit/:id" element={<MemberForm />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
