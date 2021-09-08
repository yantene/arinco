import { assertEquals } from "https://deno.land/std@0.106.0/testing/asserts.ts";
import { Brain } from "./brain.ts";

Deno.test('hello() returns "Hello!"', () => {
  const brain = new Brain();

  const actual = brain.hello();
  const expected = "Hello!";

  assertEquals(actual, expected);
});
