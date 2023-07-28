import { Connection, createConnection, getConnectionOptions } from "typeorm";

export default async (
  host = "dpg-cj21sbh5rnuukffomsc0-a",
): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      host,
      database: defaultOptions.database,
    }),
  );
};
