create table scheduled_unpostings(
  job_id VARCHAR (64) NOT NULL PRIMARY KEY,
  user_id VARCHAR(64) REFERENCES users(user_id) NOT NULL,
  create_date TIMESTAMP NOT NULL DEFAULT now(),
  unposting_date TIMESTAMP NOT NULL,
  status VARCHAR(64)
);