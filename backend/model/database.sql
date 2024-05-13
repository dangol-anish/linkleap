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


CREATE TABLE companies (
    company_id SERIAL PRIMARY KEY,
    company_name VARCHAR(255),
    company_website VARCHAR(255),
    total_employee INT DEFAULT 0,
    company_description_title VARCHAR(255),
    company_description TEXT
);



