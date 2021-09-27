import { aperture } from "https://deno.land/x/fae@v1.0.0/aperture.ts";

export class Sentence {
  #text: string;
  #n: number;

  constructor(text: string, n: number = 2) {
    this.#text = text;
    this.#n = n;
  }

  tokenize(text: string = this.#text): string[] {
    return [...Array(text.length)].map((_, i) => text.charAt(i));
  }

  nGram(n: number = this.#n, tokens: string[] = this.tokenize()): string[][] {
    return aperture(n, tokens);
  }

  append(chars: string) {
    this.#text += chars;
  }

  appendingPrimes(
    n: number = this.#n,
    tokens: string[] = this.tokenize()
  ): string[] {
    return tokens.slice(-n);
  }

  prepend(chars: string) {
    this.#text = chars + this.#text;
  }

  prependingPrimes(
    n: number = this.#n,
    tokens: string[] = this.tokenize()
  ): string[] {
    return tokens.slice(0, n);
  }

  toString(): string {
    return this.#text;
  }
}
