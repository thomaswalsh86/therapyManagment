const { connectDB } = require('../db');

const getTherapist = async (req, res) => {
  try {
    const db = await connectDB();
    const [results] = await db.execute('SELECT * FROM therapists');
    res.json(results);
  } catch (err) {
    console.error('Error fetching Therapist:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const createTherapist = async (req, res) => {
  const { title, name, email, location, years_of_practice, availability } = req.body;
  try {
    const db = await connectDB();
    const [result] = await db.execute(
      'INSERT INTO therapists (title, name, email, location, years_of_practice, availability) VALUES (?, ?, ?, ?, ?, ?)',
      [title, name, email, location, years_of_practice, availability]
    );
    res.status(201).json({ 
      id: result.insertId, 
      title, 
      name, 
      email, 
      location, 
      years_of_practice, 
      availability 
    });
  } catch (err) {
    console.error('Error creating Therapist:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateTherapist = async (req, res) => {
  const { id } = req.params;
  const { title, name, email, location, years_of_practice, availability } = req.body;
  
  try {
    const db = await connectDB();
    const [result] = await db.execute(
      'UPDATE therapists SET title = ?, name = ?, email = ?, location = ?, years_of_practice = ?, availability = ? WHERE id = ?',
      [title, name, email, location, years_of_practice, availability, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Therapist not found" });
    }

    res.json({ message: "Therapist updated successfully" });
  } catch (err) {
    console.error('Error updating Therapist:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteTherapist = async (req, res) => {
  const { id } = req.params;

  try {
    const db = await connectDB();
    const [result] = await db.execute('DELETE FROM therapists WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Therapist not found' });
    }

    res.json({ message: 'Therapist deleted successfully' });
  } catch (err) {
    console.error('Error deleting Therapist:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getTherapist, createTherapist, updateTherapist, deleteTherapist };