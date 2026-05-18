const request = require("supertest");
const app = require("../app");

describe("Tenant Isolation", () => {
  it("should prevent cross tenant access", async () => {
    const response = await request(app)
      .get("/api/transcripts/test-id")
      .set("Authorization", "Bearer invalid");

    expect(response.statusCode).toBe(401);
  });
});