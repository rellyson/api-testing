import { Database, RunResult } from "sqlite3";
import { Client, PoolClient, QueryResult } from "pg";

const createDatabase = (
  type: "sqlite" | "postgres",
  connectionString: string
) => {
  let database: Database | Client;

  const connect = async () => {
    console.log("[database] Connecting to database...");

    if (type === "sqlite") {
      database = new Database(connectionString);
    } else {
      database = new Client({
        connectionString,
      });

      await database.connect();
    }

    console.log("[database] Database connected.");

    return database;
  };

  const disconnect = async () => {
    console.log("[database] Disconnecting database...");

    if (database instanceof Database) {
      database.close();
    }

    console.log("[database] Database connection closed.");
  };

  const runQuery = (query: string, params?: Array<string | number>) => {
    let queryResult: Record<any, any>;

    if (database instanceof Database) {
      database.run(query, params, (result: RunResult, error: Error) => {
        if (error) {
          throw Error;
        }
        queryResult = result;
      });
    } else {
      database.query(query, params, (error: Error, result: QueryResult) => {
        if (error) {
          throw error;
        }

        queryResult = result.rows;
      });
    }

    return queryResult;
  };

  return {
    connect,
    disconnect,
    runQuery,
  };
};

export default createDatabase;
