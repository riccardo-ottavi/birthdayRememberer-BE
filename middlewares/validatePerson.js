function validatePerson(req, res, next) {
    const { firstName, lastName, birthDate } = req.body;

    if (!firstName || !lastName || !birthDate) {
        return res.status(400).json({
            error: "Tutti i campi sono obbligatori"
        });
    }

    if (firstName.trim().length < 2) {
        return res.status(400).json({
            error: "Il nome deve avere almeno 2 caratteri"
        });
    }

    if (lastName.trim().length < 2) {
        return res.status(400).json({
            error: "Il cognome deve avere almeno 2 caratteri"
        });
    }

    const invalidSymbols = /[!@#$%^&*()_+=]/;

    if (invalidSymbols.test(firstName)) {
        return res.status(400).json({
            error: "Il nome contiene caratteri non validi"
        });
    }

    if (invalidSymbols.test(lastName)) {
        return res.status(400).json({
            error: "Il cognome contiene caratteri non validi"
        });
    }

    const today = new Date();
    const selectedDate = new Date(birthDate);

    if (isNaN(selectedDate.getTime())) {
        return res.status(400).json({
            error: "Data non valida"
        });
    }

    if (selectedDate > today) {
        return res.status(400).json({
            error: "La data di nascita non può essere nel futuro"
        });
    }

    next();
}

module.exports = validatePerson;