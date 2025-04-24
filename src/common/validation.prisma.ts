import * as Joi from "joi";

export const validationSchema = Joi.object({
  BACKEND_ENV: Joi.string().required(),
  SERVER_PORT: Joi.number().required(),
  DATABASE_URL: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  EMAIL_USER: Joi.string().email(),
  EMAIL_PASS: Joi.string().required(),
});
