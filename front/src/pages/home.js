import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>

      <button 
        className="menu-button"
        onClick={toggleSidebar}
      >
        {isOpen ? 'Close' : 'Menu'}
      </button>

      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <ul>
          <li><Link to="/home" onClick={toggleSidebar}>Home</Link></li>
          <li><Link to="/client" onClick={toggleSidebar}>Client</Link></li>
          <li><Link to="/session" onClick={toggleSidebar}>Session</Link></li>
          <li><Link to="/therapist" onClick={toggleSidebar}>Therapist</Link></li>
        </ul>
      </div>

      <h1>Therapy Management System</h1>
      <div className="main-buttons-container">
        <button className="item" onClick={() => navigate('/client')}>Client Management</button>
        <button className="item" onClick={() => navigate('/therapist')}>Therapist Management</button>
        <button className="item" onClick={() => navigate('/session')}>Session Management</button>
      </div>
    </div>
  );
}

export default Home;