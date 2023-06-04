CREATE DATABASE IF NOT EXISTS tasks_db;

USE tasks_db;

CREATE TABLE IF NOT EXISTS tasks (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    PRIMARY KEY (id)
);

INSERT INTO tasks (title, description) VALUES 
('task1', 'some description'),
('task2', 'some description 2');

CREATE TABLE `tasks_db`.`users` (
  `idUser` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(200) NULL,
  `email` VARCHAR(200) NULL,
  PRIMARY KEY (`idUser`));

CREATE TABLE `tasks_db`.`sesiones` (
  `idSesion` INT NOT NULL AUTO_INCREMENT,
  `fecha` DATE NULL,
  `hora_inicio` TIME NULL,
  `hora_fin` TIME NULL,
  `grupo` VARCHAR(100) NULL,
  `notas` VARCHAR(200) NULL,
  `deberes` VARCHAR(200) NULL,
  PRIMARY KEY (`idSesion`));

ALTER TABLE `tasks_db`.`sesiones` 
ADD COLUMN `email` VARCHAR(200) NULL AFTER `deberes`;

CREATE TABLE `tasks_db`.`grupos` (
  `idGrupo` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NULL,
  `nivel` VARCHAR(45) NULL,
  `num_alumnos` INT NULL,
  `comentarios` VARCHAR(200) NULL,
  PRIMARY KEY (`idGrupo`));

ALTER TABLE `tasks_db`.`grupos` 
ADD COLUMN `email` VARCHAR(45) NULL AFTER `comentarios`;

ALTER TABLE `tasks_db`.`sesiones` 
CHANGE COLUMN `grupo` `idGrupo` INT NULL DEFAULT NULL ;

ALTER TABLE `tasks_db`.`sesiones` 
ADD COLUMN `grupo` VARCHAR(45) NULL AFTER `email`;

ALTER TABLE `tasks_db`.`sesiones` 
DROP COLUMN `grupo`;
