const User = require("../models/User");
const bcrypt = require("bcrypt");

async function register(req, res) {
  const { email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
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

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Utente non trovato" });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ error: "Password errata" });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.json({ token }); // 🔥 return fondamentale
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
}

module.exports = { register, login };