import { faker } from "@faker-js/faker";
import { range } from "lodash";
import { Dog, Owner } from "shared/types";
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
        owner_id: faker.datatype.number(10),
      };
    })
  );
}

export async function getOwner(id: number): Promise<Owner> {
  faker.seed(id);
  return {
    id,
    name: faker.name.fullName(),
    job: faker.name.jobTitle(),
  }
}

export async function getOwners(ids: number[]): Promise<Owner[]> {
  // In reality we wouldn't just map. This function/endpoint exists to remove N+1
  return Promise.all(ids.map(id=>getOwner(id)))
}
