-- Database Schema for Portfolio CMS (cPanel & Production Ready)
-- Select your database in phpMyAdmin and run the queries below:

-- 1. Admins Table
CREATE TABLE IF NOT EXISTS `admins` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(50) NOT NULL UNIQUE,
  `email` VARCHAR(100) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `role` VARCHAR(20) DEFAULT 'admin',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 2. About Table
CREATE TABLE IF NOT EXISTS `about` (
  `id` INT PRIMARY KEY DEFAULT 1,
  `name` VARCHAR(100) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `tagline` TEXT,
  `bio` TEXT NOT NULL,
  `career_objective` TEXT NOT NULL,
  `technical_interests` JSON,
  `leadership_text` TEXT,
  `current_learning` JSON,
  `location` VARCHAR(100),
  `email` VARCHAR(100),
  `phone` VARCHAR(50),
  `profile_image_url` VARCHAR(255) DEFAULT '/assets/gowtham-profile.png',
  `github_url` VARCHAR(255) DEFAULT 'https://github.com/gowthamg-dev',
  `linkedin_url` VARCHAR(255) DEFAULT 'https://linkedin.com/in/gowthamg-dev',
  `twitter_url` VARCHAR(255) DEFAULT 'https://twitter.com/gowthamg_dev',
  `instagram_url` VARCHAR(255) DEFAULT 'https://instagram.com/gowthamg_dev',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 3. Skills Table
CREATE TABLE IF NOT EXISTS `skills` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `category` VARCHAR(50) NOT NULL,
  `icon_name` VARCHAR(50) DEFAULT 'FaCode',
  `proficiency` VARCHAR(50) DEFAULT 'Intermediate',
  `color` VARCHAR(20) DEFAULT '#38BDF8',
  `description` TEXT,
  `display_order` INT DEFAULT 0,
  `enabled` TINYINT(1) DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 4. Projects Table
CREATE TABLE IF NOT EXISTS `projects` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `slug` VARCHAR(150) NOT NULL UNIQUE,
  `title` VARCHAR(255) NOT NULL,
  `subtitle` VARCHAR(255),
  `category` VARCHAR(100) NOT NULL,
  `image_url` VARCHAR(255),
  `description` TEXT NOT NULL,
  `long_description` TEXT,
  `tags` JSON,
  `features` JSON,
  `architecture` TEXT,
  `role` VARCHAR(100),
  `duration` VARCHAR(50),
  `github_url` VARCHAR(255),
  `demo_url` VARCHAR(255),
  `featured` TINYINT(1) DEFAULT 0,
  `published` TINYINT(1) DEFAULT 1,
  `display_order` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 5. Certificates Table
CREATE TABLE IF NOT EXISTS `certificates` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `organization` VARCHAR(100) DEFAULT '',
  `issuer` VARCHAR(100) DEFAULT '',
  `duration` VARCHAR(50) DEFAULT '',
  `year` VARCHAR(50) DEFAULT '',
  `credential_id` VARCHAR(100) DEFAULT '',
  `image_url` VARCHAR(255),
  `description` TEXT,
  `verify_url` VARCHAR(255) DEFAULT '',
  `display_order` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 6. Education Table
CREATE TABLE IF NOT EXISTS `education` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `degree` VARCHAR(150) NOT NULL,
  `institution` VARCHAR(255) NOT NULL,
  `period` VARCHAR(50) NOT NULL,
  `status` VARCHAR(50) DEFAULT 'Graduated',
  `grade` VARCHAR(50),
  `description` TEXT,
  `courses` JSON,
  `display_order` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 7. Contact Messages Table
CREATE TABLE IF NOT EXISTS `contact_messages` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `subject` VARCHAR(255),
  `message` TEXT NOT NULL,
  `is_read` TINYINT(1) DEFAULT 0,
  `ip_address` VARCHAR(45),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 8. Resumes Table
CREATE TABLE IF NOT EXISTS `resumes` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `file_name` VARCHAR(255) NOT NULL,
  `file_url` VARCHAR(255) NOT NULL,
  `is_active` TINYINT(1) DEFAULT 1,
  `uploaded_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 9. Settings Table
CREATE TABLE IF NOT EXISTS `settings` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `key_name` VARCHAR(100) NOT NULL UNIQUE,
  `value_text` TEXT,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 10. Activity Logs Table
CREATE TABLE IF NOT EXISTS `activity_logs` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `admin_id` INT,
  `admin_name` VARCHAR(100),
  `action` VARCHAR(50) NOT NULL,
  `module` VARCHAR(50) NOT NULL,
  `details` TEXT,
  `ip_address` VARCHAR(45),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;
