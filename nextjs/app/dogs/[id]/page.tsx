import { DogItem } from "@/components/DogItem";
import { backend } from "@/lib/backend";
import { notFound } from "next/navigation";

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const dogId = parseInt(id);
  const dog = await backend.getDog(dogId);
  if (!dog) {
    // throws
    notFound();
  }
  const [owner, ownerDogs] = await Promise.all([
    backend.getOwner(dog.ownerId),
    backend.getDogs(0, { ownerId: dog.ownerId }),
  ]);
  if (!owner) {
    // throws
    notFound();
  }

  return (
    <div className="flex flex-col items-center">
      <img src={dog.image} className="h-36 w-36 rounded-full object-cover" />
      <h1 className="text-xl font-bold">{dog.name}</h1>
      <div>{`Owner: ${owner.name} (${owner.job})`}</div>
      <br />
      <div className="text-xl font-medium">{owner.name}'s Pets</div>
      <div className="rounded-xl border border-solid border-gray-300 divide-y overflow-auto">
        {ownerDogs.map((dog) => (
          <DogItem key={dog.id} dog={dog} />
        ))}
      </div>
    </div>
  );
}
