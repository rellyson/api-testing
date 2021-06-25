import { TranslatorService } from "./translator.service";

jest.mock("node-fetch", () =>
  jest.fn().mockImplementation(() => {
    return Promise.resolve({
      json: () =>
        Promise.resolve([
          [["Hello World!", "Olá mundo!", null, null, 10]],
          null,
          "pt",
          null,
          null,
          null,
          null,
          [],
        ]),
    });
  })
);

describe("When instantiating a new Translator service", () => {
  it("should have translate method", () => {
    const service = new TranslatorService();

    expect(service).toHaveProperty("translate");
  });

  it("should translate a given text to the specified language", async () => {
    const service = new TranslatorService();
    const translatedResponse = await service.translate(
      "pt",
      "en",
      "Olá mundo!"
    );

    expect(translatedResponse).toMatchObject({
      translateFrom: "pt",
      translateTo: "en",
      originalText: "Olá mundo!",
      translatedText: "Hello World!",
    });
  });
});
