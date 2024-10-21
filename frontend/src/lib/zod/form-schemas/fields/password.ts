import { z } from 'zod'
import { formErrors } from '../form-errors'

export const password = z.string().min(1, formErrors.required).min(6, formErrors.password)
