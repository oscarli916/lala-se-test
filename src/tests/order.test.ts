import request from "supertest";
import app from "../index";

describe("Order Controller", () => {
	describe("POST /api/v1/orders", () => {
		it("should return 200 OK for a valid request", async () => {
			const response = await request(app)
				.post("/api/v1/orders")
				.send({
					origin: ["22.4231424", "114.2320909"],
					destination: ["22.4266641", "114.2063589"],
				});
			expect(response.status).toEqual(200);
			expect(response.body).toHaveProperty("id");
			expect(response.body).toHaveProperty("distance");
			expect(response.body).toHaveProperty("status");
			expect(response.body.status).toEqual("UNASSIGNED");
		});

		it("should return 400 Bad Request for invalid request array element is not string", async () => {
			const response = await request(app)
				.post("/api/v1/orders")
				.send({
					origin: [22.3193, 114.1694],
					destination: [22.3964, 114.1095],
				});
			expect(response.status).toEqual(400);
			expect(response.body).toHaveProperty("error");
		});

		it("should return 400 Bad Request for an invalid request array length is not equal to 2", async () => {
			const response = await request(app)
				.post("/api/v1/orders")
				.send({
					origin: [22.3193, 114.1694],
					destination: [22.3964],
				});
			expect(response.status).toEqual(400);
			expect(response.body).toHaveProperty("error");
		});

		it("should return 400 Bad Request for an invalid request lat and long is not valid", async () => {
			const response = await request(app)
				.post("/api/v1/orders")
				.send({
					origin: ["999.9", "999.9"],
					destination: ["999.9", "999.9"],
				});
			expect(response.status).toEqual(400);
			expect(response.body).toHaveProperty("error");
		});
	});

	describe("PATCH /api/v1/orders/:id", () => {
		it("should return 200 OK for a valid request", async () => {
			const postResponse = await request(app)
				.post("/api/v1/orders")
				.send({
					origin: ["22.4231424", "114.2320909"],
					destination: ["22.4266641", "114.2063589"],
				});
			const response = await request(app)
				.patch(`/api/v1/orders/${postResponse.body.id}`)
				.send({ status: "TAKEN" });
			expect(response.status).toEqual(200);
			expect(response.body).toHaveProperty("status", "SUCCESS");
		});

		it("should return 400 Bad Request for an invalid request no status was sent in body", async () => {
			const response = await request(app).patch("/api/v1/orders/1");
			expect(response.status).toEqual(400);
			expect(response.body).toHaveProperty("error");
		});

		it("should return 500 Internal Server Error for a server error", async () => {
			const response = await request(app)
				.patch("/api/v1/orders/1")
				.send({ status: "TAKEN" });
			expect(response.status).toEqual(500);
			expect(response.body).toHaveProperty("error");
		});
	});

	describe("GET /api/v1/orders", () => {
		it("should return 200 OK for a valid request", async () => {
			const response = await request(app).get(
				"/api/v1/orders?page=1&limit=10"
			);
			expect(response.status).toEqual(200);
			expect(response.body).toBeInstanceOf(Array);
		});

		it("should return 400 Bad Request for an invalid request page is not a valid number", async () => {
			const response = await request(app).get(
				"/api/v1/orders?page=3.14&limit=10"
			);
			expect(response.status).toEqual(400);
			expect(response.body).toHaveProperty("error");
		});

		it("should return 400 Bad Request for an invalid request limit is not a valid number", async () => {
			const response = await request(app).get(
				"/api/v1/orders?page=1&limit=1.89"
			);
			expect(response.status).toEqual(400);
			expect(response.body).toHaveProperty("error");
		});
	});
});
