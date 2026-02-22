// --- helpers ---
function parseId(param) {
    const id = Number(param);
    return Number.isInteger(id) && id > 0 ? id : null;
}

function validateUserPayload(body) {
    const name = typeof body?.name === 'string' ? body.name.trim() : '';
    const ageNum = Number(body?.age);

    if (!name) return {ok: false, message: 'Name is required'};
    if (!Number.isFinite(ageNum)) return {ok: false, message: 'Age must be a number'};
    if (!Number.isInteger(ageNum) || ageNum < 0) return {ok: false, message: 'Age must be a non-negative integer'};

    return {ok: true, data: {name, age: ageNum}};
}

function nextId(list) {
    if (list.length === 0) return 1;
    const maxId = Math.max(...list.map(u => u.id));
    return maxId + 1;
}

module.exports = {
    parseId,
    validateUserPayload,
    nextId
}