import "server-only";
import DataLoader from "dataloader";
import { cache } from "react";

async function bulkGetDogs(ids: readonly number[]) {
  const url = `https://dog.ceo/api/breeds/image/random/${ids.length}`;
  console.log("FETCHING", url);
  const { message } = await (await fetch(url, { cache: "no-store" })).json();
  return message;
}

// wrap in cache to get a unique dogloader per-request
export const dogLoader = cache(
  () =>
    new DataLoader<number, string>((keys) => bulkGetDogs(keys))
);

// "generate"
export async function generateList() {
  return Array.from({ length: Math.floor(Math.random() * 7) + 3 }, (_,i)=>i);
}
