import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import UpdateBalance from './components/UpdateBalance';

function App() {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <nav className="mb-4">
          <ul className="flex space-x-4">
            <li><Link to="/register" className="text-blue-500 hover:underline">Register</Link></li>
            <li><Link to="/login" className="text-blue-500 hover:underline">Login</Link></li>
            <li><Link to="/dashboard" className="text-blue-500 hover:underline">Dashboard</Link></li>
            <li><Link to="/update-balance" className="text-blue-500 hover:underline">Update Balance</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/update-balance" element={<UpdateBalance />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;