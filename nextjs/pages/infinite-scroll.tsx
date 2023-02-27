import { createPrefetcher } from "@/utils/ssr";
import { trpc } from "@/utils/trpc";
import { GetServerSideProps } from "next";
import InfiniteScroll from "react-infinite-scroller";
import { DogItem } from "shared";
import { NumberParam, useQueryParam } from "use-query-params";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const trpc = createPrefetcher();
  await trpc.dogs.all.prefetchInfinite({});
  if (typeof context.query.selected === "string") {
    await trpc.dogs.details.prefetch({ id: parseInt(context.query.selected) });
  }
  return {
    props: {
      trpcState: trpc.dehydrate(),
    },
  };
};

export default function InfiniteScrollPage() {
  const {
    fetchNextPage,
    hasNextPage,
    isFetching,
    data: dogs,
  } = trpc.dogs.all.useInfiniteQuery(
    {},
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );
  const [selected, setSelected] = useQueryParam("selected", NumberParam);

  const allDogs = dogs?.pages?.map(({ dogs }) => dogs)?.flat();
  const selectedDog = allDogs?.find(({ id }) => id === selected);
  return (
    <div className="max-w-[700px] mx-auto pt-8 max-h-screen flex flex-col">
      <h1 className="text-xl font-medium">Dogs</h1>
      <div className="rounded-xl border border-solid border-gray-300 divide-x overflow-hidden flex">
        <div className="basis-60 shrink-0 overflow-auto min-h-full scroll-gradient">
          <InfiniteScroll
            hasMore={hasNextPage && !isFetching}
            loadMore={() => fetchNextPage()}
            loader={<div key="-1">loading</div>}
            className="divide-y"
            useWindow={false}
          >
            {allDogs?.map((dog) => (
              <div
                tabIndex={0}
                key={dog.id}
                className={`cursor-pointer hover:bg-gray-100 ${
                  dog.id === selected ? "bg-slate-100" : ""
                }`}
                onClick={() => setSelected(dog.id)}
              >
                <DogItem dog={dog} />
              </div>
            )) || <></>}
          </InfiniteScroll>
        </div>
        <div className="grow p-3">
          {selectedDog ? (
            <DoggyDetail id={selectedDog.id} />
          ) : (
            <h1>Select a dog to learn more</h1>
          )}
        </div>
      </div>
    </div>
  );
}

function DoggyDetail({ id }: { id: number }) {
  const details = trpc.dogs.details.useQuery({ id }, { keepPreviousData: true })

  if (!details.isSuccess) {
    return null;
  }
  const { dog, owner, ownerDogs } = details.data;
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
