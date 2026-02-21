const express = require('express');
const app = express();
app.use(express.json());
const config = require('./config/config');

const users = [
    { id: 1, name: "Temur", age: 23 },
    { id: 2, name: "Ali", age: 25 }
];

app.post('/users', (req, res) => {
    const { name, age } = req.body;

    if (!name || !age) {
        return res.status(400).json({ message: 'Name and age are required' });
    }

    const id = users.length ? users[users.length - 1].id + 1 : 1;

    const newUser = { id, name, age };

    users.push(newUser);

    res.status(201).json(newUser);
});

app.get('/users', (req, res) => {
    res.status(200).json(users);
});

app.get('/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    if (!user) {
        return res.status(404).send('No such user');
    }
    res.status(200).json(user);
});

app.put('/users/:id', (req, res) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid ID' });
    }

    const user = users.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const { name, age } = req.body;

    if (!name || !age) {
        return res.status(400).json({ message: 'Name and age are required' });
    }

    user.name = name;
    user.age = age;

    res.status(200).json(user);
});

app.delete('/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = users.findIndex((user) => user.id === id);
    if (index === -1) {
        return res.status(404).send('No such user');
    }
    users.splice(index, 1);
    res.status(200).json(users);
});

app.listen(config.server.port, () => {
    console.log(`Listening on port ${config.server.port}`);
});