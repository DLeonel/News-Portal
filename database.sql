CREATE DATABASE IF NOT EXISTS blog_technology_db;
USE blog_technology_db;

-- -----------------------------------------------------
-- Tabela: configuracoes
-- Armazena os dados globais do site editáveis no Painel
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `configuracoes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `site_name` VARCHAR(100) NOT NULL DEFAULT 'Technology',
  `site_logo` VARCHAR(255) NOT NULL DEFAULT 'bi-cpu',
  `footer_text` VARCHAR(255) NOT NULL DEFAULT '© 2026 Technology. Todos os direitos reservados.',
  `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insere o registro inicial (ID 1) para que o Painel ADM faça apenas UPDATE
-- INSERT INTO `configuracoes` (`id`, `site_name`, `site_logo`, `footer_text`) 
-- VALUES (1, 'Technology', 'bi-cpu', '© 2026 Technology. Todos os direitos reservados.')
-- ON DUPLICATE KEY UPDATE id=id;


-- -----------------------------------------------------
-- Tabela: artigos
-- Recebe os IDs, títulos e conteúdos dos artigos publicados
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `artigos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `category` VARCHAR(100) NULL,
  `title` VARCHAR(255) NOT NULL,
  `content` LONGTEXT NOT NULL,
  `view` INT NOT NULL DEFAULT 0,
  `likes` INT NOT NULL DEFAULT 0,
  `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------
-- Tabela: usuarios
-- Armazena os dados dos usuários para autenticação no Painel
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(100) NOT NULL UNIQUE,
  `password` VARCHAR(155) NOT NULL,
  `username` VARCHAR(50) NOT NULL UNIQUE,
  `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------
-- Tabela: Administradores
-- Armazena os dados dos administradores para autenticação no Painel
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `administradores` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `profilePhoto` LONGBLOB NULL,
  `email` VARCHAR(100) NOT NULL UNIQUE,
  `username` VARCHAR(50) NOT NULL UNIQUE,
  `password` VARCHAR(255) NULL,
  `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

