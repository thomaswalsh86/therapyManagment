const express = require('express');
const router = express.Router();
const { getClient, createClient, updateClient, deleteClient } =require('../controllers/clientController'); // Import createClient

router.get('/', getClient);

router.post('/', createClient);
router.put('/:id', updateClient); 
router.delete('/:id', deleteClient);

module.exports = router;