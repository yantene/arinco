import { assertEquals } from "https://deno.land/std@0.110.0/testing/asserts.ts";
import { Sentence } from "./sentence.ts";
import { BeginOfSentence, EndOfSentence } from "./specialToken.ts";

Deno.test(
  '#tokenize(): "おはござ" を渡すと ["お", "は", "ご", "ざ"] を返すこと',
  () => {
    const actual = Sentence.tokenize("おはござ");
    const expected = ["お", "は", "ご", "ざ"];

    assertEquals(actual, expected);
  },
);

Deno.test(
  '#nGram(): Sentence("おはござ", 2) は "おはござ" の bigram を返すこと',
  () => {
    const sent = new Sentence("おはござ", 2);

    const actual = sent.nGram();
    const expected = [
      ["お", "は"],
      ["は", "ご"],
      ["ご", "ざ"],
    ];

    assertEquals(actual, expected);
  },
);

Deno.test(
  '#nGram(): Sentence("おはござ", 1) は "おはござ" の unigram を返すこと',
  () => {
    const sent = new Sentence("おはござ", 1);

    const actual = sent.nGram();
    const expected = [["お"], ["は"], ["ご"], ["ざ"]];

    assertEquals(actual, expected);
  },
);

Deno.test(
  '#nGram(): Sentence("おはござ", 4) は "おはござ" の 4-gram を返すこと',
  () => {
    const sent = new Sentence("おはござ", 4);

    const actual = sent.nGram();
    const expected = [["お", "は", "ご", "ざ"]];

    assertEquals(actual, expected);
  },
);

Deno.test(
  '#nGramWithFollowingToken(): Sentence("おはござ", 2) は [[["お", "は"], "ご"], [["は", "ご"], "ざ"]] を返すこと',
  () => {
    const sent = new Sentence("おはござ", 2);

    const actual = sent.nGramWithFollowingToken();
    const expected = [
      [["お", "は"], "ご"],
      [["は", "ご"], "ざ"],
    ];

    assertEquals(actual, expected);
  },
);

Deno.test(
  '#nGramWithFollowingToken(): Sentence("おはござ", 1) は [[["お"], "は"], [["は"], "ご"], [["ご"], "ざ"]] を返すこと',
  () => {
    const sent = new Sentence("おはござ", 1);

    const actual = sent.nGramWithFollowingToken();
    const expected = [
      [["お"], "は"],
      [["は"], "ご"],
      [["ご"], "ざ"],
    ];

    assertEquals(actual, expected);
  },
);

Deno.test(
  '#nGramWithFollowingToken(): Sentence("おはござ", 5, true, true) は [[[BeginOfSentence, "お", "は", "ご", "ざ"], EndOfSentence]] を返すこと',
  () => {
    const sent = new Sentence("おはござ", 5, true, true);

    const actual = sent.nGramWithFollowingToken();
    const expected = [
      [[BeginOfSentence, "お", "は", "ご", "ざ"], EndOfSentence],
    ];

    assertEquals(actual, expected);
  },
);

Deno.test(
  '#appendingPrimes(): Sentence("おはござ", 2) は ["ご", "ざ"] を返すこと',
  () => {
    const sent = new Sentence("おはござ", 2);

    const actual = sent.appendingPrimes();
    const expected = ["ご", "ざ"];

    assertEquals(actual, expected);
  },
);

Deno.test(
  '#appendingPrimes(): Sentence("おはござ", 1) は ["ざ"] を返すこと',
  () => {
    const sent = new Sentence("おはござ", 1);

    const actual = sent.appendingPrimes();
    const expected = ["ざ"];

    assertEquals(actual, expected);
  },
);

Deno.test(
  '#appendingPrimes(): Sentence("おはござ", 4) は ["お", "は", "ご", "ざ"] を返すこと',
  () => {
    const sent = new Sentence("おはござ", 4);

    const actual = sent.appendingPrimes();
    const expected = ["お", "は", "ご", "ざ"];

    assertEquals(actual, expected);
  },
);

Deno.test(
  '#prependingPrimes(): Sentence("おはござ", 2) は ["お", "は"] を返すこと',
  () => {
    const sent = new Sentence("おはござ", 2);

    const actual = sent.prependingPrimes();
    const expected = ["お", "は"];

    assertEquals(actual, expected);
  },
);

Deno.test(
  '#prependingPrimes(): Sentence("おはござ", 1) は ["お"] を返すこと',
  () => {
    const sent = new Sentence("おはござ", 1);

    const actual = sent.prependingPrimes();
    const expected = ["お"];

    assertEquals(actual, expected);
  },
);

Deno.test(
  '#prependingPrimes(): Sentence("おはござ", 4) は ["お", "は", "ご", "ざ"] を返すこと',
  () => {
    const sent = new Sentence("おはござ", 4);

    const actual = sent.prependingPrimes();
    const expected = ["お", "は", "ご", "ざ"];

    assertEquals(actual, expected);
  },
);

Deno.test(
  '#append(): Sentence("おはご") に "ざ" を append すると Sentence("おはござ") になること',
  () => {
    const sent = new Sentence("おはご");

    const actual = sent.append("ざ");
    const expected = new Sentence("おはござ");

    assertEquals(actual, expected);
  },
);

Deno.test(
  '#appendEOS(): Sentence("おはござ") に #appendEOS() した後に #appendingPrimes() が ["ざ", EndOfString] になること',
  () => {
    const sent = new Sentence("おはござ");
    const appended = sent.appendEOS();

    const lastNGram = appended.appendingPrimes();
    const expected = ["ざ", EndOfSentence];

    assertEquals(lastNGram, expected);
  },
);

Deno.test(
  '#prepend(): Sentence("はござ") に "お" を prepend すると Sentence("おはござ") になること',
  () => {
    const sent = new Sentence("はござ");

    const actual = sent.prepend("お");
    const expected = new Sentence("おはござ");

    assertEquals(actual, expected);
  },
);

Deno.test(
  '#prependBOS(): Sentence("おはござ") に #prependBOS() した後に #preendingPrimes() が [BeginOfString, "お"] になること',
  () => {
    const sent = new Sentence("おはござ");
    const appended = sent.appendEOS();

    const lastNGram = appended.appendingPrimes();
    const expected = ["ざ", EndOfSentence];

    assertEquals(lastNGram, expected);
  },
);

Deno.test(
  '#toString(): Sentence([BeginOfSentence, "お", "は", "ご", "ざ", EndOfSentence]) に toString() すると "おはござ" を返すこと',
  () => {
    const sent = new Sentence([
      BeginOfSentence,
      "お",
      "は",
      "ご",
      "ざ",
      EndOfSentence,
    ]);

    const actual = sent.toString();
    const expected = "おはござ";

    assertEquals(actual, expected);
  },
);
