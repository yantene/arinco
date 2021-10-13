export class SpecialToken {
  #type: string;

  constructor(type: string) {
    this.#type = type;
  }

  static #beginOfSentence: SpecialToken;

  static getBeginOfSentence(): SpecialToken {
    if (!SpecialToken.#beginOfSentence) {
      SpecialToken.#beginOfSentence = new SpecialToken("BEGIN OF SENTENCE");
    }

    return SpecialToken.#beginOfSentence;
  }

  isBeginOfSentence() {
    return this === SpecialToken.getBeginOfSentence();
  }

  static #endOfSentence: SpecialToken;

  static getEndOfSentence(): SpecialToken {
    if (!SpecialToken.#endOfSentence) {
      SpecialToken.#endOfSentence = new SpecialToken("END OF SENTENCE");
    }

    return SpecialToken.#endOfSentence;
  }

  isEndOfSentence() {
    return this === SpecialToken.getEndOfSentence();
  }
}

export const BeginOfSentence = SpecialToken.getBeginOfSentence();
export const EndOfSentence = SpecialToken.getEndOfSentence();
