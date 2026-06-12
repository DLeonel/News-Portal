CREATE DATABASE  IF NOT EXISTS `blog_technology_db` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `blog_technology_db`;
-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: blog_technology_db
-- ------------------------------------------------------
-- Server version	5.5.5-10.1.21-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `artigos`
--

DROP TABLE IF EXISTS `artigos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `artigos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `view` int(11) NOT NULL DEFAULT '0',
  `likes` int(11) NOT NULL DEFAULT '0',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `artigos`
--

LOCK TABLES `artigos` WRITE;
/*!40000 ALTER TABLE `artigos` DISABLE KEYS */;
INSERT INTO `artigos` VALUES (2,'backend','O impacto das arquiteturas orientadas a eventos no desenvolvimento atual','<p><i>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda quibusdam odio cupiditate nobis officia, </i>aut reiciendis eius dolore dolorem, voluptatum, sunt ipsam molestiae provident eum ipsa dolor in explicabo soluta.</p>\n<img src=\"\" alt=\"test\">\n           <p> <b>Ducimus iusto fugit dignissimos dolor, </b>magni quidem assumenda obcaecati quibusdam doloremque maxime veritatis ea quae distinctio aliquam reprehenderit saepe similique quaerat aliquid iure? Ducimus similique et illo voluptatibus recusandae laborum?</p>\n            <p>Impedit inventore ab quas illum. Temporibus perspiciatis pariatur reiciendis nobis aperiam tempore molestias rem veritatis soluta voluptates dignissimos quae sint alias omnis corporis, beatae explicabo ad, animi dolore mollitia? Dolor?</p>\n           <p> Ipsam repellendus reprehenderit aspernatur ullam officia iure quisquam iste animi fugiat voluptate. Doloremque deserunt ipsum sint eaque. Vero, necessitatibus cum. At voluptatum nisi suscipit. Vero nulla mollitia blanditiis perferendis neque.</p>\n            <>Perferendis, quo quaerat mollitia nemo quas libero cumque in? Eos corrupti nam maiores debitis sapiente iste fugiat eligendi, repudiandae, nulla possimus quidem cupiditate similique iure, enim magni sit impedit! Quo?,<p>',0,0,'2026-06-12 01:04:36','2026-06-12 02:48:30'),(6,'teste','ds','dsczz',0,0,'2026-06-12 08:20:48','2026-06-12 08:20:48');
/*!40000 ALTER TABLE `artigos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-06-12 12:59:39
