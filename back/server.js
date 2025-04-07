const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  }));
app.use(express.json());  
app.use(express.urlencoded({ extended: true }));

const clientRoute = require('./routes/clientRoute');
const sessionRoute = require('./routes/sessionRoute');
const therapistRoute = require('./routes/therapistRoute');

app.use('/api/clients', clientRoute);
app.use('/api/sessions', sessionRoute);
app.use('/api/therapists', therapistRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
