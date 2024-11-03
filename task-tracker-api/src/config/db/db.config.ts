export interface DbConfig {
  type: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

export default (): {
  database: DbConfig;
} => {
  if (process.env.DB_HOST === undefined) {
    throw new Error("DB_HOST is not defined");
  }
  if (process.env.DB_USERNAME === undefined) {
    throw new Error("DB_USERNAME is not defined");
  }
  if (process.env.DB_PASSWORD === undefined) {
    throw new Error("DB_PASSWORD is not defined");
  }
  if (process.env.DB_NAME === undefined) {
    throw new Error("DB_NAME is not defined");
  }
  if (process.env.DB_PORT === undefined) {
    throw new Error("PORT is not defined");
  }
  const config = {
    database: {
      type: "postgres",
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
  };
  return config;
};
