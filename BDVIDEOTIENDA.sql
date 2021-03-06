USE [master]
GO
/****** Object:  Database [videotienda]    Script Date: 22/02/2021 5:49:09 PM ******/
CREATE DATABASE [videotienda]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'videotienda', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\videotienda.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'videotienda_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\videotienda_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [videotienda] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [videotienda].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [videotienda] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [videotienda] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [videotienda] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [videotienda] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [videotienda] SET ARITHABORT OFF 
GO
ALTER DATABASE [videotienda] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [videotienda] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [videotienda] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [videotienda] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [videotienda] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [videotienda] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [videotienda] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [videotienda] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [videotienda] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [videotienda] SET  ENABLE_BROKER 
GO
ALTER DATABASE [videotienda] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [videotienda] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [videotienda] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [videotienda] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [videotienda] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [videotienda] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [videotienda] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [videotienda] SET RECOVERY FULL 
GO
ALTER DATABASE [videotienda] SET  MULTI_USER 
GO
ALTER DATABASE [videotienda] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [videotienda] SET DB_CHAINING OFF 
GO
ALTER DATABASE [videotienda] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [videotienda] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [videotienda] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [videotienda] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'videotienda', N'ON'
GO
ALTER DATABASE [videotienda] SET QUERY_STORE = OFF
GO
USE [videotienda]
GO
/****** Object:  Table [dbo].[pelicula]    Script Date: 22/02/2021 5:49:09 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[pelicula](
	[idpelicula] [int] IDENTITY(1,1) NOT NULL,
	[titulo] [varchar](100) NOT NULL,
	[descripcion] [varchar](255) NOT NULL,
	[actores] [varchar](500) NOT NULL,
	[director] [varchar](150) NOT NULL,
	[costoalquiler] [int] NOT NULL,
	[cantidad] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[idpelicula] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[reserva]    Script Date: 22/02/2021 5:49:09 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[reserva](
	[idreserva] [int] IDENTITY(1,1) NOT NULL,
	[idcliente] [int] NOT NULL,
	[idpelicula] [int] NOT NULL,
	[fecha] [datetime] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[idreserva] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[usuario]    Script Date: 22/02/2021 5:49:09 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[usuario](
	[idusuario] [int] IDENTITY(1,1) NOT NULL,
	[nombres] [varchar](255) NOT NULL,
	[email] [varchar](255) NOT NULL,
	[contrasena] [varchar](500) NOT NULL,
	[perfil] [varchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[idusuario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
USE [master]
GO
ALTER DATABASE [videotienda] SET  READ_WRITE 
GO
