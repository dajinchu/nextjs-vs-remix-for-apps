import { faker } from "@faker-js/faker";
import { range } from "lodash";
import { Dog } from "shared/types";
import { images } from "./dog";

function breedFromUrl(url: string): string {
  return url.split("/")[4].split("-").reverse().join(" ");
}

export async function getDogs(offset: number, limit: number): Promise<Dog[]> {
  faker.seed(offset);
  return Promise.resolve(
    range(offset, Math.min(images.length - 1, offset + limit)).map((i) => {
      return {
        id: i,
        name: faker.name.firstName(),
        breed: breedFromUrl(images[i]),
        image: images[i],
      };
    })
  );
}
