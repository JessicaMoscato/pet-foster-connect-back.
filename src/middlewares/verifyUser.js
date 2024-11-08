import {Family} from "../models/index.js";

export function verifyUser () {
    return async function (req, res, next) {
        const familyUser = await family.getUser();
        console.log(familyUser);
        if (familyUser !== req.user.id) {
            return res.status(403).json({
                error: "Accès interdit: Vous n'etes pas habilité"
            });
        }
        next();
    };
};