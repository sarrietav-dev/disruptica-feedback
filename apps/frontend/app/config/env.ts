import * as z from "zod";

/**
 * Creates and validates the environment configuration.
 *
 * This function uses the `zod` library to define a schema for the environment variables,
 * validates the variables against this schema, and transforms them as needed.
 *
 * The expected environment variables are:
 * - `API_URL`: A required string representing the API URL.
 * - `APP_URL`: An optional string representing the application URL. Defaults to "http://localhost:3000".
 *
 * The function reads the environment variables from `import.meta.env`, filters out those that start with `VITE_APP_`,
 * and removes this prefix before validation.
 *
 * If the validation fails, an error is thrown with details about the missing or invalid variables.
 *
 * @returns {Record<string, any>} The validated and transformed environment variables.
 * @throws {Error} If the environment variables are missing or invalid.
 */
const createEnv = () => {
  const EnvSchema = z.object({
    API_URL: z.string().default(""),
    APP_URL: z.string().optional().default("http://localhost:3000"),
  });

  const envVars = Object.entries(import.meta.env).reduce<
    Record<string, string>
  >((acc, curr) => {
    const [key, value] = curr;
    if (key.startsWith("VITE_APP_")) {
      acc[key.replace("VITE_APP_", "")] = value;
    }
    return acc;
  }, {});

  const parsedEnv = EnvSchema.safeParse(envVars);

  if (!parsedEnv.success) {
    throw new Error(
      `Invalid env provided.
The following variables are missing or invalid:
${Object.entries(parsedEnv.error.flatten().fieldErrors)
  .map(([k, v]) => `- ${k}: ${v}`)
  .join("\n")}
`,
    );
  }

  return parsedEnv.data;
};

export const env = createEnv();
