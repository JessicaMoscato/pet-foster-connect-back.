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

    const transaction = await sequelize.transaction();

    try{
  
      const family = await user.getFamily();
      if (family) {
        // Mise à jour des données de la famille du user
        const familyData = {
          ...family.get(), // Récupère les données de la famille
          ...req.body.family,
          id: family.id,
        };
        await family.update(familyData)
      }

      const association = await user.getAssociation();
      if (association) {
        const associationData = {
          ...association.get(), // Récupère les données de l'association
          ...req.body.association,
          id: association.id,
        };
        await association.update(associationData)
      }
  
      const userData = {
        ...user.get(),
        ...req.body,
        id: user.id,
      };
      await user.update(userData);

      await transaction.commit();
  
      res.status(200).json(user);
    }
    catch(error){
      await transaction.rollback();
      throw new HttpError(500, "Error while updating user");
    }

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
};
