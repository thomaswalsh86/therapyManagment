const { connectDB } = require('../db');

const getSession = async (req, res) => {
  try {
    const db = await connectDB();
    const [results] = await db.execute('SELECT * FROM sessions');
    res.json(results);
  } catch (err) {
    console.error('Error fetching Session:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const createSession = async (req, res) => {
  const { therapist_id, client_id, notes, date, length } = req.body;
  
  // Validate required fields
  if (!therapist_id || !client_id || !date || !length) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const db = await connectDB();
    const [result] = await db.execute(
      'INSERT INTO sessions (therapist_id, client_id, notes, date, length) VALUES (?, ?, ?, ?, ?)',
      [therapist_id, client_id, notes, date, length]
    );
    res.status(201).json({ 
      id: result.insertId, 
      therapist_id, 
      client_id, 
      notes, 
      date, 
      length 
    });
  } catch (err) {
    console.error('Error creating Session:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateSession = async (req, res) => {
  const { id } = req.params;
  const { therapist_id, client_id, notes, date, length } = req.body;

  try {
    const db = await connectDB();
    const [result] = await db.execute(
      'UPDATE sessions SET therapist_id = ?, client_id = ?, notes = ?, date = ?, length = ? WHERE id = ?',
      [therapist_id, client_id, notes, date, length, id]
    );
    res.json({ message: "Session updated successfully" });
  } catch (err) {
    console.error('Error updating Session:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteSession = async (req, res) => {
  const { id } = req.params;

  try {
    const db = await connectDB();
    const [result] = await db.execute('DELETE FROM sessions WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Session not found' });
    }

    res.json({ message: 'Session deleted successfully' });
  } catch (err) {
    console.error('Error deleting Session:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getSession, createSession, updateSession, deleteSession };