// API функции административной панели
import { apiClient } from "./client";
import type {
	DashboardData,
	Order,
	OrderStatus,
	Product,
	Category,
	User,
	StockItem,
	StockReceipt,
	Expense,
	Certificate,
	PaginatedResponse,
	PnLReport,
	Settings,
	AdminOrdersParams,
} from "@/types";

// --- Дашборд ---

export const getDashboard = async (): Promise<DashboardData> => {
	const response = await apiClient.get<DashboardData>("/admin/dashboard");
	return response.data;
};

// --- Заказы ---

export const getAdminOrders = async (
	params?: AdminOrdersParams,
): Promise<PaginatedResponse<Order>> => {
	const response = await apiClient.get<PaginatedResponse<Order>>(
		"/admin/orders",
		{ params },
	);
	return response.data;
};

export const getAdminOrder = async (orderId: string): Promise<Order> => {
	const response = await apiClient.get<Order>(`/admin/orders/${orderId}`);
	return response.data;
};

export const updateOrderStatus = async (
	orderId: string,
	status: OrderStatus,
	comment?: string,
): Promise<Order> => {
	const response = await apiClient.patch<Order>(
		`/admin/orders/${orderId}/status`,
		{
			status,
			comment,
		},
	);
	return response.data;
};

export const updateOrderActualQuantity = async (
	orderId: string,
	items: { product_id: string; actual_qty: number }[],
): Promise<Order> => {
	const response = await apiClient.patch<Order>(
		`/admin/orders/${orderId}/actual-qty`,
		{
			items,
		},
	);
	return response.data;
};

// Подтвердить получение оплаты (UC-10)
export const confirmPayment = async (orderId: string): Promise<Order> => {
	const response = await apiClient.patch<Order>(
		`/admin/orders/${orderId}/confirm-payment`,
	);
	return response.data;
};

// --- Каталог ---

export interface ProductFormData {
	name: string;
	description?: string;
	category_id: string;
	price_retail: number;
	price_wholesale: number;
	price_purchase: number;
	unit: string;
	unit_weight?: number;
	min_order_qty: number;
	order_step: number;
	min_stock_quantity: number;
	country_of_origin: string;
	storage_conditions?: string;
	is_active: boolean;
}

export const getAdminProducts = async (params?: {
	category_id?: string;
	search?: string;
	is_active?: boolean;
	page?: number;
	per_page?: number;
}): Promise<PaginatedResponse<Product>> => {
	const response = await apiClient.get<PaginatedResponse<Product>>(
		"/admin/catalog/products",
		{
			params,
		},
	);
	return response.data;
};

export const createProduct = async (
	data: ProductFormData,
): Promise<Product> => {
	const response = await apiClient.post<Product>(
		"/admin/catalog/products",
		data,
	);
	return response.data;
};

export const updateProduct = async (
	productId: string,
	data: Partial<ProductFormData>,
): Promise<Product> => {
	const response = await apiClient.patch<Product>(
		`/admin/catalog/products/${productId}`,
		data,
	);
	return response.data;
};

export const deleteProduct = async (productId: string): Promise<void> => {
	await apiClient.delete(`/admin/catalog/products/${productId}`);
};

export const uploadProductImage = async (
	productId: string,
	file: File,
): Promise<{ image_url: string }> => {
	const formData = new FormData();
	formData.append("file", file);
	const response = await apiClient.post<{ image_url: string }>(
		`/admin/catalog/products/upload-image`,
		formData,
		{ headers: { "Content-Type": "multipart/form-data" } },
	);
	return response.data;
};

export const bulkUpdatePrices = async (
	updates: {
		product_id: string;
		price_retail?: number;
		price_wholesale?: number;
	}[],
): Promise<void> => {
	await apiClient.patch("/admin/catalog/products/bulk-prices", { updates });
};

// Категории
export const getAdminCategories = async (): Promise<Category[]> => {
	const response = await apiClient.get<Category[]>("/admin/catalog/categories");
	return response.data;
};

export const createCategory = async (data: {
	name: string;
	slug: string;
	description?: string;
	parent_id?: string;
	sort_order?: number;
}): Promise<Category> => {
	const response = await apiClient.post<Category>(
		"/admin/catalog/categories",
		data,
	);
	return response.data;
};

export const updateCategory = async (
	categoryId: string,
	data: Partial<Category>,
): Promise<Category> => {
	const response = await apiClient.patch<Category>(
		`/admin/catalog/categories/${categoryId}`,
		data,
	);
	return response.data;
};

// --- Склад ---

export const getStockItems = async (): Promise<StockItem[]> => {
	const response = await apiClient.get<StockItem[]>("/admin/stock");
	return response.data;
};

export const getStockReceipts = async (params?: {
	date_from?: string;
	date_to?: string;
	page?: number;
	per_page?: number;
}): Promise<PaginatedResponse<StockReceipt>> => {
	const response = await apiClient.get<PaginatedResponse<StockReceipt>>(
		"/admin/stock/receipts",
		{
			params,
		},
	);
	return response.data;
};

export const createStockReceipt = async (data: {
	supplier_name: string;
	date: string;
	invoice_number?: string;
	note?: string;
	items: {
		product_id: string;
		quantity: number;
		purchase_price: number;
	}[];
}): Promise<StockReceipt> => {
	const response = await apiClient.post<StockReceipt>(
		"/admin/stock/receipts",
		data,
	);
	return response.data;
};

export const getStockReceipt = async (
	receiptId: string,
): Promise<StockReceipt> => {
	const response = await apiClient.get<StockReceipt>(
		`/admin/stock/receipts/${receiptId}`,
	);
	return response.data;
};

// --- Клиенты ---

export const getAdminClients = async (params?: {
	status?: string;
	search?: string;
	page?: number;
	per_page?: number;
}): Promise<PaginatedResponse<User>> => {
	const response = await apiClient.get<PaginatedResponse<User>>(
		"/admin/clients",
		{ params },
	);
	return response.data;
};

export const getAdminClient = async (clientId: string): Promise<User> => {
	const response = await apiClient.get<User>(`/admin/clients/${clientId}`);
	return response.data;
};

export const approveClient = async (clientId: string): Promise<User> => {
	const response = await apiClient.post<User>(
		`/admin/clients/${clientId}/approve`,
	);
	return response.data;
};

export const rejectClient = async (
	clientId: string,
	reason?: string,
): Promise<User> => {
	const response = await apiClient.post<User>(
		`/admin/clients/${clientId}/reject`,
		{ reason },
	);
	return response.data;
};

export const setCreditLimit = async (
	clientId: string,
	limit: number,
): Promise<User> => {
	const response = await apiClient.patch<User>(
		`/admin/clients/${clientId}/credit-limit`,
		{
			credit_limit: limit,
		},
	);
	return response.data;
};

// --- Финансы ---

export const getPnLReport = async (params: {
	period: "day" | "week" | "month" | "quarter" | "year";
	date_from?: string;
	date_to?: string;
}): Promise<PnLReport[]> => {
	const response = await apiClient.get<PnLReport[]>("/admin/finance/pnl", {
		params,
	});
	return response.data;
};

export const getExpenses = async (params?: {
	category?: string;
	date_from?: string;
	date_to?: string;
	page?: number;
	per_page?: number;
}): Promise<PaginatedResponse<Expense>> => {
	const response = await apiClient.get<PaginatedResponse<Expense>>(
		"/admin/finance/expenses",
		{
			params,
		},
	);
	return response.data;
};

export const createExpense = async (data: {
	category: string;
	description: string;
	amount: number;
	date: string;
	is_recurring?: boolean;
	recurrence_period?: string;
}): Promise<Expense> => {
	const response = await apiClient.post<Expense>(
		"/admin/finance/expenses",
		data,
	);
	return response.data;
};

export const updateExpense = async (
	expenseId: string,
	data: Partial<Expense>,
): Promise<Expense> => {
	const response = await apiClient.put<Expense>(
		`/admin/finance/expenses/${expenseId}`,
		data,
	);
	return response.data;
};

export const deleteExpense = async (expenseId: string): Promise<void> => {
	await apiClient.delete(`/admin/finance/expenses/${expenseId}`);
};

// --- Сертификаты ---

export const getCertificates = async (params?: {
	cert_type?: string;
	status?: string;
	product_id?: string;
	page?: number;
	per_page?: number;
}): Promise<PaginatedResponse<Certificate>> => {
	const response = await apiClient.get<PaginatedResponse<Certificate>>(
		"/admin/certificates",
		{
			params,
		},
	);
	return response.data;
};

export const createCertificate = async (
	data: FormData,
): Promise<Certificate> => {
	const response = await apiClient.post<Certificate>(
		"/admin/certificates",
		data,
		{
			headers: { "Content-Type": "multipart/form-data" },
		},
	);
	return response.data;
};

export const updateCertificate = async (
	certId: string,
	data: Partial<Certificate>,
): Promise<Certificate> => {
	const response = await apiClient.put<Certificate>(
		`/admin/certificates/${certId}`,
		data,
	);
	return response.data;
};

export const deleteCertificate = async (certId: string): Promise<void> => {
	await apiClient.delete(`/admin/certificates/${certId}`);
};

// --- Настройки ---

export const getSettings = async (): Promise<Settings> => {
	const response = await apiClient.get<Settings>("/admin/settings");
	return response.data;
};

export const updateSettings = async (
	data: Partial<Settings>,
): Promise<Settings> => {
	const response = await apiClient.put<Settings>("/admin/settings", data);
	return response.data;
};

// ============================================================
// API v2 — НОВЫЕ ЭНДПОИНТЫ
// ============================================================

import type {
	Supplier,
	Contract,
	Dish,
	WriteOff,
	Tender,
	ReminderV2,
	ClientCard,
	AnalyticsOverview,
	AnalyticsRevenuePoint,
	AnalyticsTopProduct,
	AnalyticsTopClient,
	AnalyticsMargin,
	CalendarEvent,
	ProcurementRecommendation,
	PriceLogEntry,
	Batch,
} from "@/types";

// --- Поставщики ---

export const getSuppliers = async (params?: {
	search?: string;
	is_active?: boolean;
}): Promise<Supplier[]> => {
	const response = await apiClient.get<Supplier[]>("/admin/suppliers", {
		params,
	});
	return response.data;
};

export const getSupplier = async (id: string): Promise<Supplier> => {
	const response = await apiClient.get<Supplier>(`/admin/suppliers/${id}`);
	return response.data;
};

export const createSupplier = async (
	data: Omit<Supplier, "_id" | "created_at">,
): Promise<Supplier> => {
	const response = await apiClient.post<Supplier>("/admin/suppliers", data);
	return response.data;
};

export const updateSupplier = async (
	id: string,
	data: Partial<Supplier>,
): Promise<Supplier> => {
	const response = await apiClient.patch<Supplier>(
		`/admin/suppliers/${id}`,
		data,
	);
	return response.data;
};

export const deleteSupplier = async (id: string): Promise<void> => {
	await apiClient.delete(`/admin/suppliers/${id}`);
};

// --- Госконтракты ---

export const getContracts = async (params?: {
	status?: string;
	client_id?: string;
	page?: number;
	per_page?: number;
}): Promise<PaginatedResponse<Contract>> => {
	const response = await apiClient.get<PaginatedResponse<Contract>>(
		"/admin/contracts",
		{ params },
	);
	return response.data;
};

export const getContract = async (id: string): Promise<Contract> => {
	const response = await apiClient.get<Contract>(`/admin/contracts/${id}`);
	return response.data;
};

export const createContract = async (
	data: Omit<Contract, "_id" | "created_at" | "completion_percent">,
): Promise<Contract> => {
	const response = await apiClient.post<Contract>("/admin/contracts", data);
	return response.data;
};

export const updateContract = async (
	id: string,
	data: Partial<Contract>,
): Promise<Contract> => {
	const response = await apiClient.put<Contract>(
		`/admin/contracts/${id}`,
		data,
	);
	return response.data;
};

export const deleteContract = async (id: string): Promise<void> => {
	await apiClient.delete(`/admin/contracts/${id}`);
};

export const markDelivery = async (
	contractId: string,
	scheduleDate: string,
): Promise<Contract> => {
	const response = await apiClient.post<Contract>(
		`/admin/contracts/${contractId}/delivery`,
		{ date: scheduleDate },
	);
	return response.data;
};

export const generateContractAct = async (
	contractId: string,
): Promise<{ file_url: string }> => {
	const response = await apiClient.post<{ file_url: string }>(
		`/admin/contracts/${contractId}/act`,
	);
	return response.data;
};

// --- Блюда ---

export const getDishes = async (params?: {
	category?: string;
	search?: string;
	is_active?: boolean;
}): Promise<Dish[]> => {
	const response = await apiClient.get<Dish[]>("/admin/dishes", { params });
	return response.data;
};

export const getDish = async (id: string): Promise<Dish> => {
	const response = await apiClient.get<Dish>(`/admin/dishes/${id}`);
	return response.data;
};

export const createDish = async (data: Omit<Dish, "_id">): Promise<Dish> => {
	const response = await apiClient.post<Dish>("/admin/dishes", data);
	return response.data;
};

export const updateDish = async (
	id: string,
	data: Partial<Dish>,
): Promise<Dish> => {
	const response = await apiClient.patch<Dish>(`/admin/dishes/${id}`, data);
	return response.data;
};

export const deleteDish = async (id: string): Promise<void> => {
	await apiClient.delete(`/admin/dishes/${id}`);
};

// --- Списания ---

export const getWriteOffs = async (params?: {
	product_id?: string;
	reason?: string;
	date_from?: string;
	date_to?: string;
	page?: number;
	per_page?: number;
}): Promise<PaginatedResponse<WriteOff>> => {
	const response = await apiClient.get<PaginatedResponse<WriteOff>>(
		"/admin/write-offs",
		{ params },
	);
	return response.data;
};

export const createWriteOff = async (data: {
	product_id: string;
	qty: number;
	reason: string;
	description?: string;
}): Promise<WriteOff> => {
	const response = await apiClient.post<WriteOff>("/admin/write-offs", data);
	return response.data;
};

export const getWriteOffAnalytics = async (params?: {
	date_from?: string;
	date_to?: string;
}): Promise<{
	by_product: { name: string; total_loss: number }[];
	by_reason: { reason: string; total_loss: number }[];
}> => {
	const response = await apiClient.get("/admin/write-offs/analytics", {
		params,
	});
	return response.data;
};

// --- Тендеры ---

export const getTenders = async (params?: {
	status?: string;
	region?: string;
	page?: number;
	per_page?: number;
}): Promise<PaginatedResponse<Tender>> => {
	const response = await apiClient.get<PaginatedResponse<Tender>>(
		"/admin/tenders",
		{ params },
	);
	return response.data;
};

export const getTender = async (id: string): Promise<Tender> => {
	const response = await apiClient.get<Tender>(`/admin/tenders/${id}`);
	return response.data;
};

export const searchTenders = async (): Promise<{
	found: number;
	message: string;
}> => {
	const response = await apiClient.post("/admin/tenders/search");
	return response.data;
};

export const updateTender = async (
	id: string,
	data: Partial<Tender>,
): Promise<Tender> => {
	const response = await apiClient.put<Tender>(`/admin/tenders/${id}`, data);
	return response.data;
};

export const calculateTenderPrice = async (
	id: string,
	markup_percent: number,
): Promise<{ our_price: number; margin_estimate: number }> => {
	const response = await apiClient.post(`/admin/tenders/${id}/calculate`, {
		markup_percent,
	});
	return response.data;
};

// --- Аналитика ---

export const getAnalyticsOverview = async (params: {
	period: "week" | "month" | "quarter" | "year";
}): Promise<AnalyticsOverview> => {
	const response = await apiClient.get<AnalyticsOverview>(
		"/admin/analytics/overview",
		{ params },
	);
	return response.data;
};

export const getAnalyticsRevenue = async (params: {
	period: "week" | "month" | "quarter" | "year";
}): Promise<AnalyticsRevenuePoint[]> => {
	const response = await apiClient.get<AnalyticsRevenuePoint[]>(
		"/admin/analytics/revenue",
		{ params },
	);
	return response.data;
};

export const getAnalyticsTopProducts = async (params: {
	period: "week" | "month" | "quarter" | "year";
	limit?: number;
}): Promise<AnalyticsTopProduct[]> => {
	const response = await apiClient.get<AnalyticsTopProduct[]>(
		"/admin/analytics/products/top",
		{ params },
	);
	return response.data;
};

export const getAnalyticsTopClients = async (params: {
	period: "week" | "month" | "quarter" | "year";
	limit?: number;
}): Promise<AnalyticsTopClient[]> => {
	const response = await apiClient.get<AnalyticsTopClient[]>(
		"/admin/analytics/clients/top",
		{ params },
	);
	return response.data;
};

export const getAnalyticsMargins = async (params?: {
	category_id?: string;
}): Promise<AnalyticsMargin[]> => {
	const response = await apiClient.get<AnalyticsMargin[]>(
		"/admin/analytics/margins",
		{ params },
	);
	return response.data;
};

export const getAnalyticsTrends = async (params: {
	months: number;
}): Promise<AnalyticsRevenuePoint[]> => {
	const response = await apiClient.get<AnalyticsRevenuePoint[]>(
		"/admin/analytics/trends",
		{ params },
	);
	return response.data;
};

// --- CRM ---

export const getClientCard = async (clientId: string): Promise<ClientCard> => {
	const response = await apiClient.get<ClientCard>(
		`/admin/crm/clients/${clientId}/card`,
	);
	return response.data;
};

export const addClientNote = async (
	clientId: string,
	text: string,
): Promise<{ _id: string; text: string; created_at: string }> => {
	const response = await apiClient.post(
		`/admin/crm/clients/${clientId}/notes`,
		{ text },
	);
	return response.data;
};

export const getClientInteractions = async (
	clientId: string,
): Promise<
	{ _id: string; type: string; description: string; created_at: string }[]
> => {
	const response = await apiClient.get(
		`/admin/crm/clients/${clientId}/interactions`,
	);
	return response.data;
};

export const addClientInteraction = async (
	clientId: string,
	data: { type: string; description: string },
): Promise<{
	_id: string;
	type: string;
	description: string;
	created_at: string;
}> => {
	const response = await apiClient.post(
		`/admin/crm/clients/${clientId}/interactions`,
		data,
	);
	return response.data;
};

// --- Напоминания v2 ---

export const getReminders = async (params?: {
	is_completed?: boolean;
	page?: number;
	per_page?: number;
}): Promise<PaginatedResponse<ReminderV2>> => {
	const response = await apiClient.get<PaginatedResponse<ReminderV2>>(
		"/admin/reminders",
		{ params },
	);
	return response.data;
};

export const getUpcomingReminders = async (): Promise<ReminderV2[]> => {
	const response = await apiClient.get<ReminderV2[]>(
		"/admin/reminders/upcoming",
	);
	return response.data;
};

export const createReminder = async (
	data: Omit<ReminderV2, "_id">,
): Promise<ReminderV2> => {
	const response = await apiClient.post<ReminderV2>("/admin/reminders", data);
	return response.data;
};

export const updateReminder = async (
	id: string,
	data: Partial<ReminderV2>,
): Promise<ReminderV2> => {
	const response = await apiClient.put<ReminderV2>(
		`/admin/reminders/${id}`,
		data,
	);
	return response.data;
};

export const deleteReminder = async (id: string): Promise<void> => {
	await apiClient.delete(`/admin/reminders/${id}`);
};

export const completeReminder = async (id: string): Promise<ReminderV2> => {
	const response = await apiClient.post<ReminderV2>(
		`/admin/reminders/${id}/complete`,
	);
	return response.data;
};

// --- Календарь ---

export const getCalendarEvents = async (params: {
	year: number;
	month: number;
}): Promise<CalendarEvent[]> => {
	const response = await apiClient.get<CalendarEvent[]>("/admin/calendar", {
		params,
	});
	return response.data;
};

// --- Закупки ---

export const getProcurementRecommendations = async (): Promise<
	ProcurementRecommendation[]
> => {
	const response = await apiClient.get<ProcurementRecommendation[]>(
		"/admin/procurement/recommendations",
	);
	return response.data;
};

export const generateProcurementOrder = async (data: {
	supplier_id: string;
	items: { product_id: string; qty: number }[];
}): Promise<{ file_url: string }> => {
	const response = await apiClient.post("/admin/procurement/order", data);
	return response.data;
};

export const getPriceLog = async (params?: {
	product_id?: string;
	supplier_id?: string;
	date_from?: string;
	date_to?: string;
}): Promise<PriceLogEntry[]> => {
	const response = await apiClient.get<PriceLogEntry[]>(
		"/admin/procurement/price-logs",
		{ params },
	);
	return response.data;
};

// --- Партии ---

export const getBatches = async (params?: {
	product_id?: string;
	is_exhausted?: boolean;
	expiring_soon?: boolean;
}): Promise<Batch[]> => {
	const response = await apiClient.get<Batch[]>("/admin/batches", { params });
	return response.data;
};

// --- Логистика ---

export interface RouteSheetItem {
	order_id: string;
	order_number: string;
	client_name: string;
	address: string;
	slot: string;
	items_summary: string;
	total: number;
	payment_method: string;
	weight_kg: number;
	payment_status: string;
}

export interface RouteSheet {
	date: string;
	items: RouteSheetItem[];
	total_weight: number;
	total_stops: number;
	total_amount: number;
}

export const getRouteSheet = async (date: string): Promise<RouteSheet> => {
	const response = await apiClient.get<RouteSheet>(
		"/admin/logistics/route-sheet",
		{ params: { date } },
	);
	return response.data;
};

export const downloadRouteSheetPdf = async (
	date: string,
): Promise<{ file_url: string }> => {
	const response = await apiClient.post<{ file_url: string }>(
		"/admin/logistics/route-sheet/pdf",
		{ date },
	);
	return response.data;
};

// --- Документы ---

export const generateReconciliationAct = async (
	clientId: string,
	params: {
		date_from: string;
		date_to: string;
	},
): Promise<{ file_url: string }> => {
	const response = await apiClient.post(`/admin/documents/reconciliation-act`, {
		client_id: clientId,
		...params,
	});
	return response.data;
};

export const generateContractDocument = async (
	contractId: string,
): Promise<{ file_url: string }> => {
	const response = await apiClient.post(
		`/admin/documents/contract/${contractId}`,
	);
	return response.data;
};

// --- Финансы ---

export const reconcilePayments = async (): Promise<{
	reconciled: number;
	message: string;
}> => {
	const response = await apiClient.post("/admin/finance/reconcile-payments");
	return response.data;
};

// --- Ярлыки (UC-22) ---

export const getProductsForLabels = async (params?: {
	search?: string;
	category_id?: string;
}): Promise<
	{
		_id: string;
		name: string;
		origin_country: string;
		storage_conditions: string | null;
		shelf_life_days: number | null;
		unit: string;
		certificate_number: string | null;
		certificate_type: string | null;
	}[]
> => {
	const response = await apiClient.get("/admin/labels/products", { params });
	return response.data;
};

export const previewLabel = async (data: {
	product_id: string;
	packing_date?: string;
	net_weight?: string;
}): Promise<{ html: string; product_name: string }> => {
	const response = await apiClient.post("/admin/labels/preview", data);
	return response.data;
};

export const generateLabelsPdf = async (data: {
	items: { product_id: string; packing_date?: string; net_weight?: string }[];
	labels_per_page: number;
	label_format: string;
}): Promise<Blob> => {
	const response = await apiClient.post("/admin/labels/generate", data, {
		responseType: "blob",
	});
	return response.data;
};

// UC-55: Генерация договора из шаблона
export const generateContract = async (
	contractType: string,
	clientId: string,
): Promise<Blob> => {
	const response = await apiClient.post(
		"/admin/documents/contract",
		{
			contract_type: contractType,
			client_id: clientId,
		},
		{ responseType: "blob" },
	);
	return response.data;
};
