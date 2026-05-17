-- Create database
CREATE DATABASE IF NOT EXISTS lost_found_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE lost_found_db;

-- Create items table
CREATE TABLE IF NOT EXISTS items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(50) NOT NULL,
    location VARCHAR(255) NOT NULL,
    date_lost DATE NOT NULL,
    status ENUM('LOST', 'FOUND', 'CLAIMED') NOT NULL DEFAULT 'LOST',
    date_reported DATE NOT NULL,
    image_url VARCHAR(500),
    contact_name VARCHAR(255) NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    contact_phone VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_status (status),
    INDEX idx_email (contact_email),
    INDEX idx_category (category)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert sample data
INSERT INTO items (title, description, category, location, date_lost, status, date_reported, contact_name, contact_email, contact_phone, image_url) VALUES
('Silver Watch', 'A silver-colored watch with leather strap lost near the park', 'jewelry', 'Central Park', '2024-05-10', 'LOST', CURDATE(), 'John Doe', 'john@example.com', '555-1234', 'https://via.placeholder.com/400?text=Silver+Watch'),
('Blue Backpack', 'Royal blue backpack with multiple pockets found at the mall', 'bag', 'Shopping Mall', '2024-05-12', 'FOUND', CURDATE(), 'Jane Smith', 'jane@example.com', '555-5678', 'https://via.placeholder.com/400?text=Blue+Backpack'),
('Car Keys', 'Black car keys with red keychain found in a taxi', 'documents', 'Downtown', '2024-05-14', 'FOUND', CURDATE(), 'Mike Johnson', 'mike@example.com', '555-9999', 'https://via.placeholder.com/400?text=Car+Keys');
