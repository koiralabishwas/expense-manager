import { z } from "zod";

export const userSchema = z.object({
  name : z.string().min(1),
  email : z.string().min(6),
  password : z.string().min(6),
})