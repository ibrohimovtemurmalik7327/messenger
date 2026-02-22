const express = require('express');
const app = express();
app.use(express.json());

const config = require('./config/config');

const users = [
    { id: 1, name: 'Temur', age: 23 },
    { id: 2, name: 'Ali', age: 25 }
];

// --- helpers ---
function parseId(param) {
    const id = Number(param);
    return Number.isInteger(id) && id > 0 ? id : null;
}

function validateUserPayload(body) {
    const name = typeof body?.name === 'string' ? body.name.trim() : '';
    const ageNum = Number(body?.age);

    if (!name) return { ok: false, message: 'Name is required' };
    if (!Number.isFinite(ageNum)) return { ok: false, message: 'Age must be a number' };
    if (!Number.isInteger(ageNum) || ageNum < 0) return { ok: false, message: 'Age must be a non-negative integer' };

    return { ok: true, data: { name, age: ageNum } };
}

function nextId(list) {
    if (list.length === 0) return 1;
    const maxId = Math.max(...list.map(u => u.id));
    return maxId + 1;
}

// --- routes ---
app.post('/users', (req, res) => {
    const v = validateUserPayload(req.body);
    if (!v.ok) return res.status(400).json({ message: v.message });

    const user = { id: nextId(users), ...v.data };
    users.push(user);

    return res.status(201).json(user);
});

app.get('/users', (req, res) => {
    return res.status(200).json(users);
});

app.get('/users/:id', (req, res) => {
    const id = parseId(req.params.id);
    if (!id) return res.status(400).json({ message: 'Invalid ID' });

    const user = users.find(u => u.id === id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    return res.status(200).json(user);
});

app.put('/users/:id', (req, res) => {
    const id = parseId(req.params.id);
    if (!id) return res.status(400).json({ message: 'Invalid ID' });

    const user = users.find(u => u.id === id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const v = validateUserPayload(req.body);
    if (!v.ok) return res.status(400).json({ message: v.message });

    user.name = v.data.name;
    user.age = v.data.age;

    return res.status(200).json(user);
});

app.delete('/users/:id', (req, res) => {
    const id = parseId(req.params.id);
    if (!id) return res.status(400).json({ message: 'Invalid ID' });

    const index = users.findIndex(u => u.id === id);
    if (index === -1) return res.status(404).json({ message: 'User not found' });

    users.splice(index, 1);
    
    return res.sendStatus(204);
});

// --- start ---
app.listen(config.server.port, () => {
    console.log(`Listening on port ${config.server.port}`);
});