const Birthday = require("../models/Birthday");

async function index(req, res) {
    try {
        const people = await Birthday.find({ userId: req.userId });
        res.json(people);
    } catch (err) {
        res.status(500).json({ error: "Errore nel recupero dati" });
    }
}

async function store(req, res) {
    const { firstName, lastName, birthDate } = req.body;

    if (!firstName || !lastName || !birthDate) {
        return res.status(400).json({ error: "Tutti i campi sono obbligatori" });
    }

    try {
        const newPerson = new Birthday({
            firstName,
            lastName,
            birthDate,
            userId: req.userId 
        });

        await newPerson.save();

        res.status(201).json(newPerson);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Errore nel salvataggio" });
    }
}

async function update(req, res) {
    const { id } = req.params;
    const { firstName, lastName, birthDate } = req.body;

    if (!firstName || !lastName || !birthDate) {
        return res.status(400).json({ error: "Tutti i campi sono obbligatori" });
    }

    try {
        const updatedPerson = await Birthday.findOneAndUpdate(
            { _id: id, userId: req.userId },
            { firstName, lastName, birthDate },
            { new: true }
        );

        if (!updatedPerson) {
            return res.status(404).json({ error: "Persona non trovata" });
        }

        res.json(updatedPerson);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Errore aggiornamento" });
    }
}

async function deleteItem(req, res) {
    const { id } = req.params;

    try {
        const deletedPerson = await Birthday.findOneAndDelete({
            _id: id,
            userId: req.userId 
        });

        if (!deletedPerson) {
            return res.status(404).json({ error: "Persona non trovata" });
        }

        res.json({ message: "Persona eliminata", deletedPerson });
    } catch (err) {
        res.status(500).json({ error: "Errore nella cancellazione" });
    }
}

module.exports = { index, store, deleteItem, update };