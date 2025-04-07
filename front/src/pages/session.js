import { Link } from 'react-router-dom';
import '../App.css';
import React, { useState, useEffect } from 'react';
import { getSession, createSession, updateSession, deleteSession } from '../services/sessionServices';
import { getClient } from '../services/clientServices';
import { getTherapist } from '../services/therapistServices';

function Session() {
  const [sessions, setSessions] = useState([]);
  const [clients, setClients] = useState([]);
  const [therapists, setTherapists] = useState([]);
  const [newSession, setNewSession] = useState({ 
    therapist_id: '', 
    client_id: '', 
    notes: '', 
    date: '', 
    length: '' 
  });
  const [editSession, setEditSession] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);

  const toggleSidebar = () => setIsOpen(!isOpen);

  useEffect(() => {
    fetchSessions();
    fetchClients();
    fetchTherapists();
  }, []);

  const fetchSessions = async () => {
    try {
      const data = await getSession();
      setSessions(data);
    } catch (error) {
      console.error('Failed to fetch sessions:', error);
      setError('Failed to fetch sessions');
    }
  };

  const fetchClients = async () => {
    try {
      const data = await getClient();
      setClients(data);
    } catch (error) {
      console.error('Failed to fetch clients:', error);
    }
  };

  const fetchTherapists = async () => {
    try {
      const data = await getTherapist();
      const availableTherapists = data.filter(therapist => therapist.availability === "TAKING CLIENTS");
      setTherapists(availableTherapists);
    } catch (error) {
      console.error('Failed to fetch therapists:', error);
    }
  };

  const handleCreateSession = async () => {
    if (!newSession.therapist_id || !newSession.client_id || !newSession.date || !newSession.length) {
      setError('Please fill all required fields');
      return;
    }

    try {
      const createdSession = await createSession(newSession);
      setSessions([...sessions, createdSession]);
      setNewSession({ 
        therapist_id: '', 
        client_id: '', 
        notes: '', 
        date: '', 
        length: '' 
      });
      setError(null);
    } catch (error) {
      console.error('Failed to create session:', error);
      setError('Failed to create session');
    }
  };

  const handleUpdateSession = async (id) => {
    try {
      const updatedSession = await updateSession(id, editSession);
      setSessions(sessions.map(session => (session.id === id ? updatedSession : session)));
      setEditSession(null);
      window.location.reload(); 
    } catch (error) {
      console.error('Failed to update session:', error);
      setError('Failed to update session');
    }
  };

  const handleDeleteSession = async (id) => {
    try {
      await deleteSession(id);
      setSessions(sessions.filter(session => session.id !== id));
    } catch (error) {
      console.error('Failed to delete session:', error);
      setError('Failed to delete session');
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

      <h1>Session Management</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div>
        <h2>{editSession ? 'Edit Session' : 'Add a New Session'}</h2>
        <div>
          <label>Therapist:</label>
          <select
            value={editSession ? editSession.therapist_id : newSession.therapist_id}
            onChange={(e) => editSession 
              ? setEditSession({...editSession, therapist_id: e.target.value})
              : setNewSession({...newSession, therapist_id: e.target.value})}
          >
            <option value="">Select Therapist</option>
            {therapists.map(therapist => (
              <option key={therapist.id} value={therapist.id}>
                {therapist.title} {therapist.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Client:</label>
          <select
            value={editSession ? editSession.client_id : newSession.client_id}
            onChange={(e) => editSession 
              ? setEditSession({...editSession, client_id: e.target.value})
              : setNewSession({...newSession, client_id: e.target.value})}
          >
            <option value="">Select Client</option>
            {clients.map(client => (
              <option key={client.id} value={client.id}>
                {client.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Notes:</label>
          <textarea
            value={editSession ? editSession.notes : newSession.notes}
            onChange={(e) => editSession 
              ? setEditSession({...editSession, notes: e.target.value})
              : setNewSession({...newSession, notes: e.target.value})}
          />
        </div>

        <div>
          <label>Date and Time:</label>
          <input
            type="datetime-local"
            value={editSession ? editSession.date : newSession.date}
            onChange={(e) => editSession 
              ? setEditSession({...editSession, date: e.target.value})
              : setNewSession({...newSession, date: e.target.value})}
          />
        </div>

        <div>
          <label>Length (minutes):</label>
          <input
            type="number"
            value={editSession ? editSession.length : newSession.length}
            onChange={(e) => editSession 
              ? setEditSession({...editSession, length: e.target.value})
              : setNewSession({...newSession, length: e.target.value})}
            min="1"
          />
        </div>

        {editSession ? (
          <>
            <button onClick={() => handleUpdateSession(editSession.id)}>Save Changes</button>
            <button onClick={() => setEditSession(null)}>Cancel</button>
          </>
        ) : (
          <button onClick={handleCreateSession}>Add Session</button>
        )}
      </div>

      <div>
        <h2>Session List</h2>
        {sessions.length === 0 ? (
          <p>No sessions found</p>
        ) : (
          <ul>
            {sessions.map((session) => {
              const therapist = therapists.find(t => t.id === session.therapist_id);
              const client = clients.find(c => c.id === session.client_id);
              
              return (
                <li key={session.id}>
                  <div>
                    <strong>Therapist:</strong> {therapist ? `${therapist.title} ${therapist.name}` : 'Unknown'}<br />
                    <strong>Client:</strong> {client ? client.name : 'Unknown'}<br />
                    <strong>Date:</strong> {new Date(session.date).toLocaleString()}<br />
                    <strong>Length:</strong> {session.length} minutes<br />
                    {session.notes && <><strong>Notes:</strong> {session.notes}<br /></>}
                  </div>
                  <div>
                    <button onClick={() => setEditSession({...session})}>Edit</button>
                    <button onClick={() => handleDeleteSession(session.id)}>Delete</button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Session;