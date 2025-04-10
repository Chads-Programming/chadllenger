import 'dotenv/config';

import z from 'zod';

const PortSchema = z
  .string()
  .refine(
    (port) => Number.parseInt(port) > 0 && Number.parseInt(port) < 65536,
    'Invalid port number',
  );

const envSchema = z.object({
  PORT: PortSchema,
  REDIS_HOST: z.string(),
  REDIS_PASSWORD: z.string(),
  REDIS_PORT: PortSchema,
  CHALLENGE_TTL: z.string(),
});

export type EnvVars = z.infer<typeof envSchema>;

const { error, data } = envSchema.safeParse(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = data;

export const envs = {
  PORT: envVars.PORT,
  REDIS_HOST: envVars.REDIS_HOST,
  REDIS_PORT: envVars.REDIS_PORT,
  REDIS_PASSWORD: envVars.REDIS_PASSWORD,
  CHALLENGE_TTL: envVars.CHALLENGE_TTL,
} as EnvVars;
