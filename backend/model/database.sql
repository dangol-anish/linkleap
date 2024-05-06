-- creating database

create database linkleap;

-- creating tables

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    user_name VARCHAR(255),
    user_display_name VARCHAR(255),
    user_email VARCHAR(255),
    user_password VARCHAR(255),
    user_type VARCHAR(50) 
);