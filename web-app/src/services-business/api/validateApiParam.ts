export function validateApiEmail(email: string) {
  if (!email) return false
  const regValidateEmail = /\S+@\S+\.\S+/;
  return regValidateEmail.test(email);
}

export function validateApiPassword(pass: string) {
  if (!pass) return false
  const regValidatePassword = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{8,25}$/;
  return regValidatePassword.test(pass)
}

export function validateApiLocalPhone(localPhone: string) {
  if (!localPhone) return false
  const regValidatePassword = /^[0-9]{7,11}$/;
  return regValidatePassword.test(localPhone)
}
