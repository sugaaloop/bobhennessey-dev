import { z } from 'zod';

export const AppConfigSchema = z.object({
  version: z.string(),
  closeDelay: z.number(),
  listen: z.object({
    host: z.string(),
    port: z.number()
  })
});
export type AppConfig = z.infer<typeof AppConfigSchema>;
