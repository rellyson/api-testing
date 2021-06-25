import fetch from "node-fetch";

export class TranslatorService {
  /**
   * Returns a translated text.
   *
   * @param translateFrom - Language to translate text from.
   * @param translateTo - Language to translate text to.
   * @param text - The text to be translated.
   * @returns An object containing the translations.
   *
   */
  translate = async (
    translateFrom: string,
    translateTo: string,
    text: string
  ) => {
    const response =
      await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${translateFrom}
        &tl=${translateTo}&dt=t&q=${encodeURI(text)}`).catch((error) => {
        throw Error;
      });

    const translationBody = await response.json();
    
    const translatedResponse = {
      translateFrom,
      translateTo,
      originalText: String(translationBody[0][0][1]),
      translatedText: String(translationBody[0][0][0]),
    };

    return translatedResponse;
  };
}
