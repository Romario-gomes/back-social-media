import {
  Connection,
  createConnection,
  getConnection,
  getConnectionOptions,
} from "typeorm";

export default async (
  host = "containers-us-west-76.railway.app",
): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();
  const connection = getConnection();
  if (connection.isConnected) {
    console.log("Conectado com sucesso!");
  } else {
    console.log("Falha ao conectar ao banco de dados.");
  }

  return createConnection(
    Object.assign(defaultOptions, {
      host,
      database: defaultOptions.database,
    }),
  );
};
