const request = require("supertest");

const app = require("../app");

describe("Auth", () => {
  it("should login", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: "admin@test.com",
        password: "password"
      });

    expect(response.statusCode).toBe(200);
  });
});