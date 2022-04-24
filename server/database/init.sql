-- create table schema
CREATE TABLE items(
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  description TEXT,
  quantity INT,
  completed BOOLEAN NOT NULL DEFAULT FALSE,
  deleted BOOLEAN NOT NULL DEFAULT FALSE
);

-- add test data
INSERT INTO items (name, description, quantity, completed, deleted)
  VALUES ('bacon', 'smoked', 3, true, false),
  ('eggs', NULL, NULL, false, false);
