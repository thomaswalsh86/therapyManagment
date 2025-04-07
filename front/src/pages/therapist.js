import { Link } from 'react-router-dom';
import '../App.css';
import React, { useState, useEffect } from 'react';
import { getTherapist, createTherapist, updateTherapist, deleteTherapist } from '../services/therapistServices';

function Therapist() {
  const [therapists, setTherapists] = useState([]);
  const [newTherapist, setNewTherapist] = useState({
    title: '',
    name: '',
    email: '',
    location: '',
    years_of_practice: '',
    availability: '',
    created_at: ''
  });
  const [editTherapist, setEditTherapist] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);

  const toggleSidebar = () => setIsOpen(!isOpen);

  useEffect(() => {
    fetchTherapists();
  }, []);

  const fetchTherapists = async () => {
    try {
      const data = await getTherapist();
      setTherapists(data);
    } catch (error) {
      console.error('Failed to fetch therapists:', error);
      setError('Failed to fetch therapists');
    }
  };

  const handleCreateTherapist = async () => {
    try {
      const createdTherapist = await createTherapist(newTherapist);
      setTherapists([...therapists, createdTherapist]);
      setNewTherapist({
        title: '',
        name: '',
        email: '',
        location: '',
        years_of_practice: '',
        availability: '',
        created_at: ''
      });
    } catch (error) {
      console.error('Failed to create therapist:', error);
      setError('Failed to create therapist');
    }
  };

  const handleUpdateTherapist = async (id) => {
    try {
      if (!editTherapist) return;
      const updatedTherapist = await updateTherapist(id, editTherapist);
      setTherapists(therapists.map(t => (t.id === id ? updatedTherapist : t)));
      window.location.reload(); 
    } catch (error) {
      console.error('Failed to update therapist:', error);
      setError('Failed to update therapist');
    }
  };

  const handleDeleteTherapist = async (id) => {
    try {
      await deleteTherapist(id);
      setTherapists(therapists.filter(t => t.id !== id));
    } catch (error) {
      console.error('Failed to delete therapist:', error);
      setError('Failed to delete therapist');
    }
  };

  return (
    <div className='client'>
      <button className="menu-button" onClick={toggleSidebar}>
        {isOpen ? 'Close' : 'Menu'}
      </button>

      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <ul>
          <li><Link to="/" onClick={toggleSidebar}>Home</Link></li>
          <li><Link to="/client" onClick={toggleSidebar}>Client</Link></li>
          <li><Link to="/session" onClick={toggleSidebar}>Session</Link></li>
          <li><Link to="/therapist" onClick={toggleSidebar}>Therapist</Link></li>
        </ul>
      </div>

      <h1>Therapist Management</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div>
        <h2>{editTherapist ? 'Edit Therapist' : 'Add a New Therapist'}</h2>
        <input
          type="text"
          placeholder="Title"
          value={editTherapist ? editTherapist.title : newTherapist.title}
          onChange={(e) => editTherapist 
            ? setEditTherapist({...editTherapist, title: e.target.value})
            : setNewTherapist({...newTherapist, title: e.target.value})}
        />
        <input
          type="text"
          placeholder="Name"
          value={editTherapist ? editTherapist.name : newTherapist.name}
          onChange={(e) => editTherapist 
            ? setEditTherapist({...editTherapist, name: e.target.value})
            : setNewTherapist({...newTherapist, name: e.target.value})}
        />
        <input
          type="email"
          placeholder="Email"
          value={editTherapist ? editTherapist.email : newTherapist.email}
          onChange={(e) => editTherapist 
            ? setEditTherapist({...editTherapist, email: e.target.value})
            : setNewTherapist({...newTherapist, email: e.target.value})}
        />
        <input
          type="text"
          placeholder="Location"
          value={editTherapist ? editTherapist.location : newTherapist.location}
          onChange={(e) => editTherapist 
            ? setEditTherapist({...editTherapist, location: e.target.value})
            : setNewTherapist({...newTherapist, location: e.target.value})}
        />
        <input
          type="number"
          placeholder="Years of Practice"
          value={editTherapist ? editTherapist.years_of_practice : newTherapist.years_of_practice}
          onChange={(e) => editTherapist 
            ? setEditTherapist({...editTherapist, years_of_practice: e.target.value})
            : setNewTherapist({...newTherapist, years_of_practice: e.target.value})}
        />
        <select
          value={editTherapist ? editTherapist.availability : newTherapist.availability}
          onChange={(e) => editTherapist 
            ? setEditTherapist({...editTherapist, availability: e.target.value})
            : setNewTherapist({...newTherapist, availability: e.target.value})}
        >
          <option value="">Select Availability</option>
          <option value="TAKING CLIENTS">TAKING CLIENTS</option>
          <option value="NOT TAKING CLIENTS">NOT TAKING CLIENTS</option> 
      
        </select>
        <input
          type="date"
          placeholder="Created At"
          value={editTherapist ? editTherapist.created_at : newTherapist.created_at}
          onChange={(e) => editTherapist 
            ? setEditTherapist({...editTherapist, created_at: e.target.value})
            : setNewTherapist({...newTherapist, created_at: e.target.value})}
        />
        
        {editTherapist ? (
          <>
            <button onClick={() => handleUpdateTherapist(editTherapist.id)}>Save Changes</button>
            <button onClick={() => setEditTherapist(null)}>Cancel</button>
          </>
        ) : (
          <button onClick={handleCreateTherapist}>Add Therapist</button>
        )}
      </div>

      <div>
        <h2>Therapist List</h2>
        <ul>
          {therapists.map((t) => (
            <li key={t.id}>
              <strong>Title:</strong> {t.title} | <strong>Name:</strong> {t.name}<br />
              <strong>Email:</strong> {t.email} | <strong>Location:</strong> {t.location}<br />
              <strong>Years of Practice:</strong> {t.years_of_practice} | <strong>Availability:</strong> {t.availability}<br />
              <strong>Created:</strong> {t.created_at}
              <div>
                <button onClick={() => setEditTherapist({...t})}>Edit</button>
                <button onClick={() => handleDeleteTherapist(t.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Therapist;