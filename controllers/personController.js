const Birthday = require("../models/Birthday");


//  INDEX
async function index(req, res) {
    try {
        const people = await Birthday.find();
        res.json(people);
    } catch (err) {
        res.status(500).json({ error: "Errore nel recupero dati" });
    }
}

// STORE
async function store(req, res) {
    console.log("HEADERS:", req.headers);
    console.log("BODY:", req.body);

    const { firstName, lastName, birthDate } = req.body;

    if (!firstName || !lastName || !birthDate) {
        return res.status(400).json({ error: "Tutti i campi sono obbligatori" });
    }

    try {
        const newPerson = new Birthday({
            firstName,
            lastName,
            birthDate
        });

        await newPerson.save();

        res.status(201).json(newPerson);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Errore nel salvataggio" });
    }
}

// DELETE
async function deleteItem(req, res) {
    const { id } = req.params;

    try {
        const deletedPerson = await Birthday.findByIdAndDelete(id);

        if (!deletedPerson) {
            return res.status(404).json({ error: "Persona non trovata" });
        }

        res.json({ message: "Persona eliminata", deletedPerson });
    } catch (err) {
        res.status(500).json({ error: "Errore nella cancellazione" });
    }
}


module.exports = { index, store, deleteItem }