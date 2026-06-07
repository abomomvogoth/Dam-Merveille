-- TasteCam Heritage database schema

CREATE TABLE regions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT
);

CREATE TABLE recipes (
  id SERIAL PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  region_id INTEGER REFERENCES regions(id),
  origin TEXT,
  description TEXT,
  video_url VARCHAR(255),
  photo_url VARCHAR(255),
  default_portions INTEGER DEFAULT 4
);

CREATE TABLE ingredients (
  id SERIAL PRIMARY KEY,
  name VARCHAR(150) NOT NULL
);

CREATE TABLE recipe_ingredients (
  id SERIAL PRIMARY KEY,
  recipe_id INTEGER REFERENCES recipes(id),
  ingredient_id INTEGER REFERENCES ingredients(id),
  quantity VARCHAR(100) NOT NULL
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  email VARCHAR(150) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'user'
);
