export function validateApiEmail(email: string) {
  if (!email) return false
  const regValidateEmail = /\S+@\S+\.\S+/;
  return regValidateEmail.test(email);
}

export function validateApiPassword(pass: string) {
  if (!pass) return false
  const regValidatePassword = /^[a-z0-9]{8,}$/;
  return regValidatePassword.test(pass)
}
