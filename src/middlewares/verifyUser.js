import {Family} from "../models/index.js";

export function verifyUser () {
    return async function (req, res, next) {
        const familyId = req.params.id
        const family = await Family.findByPk(familyId)
        const familyUser = await family.getUser();
        if (familyUser.id !== req.user.id) {
            return res.status(403).json({
                error: "Accès interdit: Vous n'etes pas habilité"
            });
        }
        next();
    };
};