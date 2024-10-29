DROP TABLE IF EXISTS ask;
DROP TABLE IF EXISTS animal;
DROP TABLE IF EXISTS association;
DROP TABLE IF EXISTS family;
DROP TABLE IF EXISTS "user";

CREATE TABLE animal (
    code_animal VARCHAR(42) PRIMARY KEY NOT NULL,
    name VARCHAR(50) NOT NULL,
    species VARCHAR(30) NOT NULL,
    breed VARCHAR(50) NOT NULL,
    gender CHAR(1) NOT NULL,
    age INT NOT NULL,
    size VARCHAR(30) NOT NULL,
    description TEXT,
    profile_photo VARCHAR(255),
    photo1 VARCHAR(255),
    photo2 VARCHAR(255),
    photo3 VARCHAR(255),
    code_family INT,
    code_asso INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE association (
    code_asso SERIAL PRIMARY KEY,  -- Utilisation de SERIAL pour auto-incrémentation
    rna_number VARCHAR(42) UNIQUE NOT NULL,
    representative VARCHAR(100) NOT NULL,
    address VARCHAR(255) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    description TEXT,
    status VARCHAR(15) NOT NULL,
    profile_photo VARCHAR(255),
    code_user INT NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE family (
    code_family INT PRIMARY KEY NOT NULL,
    address VARCHAR(255) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    number_of_children INT,
    number_of_animals INT,
    garden BOOLEAN NOT NULL,
    description TEXT,
    profile_photo VARCHAR(255),
    code_user INT NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "user" (
    code_user SERIAL PRIMARY KEY,  -- Utilisation de SERIAL pour auto-incrémentation
    lastname VARCHAR(50) NOT NULL,
    firstname VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table de jointure entre ANIMAL et FAMILY
CREATE TABLE ask (
    code_family INT NOT NULL,
    code_animal INT NOT NULL,
    status VARCHAR(15) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (code_family, code_animal)
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
-- Création d'un trigger nommé 'update_animal_timestamp'
CREATE TRIGGER update_animal_timestamp
    -- Le trigger se déclenche avant chaque mise à jour de la table 'animal'
    BEFORE UPDATE ON animal
    -- Pour chaque ligne modifiée dans la table 'animal', exécute la fonction suivante
    FOR EACH ROW 
    -- Appelle la fonction 'update_timestamp' qui met à jour le champ 'updated_at'
    EXECUTE FUNCTION update_timestamp();


CREATE TRIGGER update_association_timestamp
BEFORE UPDATE ON association
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_family_timestamp
BEFORE UPDATE ON family
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_user_timestamp
BEFORE UPDATE ON "user"
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_ask_timestamp
BEFORE UPDATE ON ask
FOR EACH ROW EXECUTE FUNCTION update_timestamp();
