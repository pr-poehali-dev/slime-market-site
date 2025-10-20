-- Создание таблицы пользователей
CREATE TABLE IF NOT EXISTS t_p76583320_slime_market_site.users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    balance INTEGER DEFAULT 1000,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание индексов для быстрого поиска
CREATE INDEX IF NOT EXISTS idx_users_username ON t_p76583320_slime_market_site.users(username);
CREATE INDEX IF NOT EXISTS idx_users_email ON t_p76583320_slime_market_site.users(email);