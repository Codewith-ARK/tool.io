const jwt = require("jsonwebtoken");

function generateToken(payload) {
  return jwt.sign({ payload }, process.env.SECRET_KEY, { expiresIn: "1h" });
}

function verifyToken(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.redirect('/401');
    }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(500).json({ message: "Failed to authenticate token" });
    }

    req.user = decoded;
    next();
  });
}

module.exports = { generateToken, verifyToken };
