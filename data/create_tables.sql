DROP TABLE IF EXISTS animal;
DROP TABLE IF EXISTS association;
DROP TABLE IF EXISTS family;
DROP TABLE IF EXISTS "user";  
DROP TABLE IF EXISTS ask;

CREATE TABLE "user" (
  id          INT NOT NULL SERIAL PRIMARY KEY,  
  lastname    VARCHAR(50) NOT NULL,
  firstname   VARCHAR(50) NOT NULL,
  email        VARCHAR(100) NOT NULL,
  password     VARCHAR(255) NOT NULL,
  role         VARCHAR(20),
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP  
);

CREATE TABLE family (
  id                 INT NOT NULL SERIAL PRIMARY KEY,
  address            VARCHAR(255) NOT NULL,
  phone              VARCHAR(15) NOT NULL,
  number_of_children INT,
  number_of_animals  INT,
  garden             BOOLEAN NOT NULL,
  description        TEXT,
  profile_photo      VARCHAR(255),
  id_user            ENTITY FOREIGN KEY NOT NULL UNIQUE,  
  created_at         TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at         TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE association (
  id                 INT NOT NULL SERIAL PRIMARY KEY,
  rna_number         VARCHAR(42) UNIQUE NOT NULL,
  representative     VARCHAR(100) NOT NULL,
  address            VARCHAR(255) NOT NULL,
  phone              VARCHAR(15) NOT NULL,
  description        TEXT,
  status             VARCHAR(15) NOT NULL,
  profile_photo      VARCHAR(255),
  id_user            ENTITY FOREIGN KEY NOT NULL UNIQUE,  
  created_at         TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at         TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE animal (
  id                INT NOT NULL SERIAL PRIMARY KEY,
  name             VARCHAR(50) NOT NULL,
  species          VARCHAR(30) NOT NULL,
  breed            VARCHAR(50) NOT NULL,
  gender           CHAR(1) NOT NULL,
  age              INT NOT NULL,
  size             VARCHAR(30) NOT NULL,
  description      TEXT,
  profile_photo    VARCHAR(255),
  photo1           VARCHAR(255),
  photo2           VARCHAR(255),
  photo3           VARCHAR(255),
   id_family        ENTITY FOREIGN KEY NULL,    
  id_association   ENTITY FOREIGN KEY NOT NULL,  
  created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ask (
  id_family  INT PRIMARY KEY FOREIGN KEY NOT NULL,
  id_animal  INT PRIMARY KEY FOREIGN KEY NOT NULL,
  status       VARCHAR(15) NOT NULL,
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Fonction pour mettre à jour le timestamp
CREATE OR REPLACE FUNCTION update_timestamp() 
RETURNS TRIGGER AS $$ 
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END; 
$$ LANGUAGE plpgsql;

-- Triggers pour mettre à jour les timestamps
CREATE TRIGGER update_animal_timestamp
BEFORE UPDATE ON animal
FOR EACH ROW 
EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_association_timestamp
BEFORE UPDATE ON association
FOR EACH ROW 
EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_family_timestamp
BEFORE UPDATE ON family
FOR EACH ROW 
EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_user_timestamp
BEFORE UPDATE ON "user"
FOR EACH ROW 
EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_ask_timestamp
BEFORE UPDATE ON ask
FOR EACH ROW 
EXECUTE FUNCTION update_timestamp();
