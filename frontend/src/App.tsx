import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import TodoListPage from './pages/TodoListPage';
import ProtectedRoute from './components/common/ProtectedRoute';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Public routes */}
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Protected routes */}
            <Route 
              path="/todos" 
              element={
                <ProtectedRoute>
                  <TodoListPage />
                </ProtectedRoute>
              } 
            />

            {/* Default route - redirect based on auth status */}
            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <Navigate to="/todos" replace />
                </ProtectedRoute>
              } 
            />

            {/* Catch-all route - redirect to appropriate page */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
