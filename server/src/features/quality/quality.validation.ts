// user.validation.ts
import * as Joi from 'joi';

export const createQualitySchema = Joi.object({
  daerah: Joi.string().required(),
  value: Joi.number().integer().required().min(0).max(10).required(),
});

export const updateQualitySchema = Joi.object({
    daerah: Joi.string(),
    value: Joi.number().integer().min(0).max(10)
})