import { z } from "zod";
import { formErrors } from "../form-errors";

export const genericString = z.string().min(1, formErrors.required);
