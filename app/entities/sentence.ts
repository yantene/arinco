import { aperture } from "https://deno.land/x/fae@v1.0.0/aperture.ts";
import { zip } from "https://deno.land/x/fae@v1.0.0/zip.ts";
import {
  BeginOfSentence,
  EndOfSentence,
  SpecialToken,
} from "./specialToken.ts";

type Token = string | SpecialToken;

export class Sentence {
  #tokens: Token[];
  #n: number;

  constructor(
    tokensOrText: Token[] | string,
    n: number = 2,
    prependBOS: boolean = false,
    appendEOS: boolean = false,
  ) {
    this.#tokens = [
      prependBOS ? BeginOfSentence : [],
      typeof tokensOrText === "string"
        ? Sentence.tokenize(tokensOrText)
        : tokensOrText,
      appendEOS ? EndOfSentence : [],
    ].flatMap((t) => t);
    this.#n = n;
  }

  /**
   * 1文字を1トークンとして分割する。
   * @param text トークン化対象の文字列
   * @returns トークンの配列
   */
  static tokenize(text: string): string[] {
    return [...Array(text.length)].map((_, i) => text.charAt(i));
  }

  /**
   * n-gram を生成する。
   * @param n
   * @param tokens
   * @returns 生成した n-gram。
   */
  nGram(n: number = this.#n, tokens: Token[] = this.#tokens): Token[][] {
    return aperture(n, tokens);
  }

  /**
   * n-gram と後続する 1 トークンの配列を返す。
   * @param n
   * @param tokens
   * @returns n-gram と後続する 1 トークンの配列
   */
  nGramWithFollowingToken(
    n: number = this.#n,
    tokens: Token[] = this.#tokens,
  ): [Token[], Token][] {
    const nGrams = this.nGram(n, tokens).slice(0, tokens.length - n);
    const followingTokens = tokens.slice(-(tokens.length - n));

    return zip(nGrams, followingTokens);
  }

  /**
   * 末尾にトークンを追加する際の先行するトークン系列の n-gram を返す。
   * @param n
   * @param tokens
   * @returns 先行するトークン系列
   */
  appendingPrimes(
    n: number = this.#n,
    tokens: Token[] = this.#tokens,
  ): Token[] {
    return tokens.slice(-n);
  }

  /**
   * 先頭にトークンを追加する際の後続するトークン系列の n-gram を返す。
   * @param n
   * @param tokens
   * @returns 後続するトークン系列
   */
  prependingPrimes(
    n: number = this.#n,
    tokens: Token[] = this.#tokens,
  ): Token[] {
    return tokens.slice(0, n);
  }

  /**
   * 末尾にトークン token を追加した Sentence インスタンスを返す。
   * @param token
   * @returns 末尾にトークン token を追加した Sentence インスタンス
   */
  append(token: Token): Sentence {
    return new Sentence(this.#tokens.concat(token), this.#n);
  }

  /**
   * 末尾に EOS トークンを追加した Sentence インスタンスを返す。
   * @returns 末尾に EOS トークンを追加した Sentence インスタンス
   */
  appendEOS(): Sentence {
    return this.append(EndOfSentence);
  }

  /**
   * 先頭にトークン token を追加した Sentence インスタンスを返す。
   * @param token
   * @returns 先頭にトークン token を追加した Sentence インスタンス
   */
  prepend(token: Token) {
    return new Sentence([token].concat(this.#tokens), this.#n);
  }

  /**
   * 先頭に BOS トークンを追加した Sentence インスタンスを返す。
   * @returns 先頭に BOS トークンを追加した Sentence インスタンス
   */
  prependBOS(): Sentence {
    return this.prepend(BeginOfSentence);
  }

  toString(): string {
    return this.#tokens.filter((token) => typeof token === "string").join("");
  }
}
