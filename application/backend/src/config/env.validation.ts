import * as Joi from 'joi';

// Mejor validamos los datos de entorno con Joi, para que si hay algún error al iniciar la app, se vea claramente en la consola
export const envValidationSchema = Joi.object({
  DATA_TYPE: Joi.string().valid('DB', 'FS').required(),
  FS_FOLDER: Joi.string().when('DATA_TYPE', {
    is: 'FS',
    then: Joi.required(),
    otherwise: Joi.optional(),
  }),
});
