import { User} from "../models/index.js";
import sequelize from "../models/client.js";
import HttpError from "../middlewares/httperror.js";

export const userController = {
  //! récupérer tous les utilisateurs
  getAllUsers: async (req, res) => {
    const users = await User.findAll({
      include: ["association", "family"],
    });
    res.status(200).json(users);
  },

  //! créer un nouvel utilisateur
  createUser: async (req, res) => {
    const userData = req.body;

    if (
      !userData.role ||
      (userData.role !== "family" && userData.role !== "association") // Vérifie si le rôle est spécifié
    ) {
      throw new HttpError(
        400,
        'Le rôle doit être soit "family" soit "association".'
      );
    }

    // Créer l'utilisateur sans inclure les relations pour l'instant
    const newUser = await User.create(userData);

    // Si nécessaire, vous pouvez ici établir des relations avec des associations ou familles
    // Exemple :
    // if (userData.associationId) {
    //     await newUser.setAssociation(userData.associationId);
    // }
    // else if (userData.familyId) {
    //     await newUser.setFamily(userData.familyId);
    // }

    res.status(201).json(newUser);
  },

  //! Modifier un utilisateur
  patchUser: async (req, res) => {
    const userId = req.params.id;
    const user = await User.findByPk(userId, {
      include: ["association", "family"], 
    });

    // Vérifiez si l'utilisateur existe
    if (!user) {
      throw new HttpError(404, "User not found");
    }

    // Normalisation des champs 
    if (req.body.firstname) {
      req.body.firstname = req.body.firstname.trim(); // Retire les espaces
    }
    if (req.body.lastname) {
      req.body.lastname = req.body.lastname.trim(); // Retire les espaces
    }

    // Met à jour les propriétés de l'utilisateur
    Object.assign(user, req.body);

    // Sauvegarde l'utilisateur mis à jour
    await user.save();

    res.status(200).json(user);
  },

  //! Supprimer un utilisateur
  deleteUser: async (req, res) => {
    const userId = req.params.id;
    const selectUser = await User.findByPk(userId);

    if (!selectUser) {
      throw new HttpError(404, "User not found");
    }

    await selectUser.destroy();
    res.status(204).end();
  },

  // !Transaction pour la mise à jour des données utilisateur et des relations
  updateUserWithRelations: async (req, res) => {
    // Ajout d'une fonction pour la transaction
    const userId = req.params.id;
    const user = await User.findByPk(userId, {
      include: ["association", "family"],
    });

    if (!user) {
      throw new HttpError(404, "User not found");
    }

    const transaction = await sequelize.transaction();

    try {
      const association = await user.getAssociation();
      if (association) {
        // Mise à jour des données de l'association du user
        const associationData = {
          ...association.get(), // Récupère les données de l'association
          ...req.body.association,
          id: association.id,
        };

        await association.update(associationData);
      }

      // refaire la même chose pour Family
      const family = await user.getFamily();
      if (family) {
        // Mise à jour des données de la famille du user
        const familyData = {
          ...family.get(), // Récupère les données de la famille
          ...req.body.family,
          id: family.id,
        };

        await family.update(familyData);
      }

      // Mise à jour sur le User
      const userData = {
        ...user.get(), // Récupère les données de l'utilisateur
        ...req.body.user,
        id: user.id,
      };

      await user.update(userData);

      // Valider toutes les modifications en BDD
      await transaction.commit();
      res.json(user);
    } catch (error) {
      await transaction.rollback();
      throw new HttpError(500, "Error while updating user");
    }
  },
};
