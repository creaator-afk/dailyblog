const CONFIG = {
	ORIGIN: process.env.CORS_ORIGIN,
	PORT: process.env.PORT || 3000,
	DB_URL: process.env.DB_URL || "mongodb://localhost:27017/test",
	JWT_SECRET: process.env.JWT_SECRET || "secret",
};

module.exports = CONFIG;

