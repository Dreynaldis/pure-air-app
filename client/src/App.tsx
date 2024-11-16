import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Ensure this import is here for styling the toasts
import Navbar from './component/Navbar'; // Adjust the import path based on your project structure
import LoginPage from './pages/LoginPage'; // Adjust the path based on your project structure
import DashboardPage from './pages/DashboardPage'; // Adjust the path based on your project structure

const App: React.FC = () => {
  return (
    <Router>
        <ToastContainer />
        <Navbar />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
    </Router>
  );
};

export default App;
