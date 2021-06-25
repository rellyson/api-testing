import createDatabase from "./database";

jest.mock("sqlite3", () => {
  const actualDatabase = jest.requireActual("sqlite3");
  return {
    ...actualDatabase,
    Database: jest.fn().mockImplementation(() => {
      return {
        run: () => {
          return jest.fn();
        },
        query: () => {
          return jest.fn();
        },
      };
    }),
  };
});

jest.mock("pg", () => {
  const actualDatabase = jest.requireActual("pg");
  return {
    ...actualDatabase,
    Client: jest.fn().mockImplementation(() => {
      return {
        connect: () => {
          return Promise.resolve(jest.fn());
        },
        query: () => {
          return jest.fn();
        },
      };
    }),
  };
});

describe("When createDatabase is imported using sqlite adapter", () => {
  it("should have connect and disconnect methods", () => {
    const database = createDatabase("sqlite", "testing");

    expect(database).toHaveProperty("connect");
    expect(database).toHaveProperty("disconnect");
  });

  it("should have runQuery method", () => {
    const database = createDatabase("sqlite", "testing");

    expect(database).toHaveProperty("runQuery");
  });

  it("should not throw when calling connect method", () => {
    const database = createDatabase("sqlite", "testing");

    expect(async () => {
      await database.connect();
    }).not.toThrow();
  });

  it("should execute a query succesfully", async () => {
    const database = createDatabase("sqlite", "testing");
    await database.connect();

    expect(() => {
      database.runQuery("select 1");
    }).not.toThrow();
  });

  it("should end the database connection succesfully", () => {
    const database = createDatabase("sqlite", "testing");

    expect(async () => {
      await database.disconnect();
    }).not.toThrow();
  });
});

describe("When createDatabase is imported using postgres adapter", () => {
  it("should have connect and disconnect methods", () => {
    const database = createDatabase("postgres", "testing");

    expect(database).toHaveProperty("connect");
    expect(database).toHaveProperty("disconnect");
  });

  it("should have runQuery method", () => {
    const database = createDatabase("postgres", "testing");

    expect(database).toHaveProperty("runQuery");
  });

  it("should not throw when calling connect method", () => {
    const database = createDatabase("postgres", "testing");

    expect(async () => {
      await database.connect();
    }).not.toThrow();
  });

  it("should execute a query succesfully", async () => {
    const database = createDatabase("postgres", "testing");
    await database.connect();

    expect(() => {
      database.runQuery("select 1");
    }).not.toThrow();
  });

  it("should end the database connection succesfully", () => {
    const database = createDatabase("postgres", "testing");

    expect(async () => {
      await database.disconnect();
    }).not.toThrow();
  });
});
