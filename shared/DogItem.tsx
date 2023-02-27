import { Dog } from ".";

export function DogItem({ dog }: { dog: Dog }) {
  return (
    <div title={`dog ${dog.id}`} className="p-3 flex space-x-4 bg-inherit">
      <img src={dog.image} className="h-16 w-16 rounded-full object-cover" />
      <div>
        <h2>{dog.name}</h2>
        <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">
          {dog.breed}
        </div>
      </div>
    </div>
  );
}
