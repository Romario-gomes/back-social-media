import { Connection, createConnection, getConnectionOptions } from "typeorm";

export default async (
  host = "containers-us-west-76.railway.app",
): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      host,
      database: defaultOptions.database,
    }),
  );
};
