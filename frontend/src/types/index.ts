// ============================================================
// ТИПЫ И ИНТЕРФЕЙСЫ АГРОРЕЗЕРВ
// ============================================================

// --- Enum типы ---

export enum UserRole {
  ADMIN = 'admin',
  CLIENT = 'client',
}

export enum ClientType {
  INDIVIDUAL = 'individual',  // Физлицо
  IP = 'ip',                   // ИП
  OOO = 'ooo',                 // ООО
}

export enum UserStatus {
  PENDING = 'pending',       // На модерации
  APPROVED = 'approved',     // Одобрен
  REJECTED = 'rejected',     // Отклонён
  BLOCKED = 'blocked',       // Заблокирован
}

export enum OrderStatus {
  NEW = 'new',               // Новый
  CONFIRMED = 'confirmed',   // Подтверждён
  ASSEMBLING = 'assembling', // Собирается
  ASSEMBLED = 'assembled',   // Собран
  DELIVERING = 'delivering', // В пути
  DELIVERED = 'delivered',   // Доставлен
  CANCELLED = 'cancelled',   // Отменён
}

export enum PaymentMethod {
  CASH = 'cash',                         // Наличные при доставке
  BANK_TRANSFER = 'bank_transfer',       // Безналичный расчёт
  CARD_ON_DELIVERY = 'card_on_delivery', // Картой при доставке
  PREPAYMENT = 'prepayment',             // Предоплата на карту
}

export enum PaymentStatus {
  PENDING = 'pending',       // Ожидает оплаты
  PAID = 'paid',             // Оплачен
  PARTIAL = 'partial',       // Частично оплачен
  OVERDUE = 'overdue',       // Просрочен
}

export enum DeliveryPriority {
  URGENT = 'urgent',         // Срочно (госконтракт)
  NORMAL = 'normal',         // Обычный
  FLEXIBLE = 'flexible',     // Гибкий
}

export enum ExpenseCategory {
  RENT = 'rent',             // Аренда
  TRANSPORT = 'transport',   // Транспорт
  PACKAGING = 'packaging',   // Упаковка
  SALARY = 'salary',         // Зарплата
  COMMUNICATION = 'communication', // Связь
  TAXES = 'taxes',           // Налоги
  OTHER = 'other',           // Прочее
}

export enum CertType {
  DECLARATION = 'declaration',   // Декларация ТР ТС
  CERTIFICATE = 'certificate',   // Сертификат
  VET_CERT = 'vet_cert',         // Ветсправка
  QUALITY_CERT = 'quality_cert', // Удостоверение качества
}

export enum DocType {
  INVOICE = 'invoice',       // Счёт на оплату
  TORG12 = 'torg12',         // ТОРГ-12
  UPD = 'upd',               // УПД
  ACT = 'act',               // Акт сверки
  CONTRACT = 'contract',     // Договор
}

export enum UnitType {
  KG = 'kg',    // Килограммы
  PIECE = 'piece', // Штуки
  LITER = 'liter', // Литры
  BOX = 'box',    // Ящик
  BAG = 'bag',    // Мешок
}

// --- Организация ---

export interface Organization {
  name: string;         // Название организации
  inn: string;          // ИНН
  kpp?: string;         // КПП
  ogrn?: string;        // ОГРН
  legal_address: string; // Юридический адрес
  actual_address?: string; // Фактический адрес
  bank_name?: string;   // Название банка
  bank_account?: string; // Расчётный счёт
  bik?: string;         // БИК
  corr_account?: string; // Корр. счёт
}

// --- Пользователь ---

export interface User {
  id: string;
  email: string;
  phone?: string;
  full_name: string;
  role: UserRole;
  client_type: ClientType;
  status: UserStatus;
  organization?: Organization;
  delivery_address?: string;
  credit_limit: number;
  debt: number;
  telegram_chat_id?: string;
  created_at: string;
  updated_at: string;
}

// --- Категория ---

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  image?: string;
  description?: string;
  parent_id?: string;
  product_count: number;
  sort_order: number;
}

// --- Товар ---

export interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string;
  category_id: string;
  category?: Category;
  images: string[];
  price_retail: number;        // Розничная цена (₽/кг)
  price_wholesale: number;     // Оптовая цена (₽/кг)
  price_purchase: number;      // Закупочная цена (₽/кг) — только для админа
  unit: UnitType;              // Единица измерения
  unit_weight?: number;        // Средний вес штуки (кг) для поштучного калькулятора
  min_order_qty: number;       // Минимальная партия
  order_step: number;          // Шаг изменения количества
  stock_quantity: number;      // Текущий остаток
  min_stock_quantity: number;  // Минимальный остаток
  is_active: boolean;          // Активен
  is_available: boolean;       // Доступен для заказа
  country_of_origin: string;   // Страна происхождения
  storage_conditions?: string; // Условия хранения
  certificate_ids: string[];   // Привязанные сертификаты
  popularity: number;          // Популярность (для сортировки)
  created_at: string;
  updated_at: string;
}

// --- Позиция корзины ---

export interface CartItem {
  product_id: string;
  product: Product;
  quantity: number;
  price: number;       // Цена на момент добавления
  subtotal: number;    // Сумма по позиции
}

// --- Корзина ---

export interface Cart {
  items: CartItem[];
  total: number;
  items_count: number;
}

// --- Позиция заказа ---

export interface OrderItem {
  product_id: string;
  product?: Product;
  product_name: string;    // Сохранённое название на момент заказа
  ordered_qty: number;     // Заказанное количество
  actual_qty?: number;     // Фактическое количество (взвешенное)
  unit: string;            // Единица измерения
  price: number;
  total: number;           // Сумма по позиции
}

// --- Заказ ---

export interface Order {
  id: string;
  order_number: string;    // Номер заказа (ЗК-00001)
  client_id: string;
  client?: User;
  items: OrderItem[];
  status: OrderStatus;
  payment_method: PaymentMethod;
  payment_status: PaymentStatus;
  delivery_address: string;
  delivery_date: string;
  delivery_slot: string;   // Временной слот: "08:00-11:00"
  delivery_priority: DeliveryPriority;
  note?: string;
  total: number;
  paid_amount: number;
  documents: Document[];
  status_history: OrderStatusEvent[];
  created_at: string;
  updated_at: string;
}

export interface OrderStatusEvent {
  status: OrderStatus;
  changed_at: string;
  changed_by?: string;
  note?: string;
}

// --- Приходная накладная ---

export interface StockReceipt {
  id: string;
  receipt_number: string;   // Номер прихода
  supplier_name: string;    // Поставщик
  date: string;
  invoice_number?: string;  // Номер накладной
  items: StockReceiptItem[];
  total: number;
  note?: string;
  created_by: string;
  created_at: string;
}

export interface StockReceiptItem {
  id: string;
  product_id: string;
  product?: Product;
  quantity: number;
  purchase_price: number;
  subtotal: number;
}

// --- Остатки ---

export interface StockItem {
  product_id: string;
  product?: Product;
  quantity: number;
  min_quantity: number;
  is_critical: boolean;
  updated_at: string;
}

// --- Расходы ---

export interface Expense {
  id: string;
  category: ExpenseCategory;
  description: string;
  amount: number;
  date: string;
  is_recurring: boolean;     // Повторяющийся расход
  recurrence_period?: string; // Периодичность
  created_at: string;
}

// --- Сертификат ---

export interface Certificate {
  id: string;
  cert_number: string;       // Номер сертификата
  cert_type: CertType;
  issuing_authority: string; // Орган выдачи
  issued_at: string;
  expires_at: string;
  file_url?: string;
  product_ids: string[];     // Привязанные товары
  is_active: boolean;
  status: 'valid' | 'expiring_soon' | 'expired';
  created_at: string;
}

// --- Документ ---

export interface Document {
  id: string;
  doc_type: DocType;
  doc_number: string;         // Номер документа (Счёт-001)
  order_id?: string;
  client_id?: string;
  file_url?: string;
  created_at: string;
}

// --- Уведомление ---

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  is_read: boolean;
  type: 'order' | 'payment' | 'system' | 'certificate';
  created_at: string;
}

// --- Настройки ---

export interface Settings {
  company_name: string;
  company_inn: string;
  company_ogrn?: string;
  company_address: string;
  company_phone: string;
  company_email: string;
  company_director: string;
  bank_name?: string;
  bank_account?: string;
  bik?: string;
  corr_account?: string;
  logo_url?: string;
  delivery_slots: string[];  // ["08:00-11:00", "11:00-14:00", "14:00-17:00"]
  tax_rate: number;          // Процент налога
  working_hours: string;
}

// --- Финансы ---

export interface PnLReport {
  period_start: string;
  period_end: string;
  revenue: number;           // Выручка
  cost_of_goods: number;     // Себестоимость
  gross_profit: number;      // Валовая прибыль
  gross_margin: number;      // Маржа (%)
  expenses: number;          // Расходы
  tax: number;               // Налог
  net_profit: number;        // Чистая прибыль
  orders_count: number;
  avg_order: number;
}

// --- Дашборд ---

export interface DashboardData {
  today: {
    revenue: number;
    paid: number;
    debt: number;
    orders_new: number;
    orders_to_ship: number;
    orders_urgent: number;
  };
  yesterday: {
    revenue: number;
  };
  deliveries_today: DeliveryInfo[];
  reminders: Reminder[];
  critical_stock: StockItem[];
}

export interface DeliveryInfo {
  order_id: string;
  order_number: string;
  client_name: string;
  address: string;
  slot: string;
  priority: DeliveryPriority;
  total: number;
}

export interface Reminder {
  type: 'debt' | 'certificate' | 'stock';
  message: string;
  urgency: 'high' | 'medium' | 'low';
  entity_id?: string;
}

// ============================================================
// НОВЫЕ ТИПЫ v2
// ============================================================

// --- Поставщик ---

export interface Supplier {
  _id: string;
  name: string;
  contact_person: string;
  phone: string;
  email?: string;
  address?: string;
  inn?: string;
  product_ids: string[];
  rating: number;           // 1-5 звёзд
  notes?: string;
  is_active: boolean;
  created_at: string;
}

// --- Госконтракт ---

export interface ContractItem {
  product_id: string;
  product_name: string;
  qty: number;
  delivered_qty: number;
  unit: string;
  price: number;
}

export interface DeliverySchedule {
  date: string;
  items: ContractItem[];
  is_completed: boolean;
  order_id?: string;
}

export interface Contract {
  _id: string;
  contract_number: string;
  client_id: string;
  client_name: string;
  contract_type: string;
  start_date: string;
  end_date: string;
  total_amount: number;
  items: ContractItem[];
  delivery_schedule: DeliverySchedule[];
  completion_percent: number;
  status: string;           // active / completed / cancelled
  notes?: string;
  created_at: string;
}

// --- Блюдо ---

export interface DishIngredient {
  product_id?: string;
  name: string;
  qty_per_portion_g: number;
  unit: string;
}

export interface Dish {
  _id: string;
  name: string;
  category: string;
  description?: string;
  ingredients: DishIngredient[];
  portion_weight_g: number;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  sanpin_compliant: boolean;
  age_groups: string[];
  is_active: boolean;
}

// --- Меню ---

export interface MenuItem {
  dish_id: string;
  dish_name: string;
  portions: number;
  meal_type: string;        // breakfast / lunch / dinner / snack
}

export interface MenuDay {
  date: string;
  items: MenuItem[];
}

export interface Menu {
  _id: string;
  client_id: string;
  week_start: string;
  week_end: string;
  days: MenuDay[];
  total_portions: number;
  total_calories: number;
  total_protein: number;
  total_fat: number;
  total_carbs: number;
  generated_order_id?: string;
  status: string;           // draft / confirmed / ordered
}

// --- Списание ---

export interface WriteOff {
  _id: string;
  product_id: string;
  product_name: string;
  qty: number;
  unit: string;
  cost_price: number;
  total_loss: number;
  reason: string;           // spoilage / expiry / damage / other
  description?: string;
  photo_url?: string;
  created_at: string;
}

// --- Партия ---

export interface Batch {
  _id: string;
  product_id: string;
  product_name: string;
  qty_initial: number;
  qty_remaining: number;
  cost_price: number;
  expiry_date?: string;
  received_date: string;
  is_exhausted: boolean;
}

// --- Тендер ---

export interface TenderItem {
  name: string;
  qty: number;
  unit: string;
  unit_price: number;
}

export interface Tender {
  _id: string;
  eis_number: string;
  title: string;
  customer: string;
  region: string;
  max_price: number;
  items: TenderItem[];
  deadline: string;
  source_url: string;
  status: string;           // new / reviewing / bid / won / lost / skipped
  our_price?: number;
  margin_estimate?: number;
  notes?: string;
}

// --- Напоминание v2 (расширенное) ---

export interface ReminderV2 {
  _id: string;
  title: string;
  description?: string;
  remind_at: string;
  is_recurring: boolean;
  related_type?: string;    // order / contract / tender / certificate
  related_id?: string;
  is_completed: boolean;
}

// --- Регулярный заказ ---

export interface StandingOrderItem {
  product_id: string;
  product_name: string;
  qty: number;
  unit: string;
  price: number;
}

export interface StandingOrder {
  _id: string;
  client_id: string;
  client_name: string;
  items: StandingOrderItem[];
  schedule: string;         // daily / weekly / biweekly / monthly
  delivery_slot: string;
  delivery_address: string;
  is_active: boolean;
  next_generation_at?: string;
}

// --- CRM карточка клиента ---

export interface ClientCard {
  user: User;
  orders_count: number;
  total_revenue: number;
  avg_check: number;
  top_products: { name: string; qty: number; revenue: number }[];
  debt: number;
  credit_limit: number;
  contracts: Contract[];
  notes: { _id: string; text: string; created_at: string }[];
  interactions: { _id: string; type: string; description: string; created_at: string }[];
}

// --- Аналитика ---

export interface AnalyticsOverview {
  revenue: number;
  profit: number;
  orders_count: number;
  clients_count: number;
  avg_check: number;
  margin_percent: number;
  revenue_change: number;   // % по сравнению с прошлым периодом
  profit_change: number;
}

export interface AnalyticsRevenuePoint {
  date: string;
  revenue: number;
  profit: number;
  orders: number;
}

export interface AnalyticsTopProduct {
  product_id: string;
  name: string;
  qty: number;
  revenue: number;
  margin: number;
}

export interface AnalyticsTopClient {
  client_id: string;
  name: string;
  orders_count: number;
  revenue: number;
  avg_check: number;
}

export interface AnalyticsMargin {
  product_id: string;
  name: string;
  category: string;
  revenue: number;
  cost: number;
  margin_amount: number;
  margin_percent: number;
}

// --- Событие календаря ---

export interface CalendarEvent {
  date: string;
  type: string;             // delivery / tender / payment / reminder / certificate
  title: string;
  description?: string;
  color: string;
  link?: string;
}

// --- Рекомендация закупки ---

export interface ProcurementRecommendation {
  product_id: string;
  product_name: string;
  current_stock: number;
  min_stock: number;
  avg_weekly_consumption: number;
  recommended_qty: number;
  unit: string;
  estimated_cost: number;
  is_critical: boolean;
  days_remaining: number;
}

// --- История цены ---

export interface PriceLogEntry {
  _id: string;
  product_id: string;
  product_name: string;
  supplier_id: string;
  supplier_name: string;
  price: number;
  date: string;
  change_percent?: number;
}

// --- API ответы ---

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  per_page: number;
  pages: number;
}

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

export interface AuthResponse {
  tokens: AuthTokens;
  user: User;
}

// --- Параметры запросов ---

export interface CatalogParams {
  category_id?: string;
  search?: string;
  sort?: 'price_asc' | 'price_desc' | 'name' | 'popularity';
  page?: number;
  per_page?: number;
  in_stock?: boolean;
}

export interface OrdersParams {
  status?: OrderStatus;
  date_from?: string;
  date_to?: string;
  page?: number;
  per_page?: number;
}

export interface AdminOrdersParams extends OrdersParams {
  client_id?: string;
  delivery_date?: string;
}
