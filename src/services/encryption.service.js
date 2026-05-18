const crypto = require("crypto");

const algorithm = "aes-256-cbc";

const key = Buffer.from(process.env.AES_SECRET_KEY);

exports.encrypt = text => {
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(algorithm, key, iv);

  let encrypted = cipher.update(text, "utf8", "hex");

  encrypted += cipher.final("hex");

  return `${iv.toString("hex")}:${encrypted}`;
};

exports.decrypt = hash => {
  const parts = hash.split(":");

  const iv = Buffer.from(parts.shift(), "hex");

  const encryptedText = parts.join(":");

  const decipher = crypto.createDecipheriv(
    algorithm,
    key,
    iv
  );

  let decrypted = decipher.update(
    encryptedText,
    "hex",
    "utf8"
  );

  decrypted += decipher.final("utf8");

  return decrypted;
};