-- --------------------------------------------------------
-- Host:                         localhost
-- Server version:               10.4.6-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             10.2.0.5599
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for exchange
DROP DATABASE IF EXISTS `exchange`;
CREATE DATABASE IF NOT EXISTS `exchange` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `exchange`;

-- Dumping structure for table exchange.chf
DROP TABLE IF EXISTS `chf`;
CREATE TABLE IF NOT EXISTS `chf` (
  `USD` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table exchange.chf: ~0 rows (approximately)
/*!40000 ALTER TABLE `chf` DISABLE KEYS */;
INSERT INTO `chf` (`USD`) VALUES
	('1.1379');
/*!40000 ALTER TABLE `chf` ENABLE KEYS */;

-- Dumping structure for table exchange.eur
DROP TABLE IF EXISTS `eur`;
CREATE TABLE IF NOT EXISTS `eur` (
  `usd` varchar(255) DEFAULT NULL,
  `CHF` varchar(20) DEFAULT NULL,
  `GBP` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table exchange.eur: ~0 rows (approximately)
/*!40000 ALTER TABLE `eur` DISABLE KEYS */;
INSERT INTO `eur` (`usd`, `CHF`, `GBP`) VALUES
	('1.3764', '1.2079', '0.8731');
/*!40000 ALTER TABLE `eur` ENABLE KEYS */;

-- Dumping structure for table exchange.gbp
DROP TABLE IF EXISTS `gbp`;
CREATE TABLE IF NOT EXISTS `gbp` (
  `CAD` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table exchange.gbp: ~1 rows (approximately)
/*!40000 ALTER TABLE `gbp` DISABLE KEYS */;
INSERT INTO `gbp` (`CAD`) VALUES
	('1.5648');
/*!40000 ALTER TABLE `gbp` ENABLE KEYS */;

-- Dumping structure for table exchange.usd
DROP TABLE IF EXISTS `usd`;
CREATE TABLE IF NOT EXISTS `usd` (
  `JPY` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table exchange.usd: ~0 rows (approximately)
/*!40000 ALTER TABLE `usd` DISABLE KEYS */;
INSERT INTO `usd` (`JPY`) VALUES
	('76.7200');
/*!40000 ALTER TABLE `usd` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
