// Инициализация MongoDB при первом запуске контейнера
// Создаём пользователя приложения с правами только на БД agroreserve

db = db.getSiblingDB("agroreserve");

db.createUser({
	user: "agroreserve_app",
	pwd: "apppassword", // Изменить в production!
	roles: [
		{
			role: "readWrite",
			db: "agroreserve",
		},
	],
});

// Создаём базовые коллекции
db.createCollection("users");
db.createCollection("products");
db.createCollection("categories");
db.createCollection("orders");
db.createCollection("stock_receipts");
db.createCollection("expenses");
db.createCollection("certificates");
db.createCollection("documents");
db.createCollection("notifications");
db.createCollection("settings");

print("MongoDB инициализирована для Агрорезерв");
