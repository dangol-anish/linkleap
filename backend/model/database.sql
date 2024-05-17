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
    company_name VARCHAR(255) NOT NULL,
    company_website VARCHAR(255) UNIQUE NOT NULL,
    total_employee INT DEFAULT 0,
    company_description_title VARCHAR(255),
    company_description TEXT
);


CREATE TABLE customers (
    customer_id SERIAL PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) UNIQUE NOT NULL,
    customer_company VARCHAR(255),
    customer_job_title VARCHAR(255),
    customer_deal_value BIGINT,
    customer_deal_currency VARCHAR(3),
    customer_description TEXT,
    customer_status VARCHAR(50)
);


CREATE TABLE company_customers (
    company_id INT NOT NULL,
    customer_id INT NOT NULL,
    PRIMARY KEY (company_id, customer_id),
    FOREIGN KEY (company_id) REFERENCES companies(company_id) ON DELETE CASCADE,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id) ON DELETE CASCADE
);


CREATE TABLE customer_logs (
    customer_id INT NOT NULL,
    event_type VARCHAR(50) NOT NULL,
    event_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    changed_by VARCHAR(255),
    last_status TEXT,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id) ON DELETE CASCADE
);

