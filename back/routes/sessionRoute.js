const express = require('express');
const router = express.Router();
const { getSession, createSession, updateSession, deleteSession } = require('../controllers/sessionController'); // Import createSession

router.get('/', getSession);

router.post('/', createSession);
router.put('/:id', updateSession); 
router.delete('/:id', deleteSession);

module.exports = router;