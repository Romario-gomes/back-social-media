import { Connection, createConnection, getConnectionOptions } from "typeorm";

export default async (
  host = "dpg-civrfek07spr6taa2t0g-a",
): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      host,
      database: defaultOptions.database,
    }),
  );
};
