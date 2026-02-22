const express = require('express');
const app = express();
app.use(express.json());

const config = require('./config/config');

const userRoutes = require('./modules/user/user.routes');

app.use('/users', userRoutes);

// --- start ---
app.listen(config.server.port, () => {
    console.log(`Listening on port ${config.server.port}`);
});