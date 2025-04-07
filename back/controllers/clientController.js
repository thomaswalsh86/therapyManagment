const { connectDB } = require('../db');

const getClient = async (req, res) => {
  try {
    const db = await connectDB();
    const [results] = await db.execute('SELECT * FROM clients');
    res.json(results);
  } catch (err) {
    console.error('Error fetching Client:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const createClient = async (req, res) => {
  const { name, email, phone, regularity,  } = req.body;
  try {
    const db = await connectDB();
  
    const [result] = await db.execute(
      'INSERT INTO clients (name, email, phone, regularity, ) VALUES (?, ?, ?, ?, ?)',
      [name, email, phone, regularity, ]
    );
    
    res.status(201).json({
      id: result.insertId, 
      name, 
      email, 
      phone, 
      regularity, 
      
    });
  } catch (err) {
    console.error('Error creating client:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateClient = async (req, res) => {
  const { id } = req.params;
  let { name, email, phone, regularity,  } = req.body;
  
  name = name || null;
  email = email || null;
  phone = phone || null;
  regularity = regularity || null;

  try {
    const db = await connectDB();
    const [result] = await db.execute(
      'UPDATE clients SET name = ?, email = ?, phone = ?, regularity = ?,  = ? WHERE id = ?',
      [name, email, phone, regularity, , id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Client not found" });
    }

    res.json({ message: "Client updated successfully" });
  } catch (err) {
    console.error('Error updating Client:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteClient = async (req, res) => {
  const { id } = req.params;

  try {
    const db = await connectDB();
    const [result] = await db.execute('DELETE FROM clients WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Client not found' });
    }

    res.json({ message: 'Client deleted successfully' });
  } catch (err) {
    console.error('Error deleting Client:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getClient, createClient, updateClient, deleteClient };
