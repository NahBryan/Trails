const request = require("supertest");
const app = require("../app");

describe("RBAC", () => {
  it("should deny access without token", async () => {
    const response = await request(app)
      .post("/api/institutions");

    expect(response.statusCode).toBe(401);
  });
});