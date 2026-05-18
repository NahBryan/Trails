const { z } = require("zod");

exports.loginSchema = z.object({
  body: z.object({
    input: z.string().email(),
    password: z.string().min(6)
  })
});

exports.registerSchema = z.object({
  body: z.object({
    institutionId: z.number(),
    email: z.string().min(8),
    password: z.string().min(8),
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    phone: z.string().optional()
  })
});