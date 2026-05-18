const { put } = require("@vercel/blob");
const fs = require("fs");

exports.uploadFile = async (path, filename) => {
  const stream = fs.createReadStream(path);

  const result = await put(filename, stream, {
    access: "public",
    token: process.env.BLOB_READ_WRITE_TOKEN
  });

  return result.url;
};