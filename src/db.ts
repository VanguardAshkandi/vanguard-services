import { createConnection, getConnectionOptions } from "typeorm";

export async function init() {
  // Will try to use ormconfig.json, if present, or environment
  // ormconfig will not be included in deployed builds, expects env
  const connectionOptions = await getConnectionOptions();

  // Local build needs a different entities path
  if(process.env.TYPEORM_ENTITIES) {
    Object.assign(connectionOptions, { entities:[process.env.TYPEORM_ENTITIES.trim()] });
  }

  const connection = await createConnection(connectionOptions);
}