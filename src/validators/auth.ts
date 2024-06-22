import { z } from "zod";

const adminCredentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
});

export type TAdminCredentials = z.infer<typeof adminCredentialsSchema>;

export default adminCredentialsSchema;
