function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function validatePassword(password) {
  return password && password.length >= 6;
}

function validateUsername(username) {
  return username && username.length >= 3 && username.length <= 20;
}

module.exports = { validateEmail, validatePassword, validateUsername };
