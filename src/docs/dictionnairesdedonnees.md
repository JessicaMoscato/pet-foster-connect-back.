# ANIMAL

| Champ         | Type         | Spécificités                                          | Description                              |
| ------------- | ------------ | ----------------------------------------------------- | ---------------------------------------- |
| code_animal   | VARCHAR(42)  | PRIMARY KEY, NOT NULL                                 | Identifiant unique de l'animal           |
| name          | VARCHAR(50)  | NOT NULL                                              | Nom de l'animal                          |
| species       | VARCHAR(30)  | NOT NULL                                              | Espèce de l'animal                       |
| breed         | VARCHAR(50)  | NOT NULL                                              | Race de l'animal                         |
| gender        | CHAR(1)      | NOT NULL                                              | Sexe de l'animal (M/F)                   |
| age           | INT          | NOT NULL                                              | Âge de l'animal                          |
| size          | VARCHAR(30)  | NOT NULL                                              | Taille de l'animal (petit, moyen, grand) |
| description   | TEXT         |                                                       | Description détaillée de l'animal        |
| profile_photo | VARCHAR(255) |                                                       | Chemin vers la photo de profil           |
| photo1        | VARCHAR(255) |                                                       | Chemin vers la photo supplémentaire 1    |
| photo2        | VARCHAR(255) |                                                       | Chemin vers la photo supplémentaire 2    |
| photo3        | VARCHAR(255) |                                                       | Chemin vers la photo supplémentaire 3    |
| code_family   | ENTITY       | FOREIGN KEY, NULL                                     | Code famille de la table FAMILY          |
| code_asso     | ENTITY       | FOREIGN KEY, NOT NULL                                 | Code asso de la table ASSOCIATION        |
| created_at    | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP                             | Date de création                         |
| updated_at    | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Date de dernière mise à jour             |

## Relations

- **FAMILY** : Un animal peut être associé à une famille d'accueil via `code_family`, qui fait référence à `code_family` dans la table FAMILY (relation optionnelle).
- **ASSOCIATION** : Chaque animal est lié à une association via `code_asso`, qui fait référence à `code_asso` dans la table ASSOCIATION (relation obligatoire).

## ASSOCIATION

| Champ          | Type         | Spécificités                                          | Description                          |
| -------------- | ------------ | ----------------------------------------------------- | ------------------------------------ |
| code_asso      | INT          | PRIMARY KEY, NOT NULL, AUTO_INCREMENT                 | Identifiant de l'association         |
| rna_number     | VARCHAR(42)  | UNIQUE, NOT NULL                                      | Numéro RNA unique de l'association   |
| representative | VARCHAR(100) | NOT NULL                                              | Représentant de l'association        |
| address        | VARCHAR(255) | NOT NULL                                              | Adresse de l'association             |
| phone          | VARCHAR(15)  | NOT NULL                                              | Numéro de téléphone de l'association |
| description    | TEXT         | NULL                                                  | Description de l'association         |
| status         | VARCHAR(15)  | NOT NULL                                              | Statut de l'association              |
| profile_photo  | VARCHAR(255) | NULL                                                  | Chemin vers la photo de profil       |
| code_user      | ENTITY       | FOREIGN KEY, NOT NULL, UNIQUE                         | Code utilisateur de la table USER    |
| created_at     | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP                             | Date de création                     |
| updated_at     | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Date de dernière mise à jour         |

## Relations

- **USER** : Chaque association est liée à un utilisateur via `code_user`, qui fait référence à `code_user` dans la table USER.
- **ANIMAL** : Une association peut avoir plusieurs animaux. Cette relation est représentée par la clé étrangère `code_asso` dans la table ANIMAL.

## FAMILY

| Champ              | Type         | Spécificités                                          | Description                            |
| ------------------ | ------------ | ----------------------------------------------------- | -------------------------------------- |
| code_family        | INT          | PRIMARY KEY, NOT NULL                                 | Code unique de la famille              |
| address            | VARCHAR(255) | NOT NULL                                              | Adresse de la famille                  |
| phone              | VARCHAR(15)  | NOT NULL                                              | Numéro de téléphone de la famille      |
| number_of_children | INT          |                                                       | Nombre d'enfants dans la famille       |
| number_of_animals  | INT          |                                                       | Nombre d'animaux dans la famille       |
| garden             | BOOLEAN      | NOT NULL                                              | Indique si la famille a un jardin      |
| description        | TEXT         |                                                       | Description de la famille              |
| profile_photo      | VARCHAR(255) |                                                       | Chemin vers la photo de profil         |
| code_user          | ENTITY       | FOREIGN KEY, NOT NULL, UNIQUE                         | Code utilisateur de la table USER (FK) |
| created_at         | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP                             | Date de création                       |
| updated_at         | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Date de dernière mise à jour           |

### Relations

- **USER** : Chaque famille est liée à un utilisateur via `code_user`, qui fait référence à `code_user` dans la table USER.
- **ANIMAL** : Une famille peut être liée à plusieurs animaux. Cette relation est représentée par la clé étrangère `code_family` dans la table ANIMAL.

## USER

| Champ      | Type         | Spécificités                                          | Description                         |
| ---------- | ------------ | ----------------------------------------------------- | ----------------------------------- |
| code_user  | INT          | PRIMARY KEY, NOT NULL                                 | Identifiant unique de l'utilisateur |
| lastname   | VARCHAR(50)  | NOT NULL                                              | Nom de l'utilisateur                |
| firstname  | VARCHAR(50)  | NOT NULL                                              | Prénom de l'utilisateur             |
| email      | VARCHAR(100) | NOT NULL                                              | Adresse e-mail de l'utilisateur     |
| password   | VARCHAR(255) | NOT NULL                                              | Mot de passe hashé                  |
| role       | VARCHAR(20)  |                                                       | Rôle dans le système                |
| created_at | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP                             | Date de création                    |
| updated_at | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Date de dernière mise à jour        |

### Relations

- **ASSOCIATION** : Un utilisateur peut être associé à plusieurs associations via `code_user`, qui fait référence à `code_user` dans la table ASSOCIATION.
- **FAMILY** : Un utilisateur peut être associé à plusieurs familles via `code_user`, qui fait référence à `code_user` dans la table FAMILY.

## ASK (table de jointure entre ANIMAL et FAMILY)

| Champ       | Type        | Spécificités                                          | Description                  |
| ----------- | ----------- | ----------------------------------------------------- | ---------------------------- |
| code_family | INT         | PRIMARY KEY, FOREIGN KEY, NOT NULL                    | Identifiant de la famille    |
| code_animal | INT         | PRIMARY KEY, FOREIGN KEY, NOT NULL                    | Identifiant de l'animal      |
| status      | VARCHAR(15) | NOT NULL                                              | Statut de la demande         |
| created_at  | TIMESTAMP   | DEFAULT CURRENT_TIMESTAMP                             | Date de création             |
| updated_at  | TIMESTAMP   | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Date de dernière mise à jour |

### Relations

- **FAMILY** : Une demande peut être associée à une famille via `code_family`, qui fait référence à `code_family` dans la table FAMILY.
- **ANIMAL** : Une demande peut être associée à un animal via `code_animal`, qui fait référence à `code_animal` dans la table ANIMAL.
