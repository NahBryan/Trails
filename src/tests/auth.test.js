const request = require("supertest");

const app = require("../app");

describe("Auth", () => {
  it("should login", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        input: "CT23A103",
        password: "Mikemike"
      });

    expect(response.statusCode).toBe(200);
  });
});