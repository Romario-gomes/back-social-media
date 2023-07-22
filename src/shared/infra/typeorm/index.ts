import { Connection, createConnection, getConnectionOptions } from "typeorm";

export default async (host = "social_1lk1"): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      host,
      database: defaultOptions.database,
    }),
  );
};
