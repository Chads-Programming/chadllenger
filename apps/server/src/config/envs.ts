import 'dotenv/config';

import z from 'zod';

const PortSchema = z
  .string()
  .refine(
    (port) => Number.parseInt(port) > 0 && Number.parseInt(port) < 65536,
    'Invalid port number',
  );

const NumberSchema = z
  .string()
  .refine((number) => Number.parseInt(number) > 0, 'Invalid number');

const envSchema = z.object({
  PORT: PortSchema,
  REDIS_HOST: z.string(),
  REDIS_PASSWORD: z.string(),
  REDIS_PORT: PortSchema,
  CHALLENGE_TTL: NumberSchema,
  PREPARING_CHALLENGE_TTL: NumberSchema,
  QUEST_TTL: NumberSchema,
  NEXT_QUEST_TTL: NumberSchema,
  FINISH_CHALLENGE_TIME_QUEUE_TIME_MILISECONDS: NumberSchema,
  LOBBY_TTL: z.string(),
  CLIENT_URL: z.string().url(),
  OPENAI_API_KEY: z.string().min(10),
  OPENAI_MODEL: z.string().default('gpt-4o-mini'),
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
  QUEST_TTL: envVars.QUEST_TTL,
  FINISH_CHALLENGE_TIME_QUEUE_TIME_MILISECONDS:
    envVars.FINISH_CHALLENGE_TIME_QUEUE_TIME_MILISECONDS,
  CLIENT_URL: envVars.CLIENT_URL,
  LOBBY_TTL: envVars.LOBBY_TTL,
  OPENAI_MODEL: envVars.OPENAI_MODEL,
  OPENAI_API_KEY: envVars.OPENAI_API_KEY,
  NEXT_QUEST_TTL: envVars.NEXT_QUEST_TTL,
  PREPARING_CHALLENGE_TTL: envVars.PREPARING_CHALLENGE_TTL,
} as EnvVars;
