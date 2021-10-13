import { assertEquals } from "https://deno.land/std@0.110.0/testing/asserts.ts";
import { SpecialToken } from "./specialToken.ts";

Deno.test("#isBeginOfSentence: BOS ならば true を返すこと", () => {
  const bos = SpecialToken.getBeginOfSentence();

  assertEquals(bos.isBeginOfSentence(), true);
});

Deno.test("#isBeginOfSentence: EOS ならば false を返すこと", () => {
  const eos = SpecialToken.getEndOfSentence();

  assertEquals(eos.isBeginOfSentence(), false);
});

Deno.test("#isEndOfSentence: BOS ならば false を返すこと", () => {
  const bos = SpecialToken.getBeginOfSentence();

  assertEquals(bos.isEndOfSentence(), false);
});

Deno.test("#isEndOfSentence: EOS ならば true を返すこと", () => {
  const eos = SpecialToken.getEndOfSentence();

  assertEquals(eos.isEndOfSentence(), true);
});
