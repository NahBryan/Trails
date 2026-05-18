module.exports = {
  origin: process.env.CLIENT_URL || "*",
  methods: [
    "GET",
    "POST",
    "PUT",
    "PATCH",
    "DELETE"
  ],
  credentials: true
};