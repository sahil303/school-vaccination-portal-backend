require('dotenv').config();

ADMIN_USER = process.env.ADMIN_USER;
ADMIN_PASS = process.env.ADMIN_PASS;

const login = (req, res) => {
  const { username, password } = req.body;

  // hard-coded check
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    // On success
    return res.json({ message: 'Login successful' });
  }
  // On failure
  res.status(401).json({ message: 'Invalid credentials' });
};

module.exports = { login };
