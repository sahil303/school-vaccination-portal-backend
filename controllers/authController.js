require('dotenv').config();

ADMIN_USER = process.env.ADMIN_USER;
ADMIN_PASS = process.env.ADMIN_PASS;

const login = (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN_USER && password === ADMIN_PASS) {
    // On success
    return res.json({"success": true, "user": username, message: 'Login successful'});
  }
  // On failure
  res.status(401).json({"success": false, message: 'Invalid credentials' });
};

module.exports = { login };
