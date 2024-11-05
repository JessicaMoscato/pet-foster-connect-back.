import Joi from 'joi';

export const createSchema = Joi.object({
    address: Joi.string().required(),
    postal_code: Joi.string().max(5).required(),
    city: Joi.string().required(),
    // 0 => premier chiffre obligatoirelment,
    // [1-9] => deuxième chiffre entre 1 et 9 obligatoirement,
    // [0-9]{8} => le reste des 8 chiffres sera compris entre 0 et 9
    phone: Joi.string().pattern(/^0[1-9][0-9]{8}$/, 'Merci de renseigner un numéro de téléphone français').required(),
    number_of_children: Joi.number().integer().required(),
    number_of_animals: Joi.number().integer().required(),
    garden: Joi.boolean().required(),
    description: Joi.string(),
    profile_photo: Joi.string(),
    id_user: Joi.number().integer().required()
});

export const patchSchema = Joi.object({
    address: Joi.string(),
    postal_code: Joi.string().max(5),
    city: Joi.string(),
    phone: Joi.string().pattern(/^0[1-9][0-9]{8}$/, 'Merci de renseigner un numéro de téléphone français'),
    number_of_children: Joi.number().integer(),
    number_of_animals: Joi.number().integer(),
    garden: Joi.boolean(),
    description: Joi.string(),
    profile_photo: Joi.string(),
    id_user: Joi.number().integer()
});