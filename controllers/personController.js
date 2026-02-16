const { people } = require("../data/people");  

//  INDEX
function index(req, res) {
    res.json(people);
};

// STORE
function store(req, res) {
    const { firstName, lastName, birthDate } = req.body;

    if (!firstName || !lastName || !birthDate) {
        return res.status(400).json({ error: "Tutti i campi sono obbligatori" });
    }

    const newPerson = {
        id: people.length ? people[people.length - 1].id + 1 : 1,
        firstName,
        lastName,
        birthDate
    };

    people.push(newPerson);

    res.status(201).json(newPerson);
}

// DELETE
function deleteItem(req, res) {
    const { id } = req.params;
    const index = people.findIndex(p => p.id === parseInt(id));

    if (index === -1) {
        return res.status(404).json({ error: "Persona non trovata" });
    }

    const deletedPerson = people.splice(index, 1)[0]; 
    res.json({ message: "Persona eliminata", deletedPerson });
}


module.exports = { index, store, deleteItem }