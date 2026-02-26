const config = require('./config/config');
const express = require('express');
const app = express();
app.use(express.json());

const userRoutes = require('./modules/user/user.routes');
const contactRoutes = require('./modules/contact/contact.routes');
const messageRoutes = require('./modules/message/message.routes');

app.use('/users', userRoutes);
app.use('/contacts', contactRoutes);
app.use('/messages', messageRoutes);

app.listen(config.server.port, () => {
    console.log(`Listening on port ${ config.server.port }`);
});
