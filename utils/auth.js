const bcrypt = require("bcrypt");

async function auth(username, password, hashedUsername, hashedPassword) {
  try {
    if (username !== hashedUsername) return false;
    const result = await bcrypt.compare(password, hashedPassword);
    return result;
  } catch (err) {
    throw new Error("Error authenticating user:", err);
  }
}

async function hashPassword(password) {
  const hash = await bcrypt.hash(password, 10);
  return hash;
}

module.exports = { auth, hashPassword };
