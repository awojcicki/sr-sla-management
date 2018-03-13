create table users(
  user_id VARCHAR (64) NOT NULL PRIMARY KEY,
  api_key_hash VARCHAR(64),
  api_key VARCHAR(64),
  create_date TIMESTAMP NOT NULL DEFAULT now(),
  config jsonb
);