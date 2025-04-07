const express = require('express');
const router = express.Router();
const { getTherapist, createTherapist, updateTherapist, deleteTherapist } = require('../controllers/therapistController'); // Import createTherapist

router.get('/', getTherapist);

router.post('/', createTherapist);
router.put('/:id', updateTherapist); 
router.delete('/:id', deleteTherapist);

module.exports = router;