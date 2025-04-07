import { Link } from 'react-router-dom';
import '../App.css';
import React, { useState, useEffect } from 'react';
import { getClient, createClient, updateClient, deleteClient } from '../services/clientServices';

function Client() {
  const [clients, setClients] = useState([]);
  const [newClient, setNewClient] = useState({ 
    name: '', 
    email: '', 
    phone: '', 
    regularity: '', 
  });
  const [editClient, setEditClient] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);

  const toggleSidebar = () => setIsOpen(!isOpen);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const data = await getClient();
      setClients(data);
    } catch (error) {
      console.error('Failed to fetch clients:', error);
      setError('Failed to fetch clients');
    }
  };

  const handleCreateClient = async () => {
    try {
      const createdClient = await createClient(newClient);
      setClients([...clients, createdClient]);
      setNewClient({ 
        name: '', 
        email: '', 
        phone: '', 
        regularity: '', 
      });
    } catch (error) {
      console.error('Failed to create client:', error);
      setError('Failed to create client');
    }
  };

  const handleUpdateClient = async (id) => {
    try {
      if (!editClient) return;
      const updatedClient = await updateClient(id, editClient);
      setClients(clients.map(client => (client.id === id ? updatedClient : client)));
      window.location.reload(); 
    } catch (error) {
      console.error('Failed to update client:', error);
      setError('Failed to update client');
    }
  };

  const handleDeleteClient = async (id) => {
    try {
      await deleteClient(id);
      setClients(clients.filter(client => client.id !== id));
    } catch (error) {
      console.error('Failed to delete client:', error);
      setError('Failed to delete client');
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

      <h1>Client Management</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div>
        <h2>{editClient ? 'Edit Client' : 'Add a New Client'}</h2>
        <input
          type="text"
          placeholder="Name"
          value={editClient ? editClient.name : newClient.name}
          onChange={(e) => editClient 
            ? setEditClient({...editClient, name: e.target.value})
            : setNewClient({...newClient, name: e.target.value})}
        />
        <input
          type="email"
          placeholder="Email"
          value={editClient ? editClient.email : newClient.email}
          onChange={(e) => editClient 
            ? setEditClient({...editClient, email: e.target.value})
            : setNewClient({...newClient, email: e.target.value})}
        />
        <input
          type="text"
          placeholder="Phone"
          value={editClient ? editClient.phone : newClient.phone}
          onChange={(e) => editClient 
            ? setEditClient({...editClient, phone: e.target.value})
            : setNewClient({...newClient, phone: e.target.value})}
        />
        <select
          value={editClient ? editClient.regularity : newClient.regularity}
          onChange={(e) => editClient 
            ? setEditClient({...editClient, regularity: e.target.value})
            : setNewClient({...newClient, regularity: e.target.value})}
        >
          <option value="">Select Regularity</option>
          <option value="WEEKLY">Weekly</option>
          <option value="MONTHLY">Monthly</option>
        </select>
        
        {editClient ? (
          <>
            <button onClick={() => handleUpdateClient(editClient.id)}>Save Changes</button>
            <button onClick={() => setEditClient(null)}>Cancel</button>
          </>
        ) : (
          <button onClick={handleCreateClient}>Add Client</button>
        )}
      </div>

      <div>
        <h2>Client List</h2>
        <ul>
          {clients.map((client) => (
            <li key={client.id}>
              <strong>Name:</strong> {client.name} | <strong>Email:</strong> {client.email}<br />
              <strong>Phone:</strong> {client.phone} | <strong>Regularity:</strong> {client.regularity}<br />
              <div>
                <button onClick={() => setEditClient({...client})}>Edit</button>
                <button onClick={() => handleDeleteClient(client.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Client;