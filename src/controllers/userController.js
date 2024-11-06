import { User, Family, Association} from "../models/index.js";
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



  //! Modifier un utilisateur
  patchUser: async (req, res) => {
    const userId = req.params.id;
    const updateUser = req.body;

    const user = await User.findByPk(userId, {
      include: ["association", "family"], 
    });

    // Vérifiez si l'utilisateur existe
    if (!user) {
      throw new HttpError(404, "User not found");
    }

    // Normalisation des champs 
    if (updateUser.firstname) {
      updateUser.firstname = updateUser.firstname.trim(); // Retire les espaces
    }
    if (updateUser.lastname) {
      updateUser.lastname = updateUser.lastname.trim(); // Retire les espaces
    }

    await user.update(updateUser);

    if (updateUser.family) {
      const userFamily = await Family.findOne({
        where: {id_user: userId}
      });
      await userFamily.update(updateUser.family)
    }
    if (updateUser.association) {
      const userAssociation =await Association.findOne({
        where: {id_user: userId}
      });
      await userAssociation.update(updateUser.association)
    }

    const newUser = await User.findByPk(userId, {
      include: ["association", "family"]
    })
    // Met à jour les propriétés de l'utilisateur
    // Object.assign(user, req.body);

    // Sauvegarde l'utilisateur mis à jour
    // await user.save();

    res.status(200).json(newUser);
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
