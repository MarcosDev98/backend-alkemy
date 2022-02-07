CREATE DATABASE alkemy_fullstack;

USE alkemy_fullstack;

CREATE TABLE user(
  id INT NOT NULL,
  email VARCHAR(30) NOT NULL,
  username VARCHAR(18) NOT NULL,
  password VARCHAR(50) NOT NULL,
);

