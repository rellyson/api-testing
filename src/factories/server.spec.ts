import { Router } from "express";
import createServer from "./server";

describe("Server factory when imported", () => {
  it("Should have start and stop methods", () => {
    const mockedRouter = Router();
    const server = createServer(mockedRouter);

    expect(server).toHaveProperty("start");
    expect(server).toHaveProperty("stop");
  });

  it("Should not throw", () => {
    const mockedRouter = Router();
    const server = createServer(mockedRouter);

    expect(server).toHaveProperty("start");
    expect(server).toHaveProperty("stop");

    expect(() => {
      server.start();
    }).not.toThrow();

    server.stop();
  });
});
