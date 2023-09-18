import CryptoJS from "crypto-js";

const key = CryptoJS.enc.Utf8.parse("0123456789abcdef");  //十六位十六进制数作为密钥
const iv = CryptoJS.enc.Utf8.parse('0123456789abcdef');   //十六位十六进制数作为密钥偏移量

export const AES_CBC_DECRYPT = function (word) {
  let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
  let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  let decrypt = CryptoJS.AES.decrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
  let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
}

export const AES_CBC_ENCRYPT = function (word) {
  let srcs = CryptoJS.enc.Utf8.parse(word);
  let encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
  return encrypted.ciphertext.toString().toUpperCase();
}

export const AES_ECB_DECRYPT = function (textBase64, secretKey = '0123456789abcdef') {
  var keyHex = CryptoJS.enc.Base64.parse(secretKey);
  var decrypt = CryptoJS.AES.decrypt(textBase64, keyHex, {
    "mode": CryptoJS.mode.ECB,
    "padding": CryptoJS.pad.Pkcs7
  });
  return CryptoJS.enc.Utf8.stringify(decrypt);
}

export const AES_ECB_ENCRYPT = function (text, secretKey = '0123456789abcdef') {
  var keyHex = CryptoJS.enc.Base64.parse(secretKey);
  var messageHex = CryptoJS.enc.Utf8.parse(text);
  var encrypted = CryptoJS.AES.encrypt(messageHex, keyHex, {
    "mode": CryptoJS.mode.ECB,
    "padding": CryptoJS.pad.Pkcs7
  });
  return encrypted.toString();
}