import { Connection, createConnection, getConnectionOptions } from "typeorm";

export default async (
  host = "ep-sweet-cloud-47225962-pooler.us-east-1.postgres.vercel-storage.com",
): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      host,
      database: defaultOptions.database,
    }),
  );
};
