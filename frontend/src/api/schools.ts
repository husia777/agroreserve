// API для школьного питания — конструктор меню, блюда, КБЖУ
import { apiClient } from "./client";
import type { Dish, Menu } from "@/types";

// --- Блюда (для школьного ЛК) ---

export const getSchoolDishes = async (params?: {
	category?: string;
	search?: string;
	age_group?: string;
}): Promise<Dish[]> => {
	const response = await apiClient.get<Dish[]>("/schools/dishes", { params });
	return response.data;
};

// --- Меню ---

export const getMenus = async (params?: {
	page?: number;
	per_page?: number;
}): Promise<{ items: Menu[]; total: number }> => {
	const response = await apiClient.get<{ items: Menu[]; total: number }>(
		"/schools/menu",
		{ params },
	);
	return response.data;
};

export const getMenu = async (id: string): Promise<Menu> => {
	const response = await apiClient.get<Menu>(`/schools/menu/${id}`);
	return response.data;
};

export interface MenuCreateData {
	week_start: string;
	week_end: string;
	days: {
		date: string;
		items: {
			dish_id: string;
			portions: number;
			meal_type: string;
		}[];
	}[];
}

export const createMenu = async (data: MenuCreateData): Promise<Menu> => {
	const response = await apiClient.post<Menu>("/schools/menu", data);
	return response.data;
};

export const repeatMenu = async (
	menuId: string,
	newWeekStart: string,
): Promise<Menu> => {
	const response = await apiClient.post<Menu>(
		`/schools/menu/${menuId}/repeat`,
		{
			week_start: newWeekStart,
		},
	);
	return response.data;
};

export const orderFromMenu = async (
	menuId: string,
): Promise<{ order_id: string; order_number: string }> => {
	const response = await apiClient.post<{
		order_id: string;
		order_number: string;
	}>(`/schools/menu/${menuId}/order`);
	return response.data;
};

// --- Отчёт КБЖУ ---

export const getKBZHUReport = async (
	menuId: string,
	params: {
		week_start: string;
		week_end: string;
	},
): Promise<{
	days: {
		date: string;
		calories: number;
		protein: number;
		fat: number;
		carbs: number;
		portions: number;
	}[];
	averages: {
		calories: number;
		protein: number;
		fat: number;
		carbs: number;
	};
}> => {
	const response = await apiClient.get(`/schools/menu/${menuId}/kbzhu-report`, {
		params,
	});
	return response.data;
};
