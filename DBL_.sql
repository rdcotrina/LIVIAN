/*
SQLyog Ultimate v12.14 (64 bit)
MySQL - 10.1.21-MariaDB : Database - livian
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`livian` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci */;

USE `livian`;

/*Table structure for table `app_boton` */

DROP TABLE IF EXISTS `app_boton`;

CREATE TABLE `app_boton` (
  `id_boton` int(11) NOT NULL AUTO_INCREMENT,
  `nboton` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `alias` varchar(10) COLLATE utf8_spanish_ci DEFAULT NULL,
  `icono` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `css` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`id_boton`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

/*Data for the table `app_boton` */

insert  into `app_boton`(`id_boton`,`nboton`,`alias`,`icono`,`css`) values 
(1,'Grabar','GRB',NULL,NULL);

/*Table structure for table `app_boton_rol_menu` */

DROP TABLE IF EXISTS `app_boton_rol_menu`;

CREATE TABLE `app_boton_rol_menu` (
  `id_botonrolmenu` int(11) NOT NULL AUTO_INCREMENT,
  `id_rolmenu` int(11) DEFAULT NULL,
  `id_boton` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_botonrolmenu`),
  KEY `id_boton` (`id_boton`),
  KEY `id_rolmenu` (`id_rolmenu`),
  CONSTRAINT `app_boton_rol_menu_ibfk_1` FOREIGN KEY (`id_boton`) REFERENCES `app_boton` (`id_boton`),
  CONSTRAINT `app_boton_rol_menu_ibfk_2` FOREIGN KEY (`id_rolmenu`) REFERENCES `app_rol_menu` (`id_rolmenu`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

/*Data for the table `app_boton_rol_menu` */

insert  into `app_boton_rol_menu`(`id_botonrolmenu`,`id_rolmenu`,`id_boton`) values 
(1,1,1);

/*Table structure for table `app_menu` */

DROP TABLE IF EXISTS `app_menu`;

CREATE TABLE `app_menu` (
  `id_menu` int(11) NOT NULL AUTO_INCREMENT COMMENT 'identificador',
  `parent` int(11) DEFAULT '0' COMMENT 'indica a que menu (id_menu) pertenece la opcion',
  `nmenu` varchar(500) COLLATE utf8_spanish_ci DEFAULT NULL COMMENT 'descripcion del menu',
  PRIMARY KEY (`id_menu`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

/*Data for the table `app_menu` */

insert  into `app_menu`(`id_menu`,`parent`,`nmenu`) values 
(1,0,'ES-Configuracion,EN-Configuration'),
(2,1,'ES-Menú,EN-Menu'),
(3,1,'ES-Botones,EN-Botons');

/*Table structure for table `app_persona` */

DROP TABLE IF EXISTS `app_persona`;

CREATE TABLE `app_persona` (
  `id_persona` bigint(20) NOT NULL AUTO_INCREMENT,
  `apellido_paterno` varchar(200) COLLATE utf8_spanish_ci DEFAULT NULL,
  `apellido_materno` varchar(200) COLLATE utf8_spanish_ci DEFAULT NULL,
  `primer_nombre` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `segundo_nombre` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `nombre_completo` varchar(250) COLLATE utf8_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`id_persona`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

/*Data for the table `app_persona` */

insert  into `app_persona`(`id_persona`,`apellido_paterno`,`apellido_materno`,`primer_nombre`,`segundo_nombre`,`nombre_completo`) values 
(1,'Admin','A','A','A','Super');

/*Table structure for table `app_rol` */

DROP TABLE IF EXISTS `app_rol`;

CREATE TABLE `app_rol` (
  `id_rol` int(11) NOT NULL AUTO_INCREMENT,
  `nrol` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`id_rol`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

/*Data for the table `app_rol` */

insert  into `app_rol`(`id_rol`,`nrol`) values 
(1,'Super Administrador'),
(2,'Administrador');

/*Table structure for table `app_rol_menu` */

DROP TABLE IF EXISTS `app_rol_menu`;

CREATE TABLE `app_rol_menu` (
  `id_rolmenu` int(11) NOT NULL AUTO_INCREMENT,
  `id_rol` int(11) DEFAULT NULL,
  `id_menu` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_rolmenu`),
  KEY `id_rol` (`id_rol`),
  KEY `id_menu` (`id_menu`),
  CONSTRAINT `app_rol_menu_ibfk_1` FOREIGN KEY (`id_rol`) REFERENCES `app_rol` (`id_rol`),
  CONSTRAINT `app_rol_menu_ibfk_2` FOREIGN KEY (`id_menu`) REFERENCES `app_menu` (`id_menu`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

/*Data for the table `app_rol_menu` */

insert  into `app_rol_menu`(`id_rolmenu`,`id_rol`,`id_menu`) values 
(1,1,2),
(2,1,3),
(3,2,3);

/*Table structure for table `app_rol_usuario` */

DROP TABLE IF EXISTS `app_rol_usuario`;

CREATE TABLE `app_rol_usuario` (
  `id_rolusuario` int(11) NOT NULL AUTO_INCREMENT,
  `id_rol` int(11) DEFAULT NULL,
  `id_usuario` bigint(11) DEFAULT NULL,
  PRIMARY KEY (`id_rolusuario`),
  KEY `id_usuario` (`id_usuario`),
  KEY `id_rol` (`id_rol`),
  CONSTRAINT `app_rol_usuario_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `app_usuario` (`id_usuario`),
  CONSTRAINT `app_rol_usuario_ibfk_2` FOREIGN KEY (`id_rol`) REFERENCES `app_rol` (`id_rol`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

/*Data for the table `app_rol_usuario` */

insert  into `app_rol_usuario`(`id_rolusuario`,`id_rol`,`id_usuario`) values 
(1,1,1),
(2,2,1);

/*Table structure for table `app_usuario` */

DROP TABLE IF EXISTS `app_usuario`;

CREATE TABLE `app_usuario` (
  `id_usuario` bigint(20) NOT NULL AUTO_INCREMENT,
  `id_persona` bigint(20) DEFAULT NULL,
  `usuario` varchar(150) COLLATE utf8_spanish_ci DEFAULT NULL,
  `clave` varchar(150) COLLATE utf8_spanish_ci DEFAULT NULL,
  `ultimo_acceso` datetime DEFAULT NULL,
  PRIMARY KEY (`id_usuario`),
  KEY `id_persona` (`id_persona`),
  CONSTRAINT `app_usuario_ibfk_1` FOREIGN KEY (`id_persona`) REFERENCES `app_persona` (`id_persona`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

/*Data for the table `app_usuario` */

insert  into `app_usuario`(`id_usuario`,`id_persona`,`usuario`,`clave`,`ultimo_acceso`) values 
(1,1,'admin','88e18a6d65b02129dc8aedff53c50ffc','2017-06-13 19:35:29');

/* Function  structure for function  `fnExplode` */

/*!50003 DROP FUNCTION IF EXISTS `fnExplode` */;
DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` FUNCTION `fnExplode`(
	_x TEXT,
	_delim VARCHAR(12),
	_pos INT
    ) RETURNS varchar(500) CHARSET latin1
    DETERMINISTIC
BEGIN
	RETURN 	REPLACE(SUBSTRING(SUBSTRING_INDEX(_x, _delim, _pos),
		CHAR_LENGTH(SUBSTRING_INDEX(_x, _delim, _pos -1)) + 1),_delim, '');
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_sisLogin` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_sisLogin` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_sisLogin`(
	_flag int,
	_user varchar(150),
	_pass varchar(150)
    )
BEGIN
	if _flag = 1 then		
		SELECT
			p.nombre_completo,
			u.id_usuario,
			p.id_persona
		FROM app_usuario u
		INNER JOIN app_persona p ON p.id_persona = u.id_persona
		WHERE u.usuario = _user
		AND u.clave = MD5(_pass);
	end if;
	if _flag = 2 then		
		SELECT 
			r.id_rol,
			o.nrol
		FROM app_rol_usuario r
		INNER JOIN app_rol o ON o.id_rol = r.id_rol
		WHERE r.id_usuario = _user;
	end if;
	if _flag = 3 then		
		UPDATE 
			app_usuario SET ultimo_acceso = NOW() 
		WHERE id_usuario = _user;
	end if;
    END */$$
DELIMITER ;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
