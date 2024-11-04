import Joi from 'joi';

export const createSchema = Joi.object({
    name: Joi.string().required(),
    species: Joi.string().required(),
    breed: Joi.string().required(),
    gender: Joi.string().valid('M', 'F').required(),
    age: Joi.number().integer().required(),
    size: Joi.string().required(),
    description: Joi.string(),
    profile_photo: Joi.string(),
    photo1: Joi.string(),
    photo2: Joi.string(),
    photo3: Joi.string(),
    id_family: Joi.number().integer(),
    id_association: Joi.number().integer().required()
});
