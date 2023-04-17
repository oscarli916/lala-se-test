import fetch from "node-fetch";
import { Order } from "../models/order.entity";
import { config } from "../config/appConfig";
import { Distance } from "../types/distance";
import { OrderDataSource } from "../config/dbConfig";

const googleMapsApiKey = config.googleMapsApiKey;
const orderRepository = OrderDataSource.getRepository(Order);

export const calculateDistance = async (
	origin: string[],
	destination: string[]
): Promise<number> => {
	const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin[0]},${origin[1]}&destinations=${destination[0]},${destination[1]}&key=${googleMapsApiKey}`;
	const response = await fetch(url);
	const data: Distance = (await response.json()) as Distance;
	if (data.status !== "OK") {
		throw new Error(
			`Unable to calculate distance. Status: ${data.status}. Messages: ${data.error_message}`
		);
	}
	const distance = data.rows[0].elements[0].distance!.value;
	return distance;
};

export const isValidLatLng = (lat: number, lng: number): boolean => {
	if (isNaN(lat) || isNaN(lng)) {
		return false;
	}

	if (lat < -90 || lat > 90) {
		return false;
	}

	if (lng < -180 || lng > 180) {
		return false;
	}

	return true;
};

export const createOrder = async (
	origin: string[],
	destination: string[]
): Promise<Order> => {
	const distance = await calculateDistance(origin, destination);
	const order = new Order();
	order.originLat = origin[0];
	order.originLng = origin[1];
	order.destLat = destination[0];
	order.destLng = destination[1];
	order.distance = distance;
	order.status = "UNASSIGNED";
	await orderRepository.save(order);
	return order;
};

export const takeOrder = async (id: number): Promise<void> => {
	const order = await orderRepository.findOneBy({ id: id });
	if (!order) {
		throw new Error(`Order with id ${id} not found.`);
	}
	if (order.status === "TAKEN") {
		throw new Error(`Order with id ${id} has already been taken.`);
	}
	order.status = "TAKEN";
	await orderRepository.save(order);
};

export const listOrders = async (
	page: number,
	limit: number
): Promise<Order[]> => {
	if ((await orderRepository.find()).length === 0) return [];
	const orders = await orderRepository.find({
		skip: (page - 1) * limit,
		take: limit,
		select: {
			id: true,
			distance: true,
			status: true,
		},
	});
	return orders;
};
