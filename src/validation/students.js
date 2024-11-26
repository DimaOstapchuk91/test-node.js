import Joi from 'joi';

export const createStudentSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  age: Joi.number().integer().min(6).max(16).required(),
  gender: Joi.string().valid('male', 'female', 'other').required(),
  avgMark: Joi.number().min(2).max(12).required(),
  onDuty: Joi.boolean(),
});

export const updateStudentSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string().email(),
  age: Joi.number().integer().min(6).max(16),
  gender: Joi.string().valid('male', 'female', 'other'),
  avgMark: Joi.number().min(2).max(12),
  onDuty: Joi.boolean(),
});

// * як додати сповіщення при неправильній валідації
//   name: Joi.string().min(3).max(30).required().messages({
//     'string.base': 'Username should be a string', // Кастомізація повідомлення для типу "string"
//     'string.min': 'Username should have at least {#limit} characters',
//     'string.max': 'Username should have at most {#limit} characters',
//     'any.required': 'Username is required',
//   })

// В цьому прикладі ми використовуємо метод .messages() для кожного правила в схемі, щоб визначити свої власні повідомлення про помилки для різних умов. Тобто, правило string.base стосується .string(), string.min стосується .min(), що слідує за .string() тощо

// Важливо вказати { abortEarly: false } при виклику методу validate, щоб отримати всі можливі помилки валідації, а не першу з них:

// const validationResult = createStudentSchema.validate(userData, {
//   abortEarly: false,
// });