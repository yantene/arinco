import { Bson, MongoClient } from "https://deno.land/x/mongo@v0.26.0/mod.ts";
// entities を使っても良い

export interface IVocabularyRepository {}

export class Markov {
  constructor(repo: IVocabularyRepository) {}
}
