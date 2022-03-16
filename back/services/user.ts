const CryptoJs = require("crypto-js");

// -- Encrypt password
export function encryptPassword(password: string): string {
  return CryptoJs.AES.encrypt(password, process.env.SECRET_KEY).toString();
}

// -- Decrypt password
export function decryptPassword(passwordEncrypted: string): string {
  const bytes = CryptoJs.AES.decrypt(passwordEncrypted, process.env.SECRET_KEY);
  return bytes.toString(CryptoJs.enc.Utf8);
}
