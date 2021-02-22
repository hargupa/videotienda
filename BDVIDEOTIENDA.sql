DROP DATABASE IF EXISTS videotienda;
CREATE DATABASE videotienda;
USE videotienda;
 
CREATE TABLE pelicula (
	idpelicula int NOT NULL IDENTITY(1,1) PRIMARY KEY,
	titulo	varchar(100) NOT NULL,
	descripcion varchar(255) NOT NULL,
	actores varchar(500) NOT NULL,
	director varchar(150) NOT NULL,
	costoalquiler int NOT NULL,
	cantidad int NOT NULL

);


CREATE TABLE reserva(
	idreserva int NOT NULL IDENTITY(1,1) PRIMARY KEY,
	idcliente int not null , 
	idpelicula int not null , 
	fecha datetime not null
);

CREATE TABLE usuario(
	idusuario int NOT NULL IDENTITY(1,1) PRIMARY KEY,
	nombres varchar (255) not null,
	email varchar(255) not null,
	contraseña varchar(500) not null,
	perfil varchar(50) NOT null

);