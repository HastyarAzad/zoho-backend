const express = require("express");
const cors = require('cors');
// initializing our server
const app = express();

const student = require('./routes/student');
const company = require('./routes/company');
const department = require('./routes/department');
const job = require('./routes/job');
const application = require('./routes/application');
const question = require('./routes/question');
const application_data = require('./routes/application_data');

app.use(cors());
app.use(express.json());

app.use('/api', student);
app.use('/api', company);
app.use('/api', department);
app.use('/api', job);
app.use('/api', application);
app.use('/api', question);
app.use('/api', application_data);

app.listen(3000, () => console.log('Server running on port 3000'));