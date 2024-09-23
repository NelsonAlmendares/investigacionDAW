CREATE DATABASE Investigacion;
USE Investigacion;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,         -- ID único para cada usuario
    username VARCHAR(50) NOT NULL UNIQUE,      -- Nombre de usuario único
    password VARCHAR(255) NOT NULL,            -- Contraseña cifrada
    email VARCHAR(100) NOT NULL UNIQUE,        -- Email único
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Fecha de creación
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Última actualización
);
SELECT * FROM users;
DESCRIBE Users;

INSERT INTO users (username, password, email) 
VALUES ('usuarioPrueba', 'contraseñaSegura', 'usuario@ejemplo.com');

ALTER TABLE users ADD role ENUM('user', 'admin') DEFAULT 'user';
ALTER TABLE users ADD status ENUM('active', 'suspended') DEFAULT 'active';

CREATE TABLE sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    token VARCHAR(255),
    expires_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
