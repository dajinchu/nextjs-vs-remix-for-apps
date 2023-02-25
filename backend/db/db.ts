import { faker } from "@faker-js/faker";
import { range } from "lodash";
import images from "./dog.json";

export interface Dog {
  id: number;
  name: string;
  breed: string;
  image: string;
}

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
