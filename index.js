const express = require("express");
const cors = require('cors');
// initializing our server
const app = express();

const student = require('./routes/student');

app.use(cors());
app.use(express.json());

app.use('/api', student);

app.listen(3000, () => console.log('Server running on port 3000'));