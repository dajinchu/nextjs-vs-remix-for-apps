import { DogItem } from "@/../shared";
import { backend } from "@/lib/backend";
import DogLink from "./DogLink";

export default async function DogsLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const dogs = await backend.getDogs(0, {});
  return (
    <div className="max-w-[700px] mx-auto pt-8 max-h-screen flex flex-col">
      <h1 className="text-xl font-medium">Dogs</h1>
      <div className="rounded-xl border border-solid border-gray-300 divide-x overflow-hidden flex">
        <div className="basis-60 shrink-0 overflow-auto min-h-full scroll-gradient">
          {dogs.map((dog) => (
            <DogLink
              key={dog.id}
              slug={String(dog.id)}
              className="cursor-pointer hover:bg-gray-100"
              activeClassName="bg-slate-100"
            >
              {/**
               * DogLink is a client component, DogItem is a server component!
               * This pattern of passing children is key to the RSC pattern, though not actually neccessary.
               */}
              <DogItem dog={dog} />
            </DogLink>
          ))}
        </div>
        <div className="grow p-3">{children}</div>
      </div>
    </div>
  );
}
