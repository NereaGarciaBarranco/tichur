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

USE `tasks_db`;
DROP procedure IF EXISTS `create_sessions`;

USE `tasks_db`;
DROP procedure IF EXISTS `tasks_db`.`create_sessions`;
;

DELIMITER $$
USE `tasks_db`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `create_sessions`(
  IN start_time TIME,
  IN end_time TIME,
  IN group_id INT,
  IN email_val VARCHAR(200),
  IN end_date DATE,
  IN current_date_param DATE
)
BEGIN
  DECLARE diff INT;
  
  SET diff = DATEDIFF(end_date, current_date_param);
  
  WHILE diff >= 0 DO
    
	INSERT INTO sesiones (fecha, hora_inicio, hora_fin, idGrupo, notas, deberes, email)
	VALUES (current_date_param, start_time, end_time, group_id, NULL, NULL, email_val);
    
    SET current_date_param = ADDDATE(current_date_param, INTERVAL 7 DAY);
    SET diff = diff - 7;
  END WHILE;
  
  SELECT 'Sessions created successfully.';
END$$

DELIMITER ;
;

USE `tasks_db`;
DROP procedure IF EXISTS `cancelar_clase`;

USE `tasks_db`;
DROP procedure IF EXISTS `tasks_db`.`cancelar_clase`;
;

DELIMITER $$
USE `tasks_db`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `cancelar_clase`(IN sesion_id INT)
BEGIN
    DECLARE fecha_cancelada DATE;
    DECLARE hora_inicio_cancelada TIME;
    DECLARE hora_fin_cancelada TIME;
    DECLARE notas_canceladas VARCHAR(255);
    DECLARE deberes_cancelados VARCHAR(255);
    DECLARE email_cancelado VARCHAR(255);
    DECLARE fecha_siguiente DATE;
    
    -- Obtener los datos de la clase cancelada
    SELECT fecha, hora_inicio, hora_fin, notas, deberes, email
    INTO fecha_cancelada, hora_inicio_cancelada, hora_fin_cancelada, notas_canceladas, deberes_cancelados, email_cancelado
    FROM sesiones
    WHERE idSesion = sesion_id;

  -- Actualizar las clases siguientes
    UPDATE sesiones AS s1, sesiones AS s2
    SET s1.notas = s2.notas,
        s1.deberes = s2.deberes
    WHERE s1.fecha > fecha_cancelada
    AND s1.idSesion = s2.idSesion + 1;
    
    -- Crear una nueva clase una semana después de la última clase
    SELECT DATE_ADD(MAX(fecha), INTERVAL 7 DAY)
    INTO fecha_siguiente
    FROM sesiones;
    
    INSERT INTO sesiones (fecha, hora_inicio, hora_fin, idGrupo, notas, deberes, email)
    VALUES (fecha_siguiente, hora_inicio_cancelada, hora_fin_cancelada, 1, notas_canceladas, deberes_cancelados, email_cancelado);
    
    -- Finalmente borramos la sesion cancelada
    DELETE FROM sesiones WHERE idSesion = sesion_id;
    
END$$

DELIMITER ;
;

ALTER TABLE `tasks_db`.`sesiones` 
DROP COLUMN `cancelado`;


USE `tasks_db`;
DROP procedure IF EXISTS `tasks_db`.`cancelar_sesion`;
;

DELIMITER $$
USE `tasks_db`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `cancelar_sesion`(IN sesion_id INT)
BEGIN
    DECLARE fecha_cancelada DATE;
    DECLARE hora_inicio_cancelada TIME;
    DECLARE hora_fin_cancelada TIME;
    DECLARE notas_canceladas VARCHAR(255);
    DECLARE deberes_cancelados VARCHAR(255);
    DECLARE email_cancelado VARCHAR(255);
    DECLARE fecha_siguiente DATE;
    
    -- Obtener los datos de la clase cancelada
    SELECT fecha, hora_inicio, hora_fin, notas, deberes, email
    INTO fecha_cancelada, hora_inicio_cancelada, hora_fin_cancelada, notas_canceladas, deberes_cancelados, email_cancelado
    FROM sesiones
    WHERE idSesion = sesion_id;

  -- Actualizar las clases siguientes
    UPDATE sesiones AS s1, sesiones AS s2
    SET s1.notas = s2.notas,
        s1.deberes = s2.deberes
    WHERE s1.fecha > fecha_cancelada
    AND s1.idSesion = s2.idSesion + 1;
    
    -- Crear una nueva clase una semana después de la última clase
    SELECT DATE_ADD(MAX(fecha), INTERVAL 7 DAY)
    INTO fecha_siguiente
    FROM sesiones;
    
    INSERT INTO sesiones (fecha, hora_inicio, hora_fin, idGrupo, notas, deberes, email)
    VALUES (fecha_siguiente, hora_inicio_cancelada, hora_fin_cancelada, 1, notas_canceladas, deberes_cancelados, email_cancelado);
    
    -- Finalmente borramos la sesion cancelada
    DELETE FROM sesiones WHERE idSesion = sesion_id;
    
END$$

DELIMITER ;
;

DELIMITER //

CREATE PROCEDURE cancel_session(IN session_id INT)
BEGIN
	DECLARE max_date DATE;
    DECLARE max_id INT;
    DECLARE i INT;
    DECLARE aux_notas VARCHAR(255);
	DECLARE aux_deberes VARCHAR(255);
    DECLARE new_session_date DATE;
    DECLARE new_session_start_time TIME;
    DECLARE new_session_end_time TIME;
    DECLARE new_session_group INT;
    DECLARE new_session_mail VARCHAR(255);
    
    -- Auxiliar variables to obtain the notes and the homework
    SET aux_notas = (SELECT notas FROM sesiones WHERE idSesion = session_id);
	SET aux_deberes = (SELECT deberes FROM sesiones WHERE idSesion = session_id);
    
    -- The group and the email of the new session is going to be the same
    SET  new_session_group = (SELECT idGrupo FROM sesiones WHERE idSesion = session_id);
	SET  new_session_mail = (SELECT email FROM sesiones WHERE idSesion = session_id);
    
     -- Create a temporary table to store the session content with a temporary index
    CREATE TEMPORARY TABLE temp_sesiones (
        temp_index INT AUTO_INCREMENT PRIMARY KEY,
        idSesion INT,
        notas VARCHAR(255),
        deberes VARCHAR(255)
    );
    
    -- Insert the sessions for that group that have posterior dates into the temporary table
    INSERT INTO temp_sesiones (idSesion, notas, deberes)
    SELECT idSesion, notas, deberes
    FROM sesiones
    WHERE fecha >= (SELECT fecha FROM sesiones WHERE idSesion = session_id)
    AND idGrupo = (SELECT idGrupo FROM sesiones WHERE idSesion = session_id)
    ORDER BY fecha ASC;
    
	-- Obtain the date, start time, and end time of the last session
    SELECT fecha, hora_inicio, hora_fin INTO new_session_date, new_session_start_time, new_session_end_time
    FROM sesiones
    WHERE idSesion = (	SELECT MAX(idSesion) 
						FROM sesiones 
                        WHERE fecha >= (
										SELECT fecha 
										FROM sesiones 
                                        WHERE idSesion = session_id) 
                                        AND idGrupo = new_session_group
                                        )
    ORDER BY fecha DESC
    LIMIT 1;

    -- The content of the last session will be saved in a new session created one week after the last one
    SET new_session_date = DATE_ADD(new_session_date, INTERVAL 1 WEEK);
    
    -- Obtain the length of the loop
    SELECT MAX(temp_index) INTO max_id FROM temp_sesiones;
    
    -- Move the content to the following session
    SET i = 1;
    WHILE i <= max_id DO
        -- Update the following session with the content from the previous session
        UPDATE sesiones AS s1
        JOIN temp_sesiones AS s2 
        ON s1.idSesion = s2.idSesion
        SET s1.notas = aux_notas, s1.deberes = aux_deberes
        WHERE s2.temp_index = i + 1;
        
        -- The last time a new session is created
        IF i = max_id THEN
			INSERT INTO sesiones (`fecha`, `hora_inicio`, `hora_fin`, `idGrupo`, `notas`, `deberes`, `email`) 
            VALUES (new_session_date, new_session_start_time, new_session_end_time, new_session_group,  aux_notas, aux_deberes, new_session_mail);
        END IF;
        
		SET aux_notas = (SELECT notas FROM temp_sesiones WHERE temp_index = i + 1);
        SET aux_deberes = (SELECT deberes FROM temp_sesiones WHERE temp_index = i + 1);
        
        SET i = i + 1;
    END WHILE;
    
    -- Delete the cancelled session
    DELETE FROM sesiones WHERE idSesion = session_id;
    
    -- Drop the temporary table
    DROP TEMPORARY TABLE IF EXISTS temp_sesiones;

END //

DELIMITER ;

DELIMITER //
CREATE PROCEDURE `create_regular_sessions`(
  IN start_time TIME,
  IN end_time TIME,
  IN group_id INT,
  IN email_val VARCHAR(200),
  IN end_date DATE,
  IN current_date_param DATE
)
BEGIN  
	DECLARE var_group_name VARCHAR(100); 
	-- Calculate the date difference
	DECLARE diff INT;
	SET diff = DATEDIFF(end_date, current_date_param);
  
-- Search the group name
  SET var_group_name = (SELECT g.nombre FROM grupos as g WHERE idGrupo = group_id);
  
  -- Create temporary table to save new sessions to replicate creation in Google Calendar
  CREATE TEMPORARY TABLE new_sessions(
	date_new DATE,
    start_time_new TIME,
    end_time_new TIME,
    group_name VARCHAR(100)
  );
  
  -- While there is date difference
  WHILE diff >= 0 DO
    -- Insert new session
	INSERT INTO sesiones (fecha, hora_inicio, hora_fin, idGrupo, notas, deberes, email)
	VALUES (current_date_param, start_time, end_time, group_id, NULL, NULL, email_val);
    
    -- Save new sessions in temporary table
    INSERT INTO new_sessions (date_new, start_time_new, end_time_new, group_name)
    VALUES (current_date_param, start_time, end_time, var_group_name);
    
    -- Sum one week to the date
    SET current_date_param = ADDDATE(current_date_param, INTERVAL 7 DAY);
    SET diff = diff - 7;
  END WHILE;
  
  -- Return new sessions as a result for create sessions in Google Calendar
  SELECT * FROM new_sessions;
  
  -- Delete temporary table 
  DROP TEMPORARY TABLE new_sessions;
END//

DELIMITER ;