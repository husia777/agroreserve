// API для регулярных (автоматических) заказов клиента
import { apiClient } from "./client";
import type { StandingOrder, StandingOrderItem } from "@/types";

// --- CRUD регулярных заказов ---

export const getStandingOrders = async (): Promise<StandingOrder[]> => {
	const response = await apiClient.get<StandingOrder[]>("/standing-orders");
	return response.data;
};

export interface StandingOrderCreateData {
	items: StandingOrderItem[];
	schedule: string; // daily / weekly / biweekly / monthly
	delivery_slot: string;
	delivery_address: string;
}

export const createStandingOrder = async (
	data: StandingOrderCreateData,
): Promise<StandingOrder> => {
	const response = await apiClient.post<StandingOrder>(
		"/standing-orders",
		data,
	);
	return response.data;
};

export const updateStandingOrder = async (
	id: string,
	data: Partial<StandingOrderCreateData> & { is_active?: boolean },
): Promise<StandingOrder> => {
	const response = await apiClient.patch<StandingOrder>(
		`/standing-orders/${id}`,
		data,
	);
	return response.data;
};

export const deleteStandingOrder = async (id: string): Promise<void> => {
	await apiClient.delete(`/standing-orders/${id}`);
};

// Подтвердить следующий автозаказ вручную
export const confirmStandingOrder = async (
	id: string,
): Promise<{ order_id: string; order_number: string }> => {
	const response = await apiClient.post<{
		order_id: string;
		order_number: string;
	}>(`/standing-orders/${id}/confirm`);
	return response.data;
};

// Переключить активность (вкл/выкл)
export const toggleStandingOrder = async (
	id: string,
	is_active: boolean,
): Promise<StandingOrder> => {
	const response = await apiClient.patch<StandingOrder>(
		`/standing-orders/${id}/toggle`,
		{
			is_active,
		},
	);
	return response.data;
};
