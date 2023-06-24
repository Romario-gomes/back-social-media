import {
  Connection,
  createConnection,
  getConnection,
  getConnectionOptions,
} from "typeorm";

export default async (): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();
  console.log("Conections: ", defaultOptions);

  return createConnection(
    Object.assign(defaultOptions, {
      database: defaultOptions.database,
    }),
  );
};
