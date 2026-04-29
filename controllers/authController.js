const User = require("../models/User");
const bcrypt = require("bcrypt");

async function register(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email e password obbligatorie" });
  }

  const cleanEmail = email.trim().toLowerCase();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(cleanEmail)) {
    return res.status(400).json({ error: "Email non valida" });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: "Password troppo corta (min 6 caratteri)" });
  }

  try {
    const existingUser = await User.findOne({ email: cleanEmail });

    if (existingUser) {
      return res.status(400).json({ error: "Email già registrata" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email: cleanEmail,
      password: hashedPassword
    });

    await newUser.save();

    res.status(201).json({ message: "Utente creato" });

  } catch (err) {
    res.status(500).json({ error: "Errore registrazione" });
  }
}

const jwt = require("jsonwebtoken");

async function login(req, res) {
  const { email, password } = req.body;

  // 1. check base
  if (!email || !password) {
    return res.status(400).json({ error: "Email e password obbligatorie" });
  }

  const cleanEmail = email.trim().toLowerCase();

  try {
    console.log("EMAIL:", cleanEmail); 

    const user = await User.findOne({ email: cleanEmail });

    console.log("USER:", user);  

    if (!user) {
      return res.status(401).json({ error: "Credenziali non valide" });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ error: "Credenziali non valide" });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.json({ token });

  } catch (err) {
  console.error("LOGIN ERROR:", err);
  return res.status(500).json({ error: "Errore login" });
}
}

module.exports = { register, login };