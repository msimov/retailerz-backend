-- MySQL dump 10.13  Distrib 8.0.22, for macos10.15 (x86_64)
--
-- Host: localhost    Database: retailerz
-- ------------------------------------------------------
-- Server version	8.0.22

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `activities`
--

DROP TABLE IF EXISTS `activities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `activities` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(255) NOT NULL,
  `product_id` int NOT NULL,
  `activity_type_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `activities_FK` (`user_id`),
  KEY `activities_FK_1` (`product_id`),
  KEY `activities_FK_2` (`activity_type_id`),
  CONSTRAINT `activities_FK` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `activities_FK_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  CONSTRAINT `activities_FK_2` FOREIGN KEY (`activity_type_id`) REFERENCES `activity_types` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activities`
--

LOCK TABLES `activities` WRITE;
/*!40000 ALTER TABLE `activities` DISABLE KEYS */;
INSERT INTO `activities` VALUES (1,'W7cjp6aNyVeHAonfPrjWdM2aUXU2',24,1),(2,'W7cjp6aNyVeHAonfPrjWdM2aUXU2',24,1),(3,'W7cjp6aNyVeHAonfPrjWdM2aUXU2',24,1),(4,'W7cjp6aNyVeHAonfPrjWdM2aUXU2',24,1),(5,'ogrsAQbgIXfNMM2V7dV0QeSvcmA3',24,1),(6,'W7cjp6aNyVeHAonfPrjWdM2aUXU2',24,1),(7,'ogrsAQbgIXfNMM2V7dV0QeSvcmA3',24,1),(8,'ogrsAQbgIXfNMM2V7dV0QeSvcmA3',24,1),(10,'W7cjp6aNyVeHAonfPrjWdM2aUXU2',24,1),(11,'W7cjp6aNyVeHAonfPrjWdM2aUXU2',24,1),(12,'W7cjp6aNyVeHAonfPrjWdM2aUXU2',24,1),(13,'W7cjp6aNyVeHAonfPrjWdM2aUXU2',24,1),(14,'W7cjp6aNyVeHAonfPrjWdM2aUXU2',24,1),(15,'W7cjp6aNyVeHAonfPrjWdM2aUXU2',24,1),(16,'W7cjp6aNyVeHAonfPrjWdM2aUXU2',25,1),(17,'W7cjp6aNyVeHAonfPrjWdM2aUXU2',24,1),(18,'W7cjp6aNyVeHAonfPrjWdM2aUXU2',24,1),(19,'W7cjp6aNyVeHAonfPrjWdM2aUXU2',24,1),(20,'W7cjp6aNyVeHAonfPrjWdM2aUXU2',24,1),(21,'W7cjp6aNyVeHAonfPrjWdM2aUXU2',24,1),(22,'W7cjp6aNyVeHAonfPrjWdM2aUXU2',24,1);
/*!40000 ALTER TABLE `activities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `activity_types`
--

DROP TABLE IF EXISTS `activity_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `activity_types` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activity_types`
--

LOCK TABLES `activity_types` WRITE;
/*!40000 ALTER TABLE `activity_types` DISABLE KEYS */;
INSERT INTO `activity_types` VALUES (1,'VISITED_PRODUCT');
/*!40000 ALTER TABLE `activity_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `days`
--

DROP TABLE IF EXISTS `days`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `days` (
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `days`
--

LOCK TABLES `days` WRITE;
/*!40000 ALTER TABLE `days` DISABLE KEYS */;
INSERT INTO `days` VALUES (1),(2),(3),(4),(5),(6),(7),(8),(9),(10);
/*!40000 ALTER TABLE `days` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `groups`
--

DROP TABLE IF EXISTS `groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `groups` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `user_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `groups_FK` (`user_id`),
  CONSTRAINT `groups_FK` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `groups`
--

LOCK TABLES `groups` WRITE;
/*!40000 ALTER TABLE `groups` DISABLE KEYS */;
INSERT INTO `groups` VALUES (1,'Fruits','ogrsAQbgIXfNMM2V7dV0QeSvcmA3'),(21,'Fruits','W7cjp6aNyVeHAonfPrjWdM2aUXU2'),(22,'Vegetables','W7cjp6aNyVeHAonfPrjWdM2aUXU2');
/*!40000 ALTER TABLE `groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `measure_units`
--

DROP TABLE IF EXISTS `measure_units`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `measure_units` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `user_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `measue_units_FK` (`user_id`),
  CONSTRAINT `measue_units_FK` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `measure_units`
--

LOCK TABLES `measure_units` WRITE;
/*!40000 ALTER TABLE `measure_units` DISABLE KEYS */;
INSERT INTO `measure_units` VALUES (1,'KG','ogrsAQbgIXfNMM2V7dV0QeSvcmA3'),(15,'Gr.','ogrsAQbgIXfNMM2V7dV0QeSvcmA3'),(16,'KG.','W7cjp6aNyVeHAonfPrjWdM2aUXU2'),(17,'GR.','W7cjp6aNyVeHAonfPrjWdM2aUXU2'),(18,'ML.','W7cjp6aNyVeHAonfPrjWdM2aUXU2');
/*!40000 ALTER TABLE `measure_units` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `operation_types`
--

DROP TABLE IF EXISTS `operation_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `operation_types` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `operation_types`
--

LOCK TABLES `operation_types` WRITE;
/*!40000 ALTER TABLE `operation_types` DISABLE KEYS */;
INSERT INTO `operation_types` VALUES (1,'SALE'),(2,'DELIVERY'),(3,'REFUND'),(4,'BUY'),(5,'ADD_TO_CART');
/*!40000 ALTER TABLE `operation_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `operations`
--

DROP TABLE IF EXISTS `operations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `operations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `product_id` int NOT NULL,
  `count` double DEFAULT NULL,
  `operation_type_id` int NOT NULL,
  `store_id` int DEFAULT NULL,
  `creation_datetime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `operations_FK` (`operation_type_id`),
  KEY `operations_FK_1` (`product_id`),
  KEY `operations_FK_2` (`user_id`),
  KEY `operations_FK_3` (`store_id`),
  CONSTRAINT `operations_FK` FOREIGN KEY (`operation_type_id`) REFERENCES `operation_types` (`id`),
  CONSTRAINT `operations_FK_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  CONSTRAINT `operations_FK_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `operations_FK_3` FOREIGN KEY (`store_id`) REFERENCES `stores` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=124 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `operations`
--

LOCK TABLES `operations` WRITE;
/*!40000 ALTER TABLE `operations` DISABLE KEYS */;
INSERT INTO `operations` VALUES (108,'W7cjp6aNyVeHAonfPrjWdM2aUXU2',24,5,2,44,NULL),(109,'ogrsAQbgIXfNMM2V7dV0QeSvcmA3',24,3,5,44,NULL),(111,'W7cjp6aNyVeHAonfPrjWdM2aUXU2',24,500,2,44,NULL),(112,'W7cjp6aNyVeHAonfPrjWdM2aUXU2',25,500,2,44,NULL),(113,'W7cjp6aNyVeHAonfPrjWdM2aUXU2',24,20,1,44,NULL),(114,'W7cjp6aNyVeHAonfPrjWdM2aUXU2',24,20,1,44,NULL),(115,'W7cjp6aNyVeHAonfPrjWdM2aUXU2',24,20,1,47,NULL),(116,'W7cjp6aNyVeHAonfPrjWdM2aUXU2',25,40,1,44,NULL),(120,'W7cjp6aNyVeHAonfPrjWdM2aUXU2',24,3,1,44,'2021-03-05 18:52:25'),(121,'W7cjp6aNyVeHAonfPrjWdM2aUXU2',24,3,1,44,'2021-03-05 18:52:25');
/*!40000 ALTER TABLE `operations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `barcode` varchar(255) DEFAULT NULL,
  `measure_unit_id` int NOT NULL,
  `tax_group_id` int NOT NULL,
  `retail_price` double NOT NULL,
  `delivery_price` double NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(500) DEFAULT NULL,
  `user_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `products_FK` (`group_id`),
  KEY `products_FK_1` (`measure_unit_id`),
  KEY `products_FK_2` (`tax_group_id`),
  KEY `products_FK_4` (`user_id`),
  CONSTRAINT `products_FK` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`) ON DELETE CASCADE,
  CONSTRAINT `products_FK_1` FOREIGN KEY (`measure_unit_id`) REFERENCES `measure_units` (`id`) ON DELETE CASCADE,
  CONSTRAINT `products_FK_2` FOREIGN KEY (`tax_group_id`) REFERENCES `tax_groups` (`id`) ON DELETE CASCADE,
  CONSTRAINT `products_FK_3` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (24,21,'12321321',16,1,1.99,1,'Apple','Apple','W7cjp6aNyVeHAonfPrjWdM2aUXU2'),(25,21,'32132131',16,1,2.99,1,'Orange','Orange','W7cjp6aNyVeHAonfPrjWdM2aUXU2');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stores`
--

DROP TABLE IF EXISTS `stores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stores` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `lat` decimal(9,6) NOT NULL,
  `lng` decimal(8,6) NOT NULL,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `stores_FK_1` (`user_id`),
  CONSTRAINT `stores_FK_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stores`
--

LOCK TABLES `stores` WRITE;
/*!40000 ALTER TABLE `stores` DISABLE KEYS */;
INSERT INTO `stores` VALUES (44,'W7cjp6aNyVeHAonfPrjWdM2aUXU2',42.710942,23.268227,'Selmart','G.K. Lyulin 7 742А, 1324 zh.k. Lyulin 7, Sofia, Bulgaria'),(47,'W7cjp6aNyVeHAonfPrjWdM2aUXU2',42.724439,23.247043,'T-Market','bul. \"Tsaritsa Yoanna\" 114, 1343 Люлин 2, Sofia, Bulgaria'),(49,'W7cjp6aNyVeHAonfPrjWdM2aUXU2',42.714391,23.265622,'Lidl','bul. \"Louis Pasteur\" 30, 1324 zh.k. Lyulin 7, Sofia, Bulgaria'),(50,'W7cjp6aNyVeHAonfPrjWdM2aUXU2',42.746476,23.231792,'Metro','bul. \"Evropa\" 182, 1331 Republika, Sofia, Bulgaria');
/*!40000 ALTER TABLE `stores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stores_products`
--

DROP TABLE IF EXISTS `stores_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stores_products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `store_id` int NOT NULL,
  `product_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `stores_products_FK_1` (`store_id`),
  KEY `stores_products_FK_2` (`product_id`),
  CONSTRAINT `stores_products_FK_1` FOREIGN KEY (`store_id`) REFERENCES `stores` (`id`),
  CONSTRAINT `stores_products_FK_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stores_products`
--

LOCK TABLES `stores_products` WRITE;
/*!40000 ALTER TABLE `stores_products` DISABLE KEYS */;
INSERT INTO `stores_products` VALUES (22,49,25),(24,44,24),(25,44,25);
/*!40000 ALTER TABLE `stores_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tax_groups`
--

DROP TABLE IF EXISTS `tax_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tax_groups` (
  `id` int NOT NULL AUTO_INCREMENT,
  `percentage` decimal(10,0) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tax_groups`
--

LOCK TABLES `tax_groups` WRITE;
/*!40000 ALTER TABLE `tax_groups` DISABLE KEYS */;
INSERT INTO `tax_groups` VALUES (1,20),(2,9),(3,5),(4,0);
/*!40000 ALTER TABLE `tax_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_types`
--

DROP TABLE IF EXISTS `user_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_types` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_types`
--

LOCK TABLES `user_types` WRITE;
/*!40000 ALTER TABLE `user_types` DISABLE KEYS */;
INSERT INTO `user_types` VALUES (1,'CUSTOMER'),(2,'RETAILER');
/*!40000 ALTER TABLE `user_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` varchar(255) NOT NULL,
  `first_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `last_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `user_type_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `users_FK` (`user_type_id`),
  CONSTRAINT `users_FK` FOREIGN KEY (`user_type_id`) REFERENCES `user_types` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('ef0EPFaobCOBJvlTyhC2AiB9sng1','Martin','Simov',1),('ogrsAQbgIXfNMM2V7dV0QeSvcmA3','Marti','Parti',1),('W7cjp6aNyVeHAonfPrjWdM2aUXU2','Martin','Simov',2);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'retailerz'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-05-22 17:09:18
