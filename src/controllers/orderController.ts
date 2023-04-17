import express, { Request, Response } from "express";
import {
	createOrder,
	takeOrder,
	listOrders,
	isValidLatLng,
} from "../services/orderService";

const router = express.Router();

router.post("/orders", async (req: Request, res: Response) => {
	try {
		const origin = req.body.origin;
		const destination = req.body.destination;
		if (
			!Array.isArray(origin) ||
			origin.length !== 2 ||
			!Array.isArray(destination) ||
			destination.length !== 2
		) {
			return res
				.status(400)
				.json({ error: "Invalid request parameters." });
		}
		for (let i = 0; i < origin.length; i++) {
			if (
				typeof origin[i] !== "string" ||
				typeof destination[i] !== "string"
			)
				return res
					.status(400)
					.json({ error: "Invalid request parameters." });
		}
		if (
			isValidLatLng(origin[0], origin[1]) === false ||
			isValidLatLng(destination[0], destination[1]) === false
		)
			return res
				.status(400)
				.json({ error: "Invalid request parameters." });
		const order = await createOrder(origin, destination);
		return res.status(200).json({
			id: order.id,
			distance: order.distance,
			status: order.status,
		});
	} catch (error: any) {
		return res.status(500).json({ error: error.message });
	}
});

router.patch("/orders/:id", async (req: Request, res: Response) => {
	try {
		const id = parseInt(req.params.id, 10);
		const status = req.body.status;
		if (!status || status !== "TAKEN")
			return res
				.status(400)
				.json({ error: "Invalid request parameters." });
		await takeOrder(id);
		return res.status(200).json({ status: "SUCCESS" });
	} catch (error: any) {
		return res.status(500).json({ error: error.message });
	}
});

router.get("/orders", async (req: Request, res: Response) => {
	try {
		const page = parseInt(req.query.page as string, 10);
		const limit = parseInt(req.query.limit as string, 10);
		if (
			!/^\d+$/.test(req.query.page as string) ||
			!/^\d+$/.test(req.query.limit as string)
		)
			return res
				.status(400)
				.json({ error: "Invalid request parameters." });
		const orders = await listOrders(page, limit);
		return res.status(200).json(orders);
	} catch (error: any) {
		return res.status(500).json({ error: error.message });
	}
});

export default router;
