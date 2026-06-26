import { z } from 'zod'

export const loginSchema = z.object({
  email: z.email('Digite um email válido'),
  password: z.string().min(6, 'A senha deve possuir pelo menos 6 caracteres'),
})
