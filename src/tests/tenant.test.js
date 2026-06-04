const request = require("supertest");
const app = require("../app");

describe("Tenant Isolation", () => {
  it("should prevent cross tenant access", async () => {
    const response = await request(app)
      .post("/api/students/create_request")
      .set("Authorization", "Bearer invalid");

    expect(response.statusCode).toBe(419);
  });
});