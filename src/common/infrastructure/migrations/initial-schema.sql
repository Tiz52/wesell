CREATE TABLE IF NOT EXISTS users (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL,
  PRIMARY KEY(id),
  UNIQUE KEY UQ_users_email(email)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS clients(
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  type ENUM ('P') NOT NULL DEFAULT 'P',
  created_at DATETIME NULL,
  created_by BIGINT UNSIGNED NULL,
  updated_at DATETIME NULL,
  updated_by BIGINT UNSIGNED NULL,
  first_name VARCHAR(75) NULL,
  last_name VARCHAR(75) NULL,
  dni VARCHAR(8) NULL,
  email VARCHAR(75) NULL DEFAULT 'NONE',
  PRIMARY KEY(id),
  UNIQUE INDEX UQ_clients_dni(dni),
  KEY IX_clients_created_by(created_by),
  KEY IX_clients_updated_by(updated_by),
  CONSTRAINT FK_clients_created_by FOREIGN KEY(created_by) REFERENCES users(id),
  CONSTRAINT FK_clients_updated_by FOREIGN KEY(updated_by) REFERENCES users(id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS suscriptions(
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  number VARCHAR(1) NOT NULL,
  client_id BIGINT UNSIGNED NOT NULL,
  type VARCHAR(15) NOT NULL DEFAULT 'NONE',
  created_at DATETIME NULL,
  created_by BIGINT UNSIGNED NULL,
  updated_at DATETIME NULL,
  updated_by BIGINT UNSIGNED NULL,
  PRIMARY KEY (id),
  KEY IX_suscriptions_client_id(client_id),
  KEY IX_suscriptions_created_by(created_by),
  KEY IX_suscriptions_updated_by(updated_by),
  CONSTRAINT FK_suscriptions_client_id FOREIGN KEY(client_id) REFERENCES clients(id),
  CONSTRAINT FK_suscriptions_created_by FOREIGN KEY(created_by) REFERENCES users(id),
  CONSTRAINT FK_suscriptions_updated_by FOREIGN KEY(updated_by) REFERENCES users(id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;