import { User, Association, Family } from "../models/index.js";
import sequelize from '../models/client.js';
import HttpError from '../middlewares/httperror.js';

export const userController = {
    createUser: async (req, res) => {
        const userData = req.body;
        const options = {};

        if (userData.association) {
            options.include = [
                'association'
                // { association: 'association' }
                // { association: Association, as: 'association' }
            ];
        }
        else if (userData.family) {
            options.include = [
                'family'
                // { association: 'family' }
                // { association: Family, as: 'family' }
            ];
        }
        else {
            throw new HttpError(400, 'Association or Family is required');
        }

        const newUser = await User.create(userData, option);
        res.status(201).json(newUser);
    },

    patchUser: async (req, res) => {
        const userId = req.params.id;
        
        const user = await User.findByPk(userId, {
            include: [
                'association',
                'family'
            ]
        });

        if (!user) {
            throw new HttpError(404, 'User not found');
        }

        const transaction = await sequelize.transaction();

        try {

            const association = await user.getAssociation();
            if (association) {
                // mise à jour des données de l'association du user
                const associationData = {
                    ...association,
                    ...req.body.association,
                    id: association.id
                };
    
                association.update(associationData);
            }
    
            // refaire la même chose pour Family
            const family = await user.getFamily();
            if (family) {
                // mise à jour des données de l'family du user
                const familyData = {
                    ...family,
                    ...req.body.family,
                    id: family.id
                };
    
                family.update(familyData);
            }
    
            // faire la mise à jour sur le User
            if (user) {
                // mise à jour des données de l'association du user
                const userData = {
                    ...user,
                    ...req.body.user,
                    id: user.id
                };
    
                user.update(userData);
            }


            // on valide toutes les modifications en BDD
            await transaction.commit();

        } catch (error) {
            await transaction.rollback();
            throw new HttpError(500, 'Error while updating user');
        }

    },

    deleteUser: async (req, res) => {
        const userId = req.params.id;
        const selectUser = await User.findByPk(userId);

        if(!selectUser){
            throw new HttpError(404, "User not found")
        }

        await selectUser.destroy();
        res.status(204).end();
    },
};