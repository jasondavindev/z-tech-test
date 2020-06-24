import { Connection, DeleteResult } from 'typeorm';

export default function cleanTables(
  connection: Connection,
  entities: Function[]
): Promise<DeleteResult[]> {
  return Promise.all(entities.map((entity) => connection.getRepository(entity).delete({})));
}
