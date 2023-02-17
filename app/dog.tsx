import { dogLoader } from "@/lib/dogApi";

export default async function Dog({ id }: { id: number }) {
  const dog = await dogLoader().load(id);
  return (
    <div>
      <img height={200} src={dog} />
    </div>
  );
}
