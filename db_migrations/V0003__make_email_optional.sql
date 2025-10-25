ALTER TABLE t_p76583320_slime_market_site.users 
ALTER COLUMN email SET DEFAULT '';

UPDATE t_p76583320_slime_market_site.users 
SET email = '' 
WHERE email IS NULL;

CREATE INDEX IF NOT EXISTS idx_users_username ON t_p76583320_slime_market_site.users(username);