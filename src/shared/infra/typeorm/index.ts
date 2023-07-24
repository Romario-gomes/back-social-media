import { Connection, createConnection, getConnectionOptions } from "typeorm";

export default async (
  host = "dpg-ciu1gvh5rnuhcnsg1rog-a",
): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      host,
      database: defaultOptions.database,
    }),
  );
};
