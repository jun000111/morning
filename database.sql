
-- Drop existing tables if needed (optional)
DROP TABLE IF EXISTS user_allergies;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS allergies;

-- Create users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL
);

-- Create allergies table
CREATE TABLE allergies (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL UNIQUE
);

-- Create join table
CREATE TABLE user_allergies (
  user_id INT NOT NULL,
  allergy_id INT NOT NULL,
  PRIMARY KEY (user_id, allergy_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (allergy_id) REFERENCES allergies(id) ON DELETE CASCADE
);