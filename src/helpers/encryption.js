import cryptorjs from "cryptorjs";

export class Encryptor {
  constructor() {
    this.key = "ssp";
    this.cryptor = new cryptorjs(this.key);
  }

  /**
   * Encrypts object
   * @param {object} object
   * @return {string}
   */
  encrypt(object) {
    return this.cryptor.encode(JSON.stringify(object));
  }

  /**
   * Decrypts encrypted object
   * @param {string} string
   * @return {any}
   */
  decrypt(string) {
    const decrypted = this.cryptor.decode(string);

    return decrypted;
  }
}
