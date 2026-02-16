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


module.exports = { index, store }