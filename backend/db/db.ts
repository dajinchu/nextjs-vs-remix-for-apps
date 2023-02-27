import { range } from "lodash";
import { Dog, Owner } from "shared/types";
import { data } from "./data";

function breedFromUrl(url: string): string {
  return url.split("/")[4].split("-").reverse().join(" ");
}

export async function getDogs(
  offset: number,
  limit: number,
  { ownerId }: { ownerId?: number }
): Promise<Dog[]> {
  const dogs = typeof ownerId !== 'undefined'
    ? data.dogs.filter((dog) => dog.ownerId === ownerId)
    : data.dogs;
  return Promise.resolve(
    range(offset, Math.min(dogs.length - 1, offset + limit)).map((i) => dogs[i])
  );
}

export async function getDog(id: number): Promise<Dog | undefined> {
  return Promise.resolve(data.dogs.find((dog) => dog.id === id));
}

export async function getOwner(id: number): Promise<Owner> {
  return data.owners[id];
}

export async function getOwners(ids: number[]): Promise<Owner[]> {
  // In reality we wouldn't just map. This function/endpoint exists to remove N+1
  return Promise.all(ids.map((id) => getOwner(id)));
}
