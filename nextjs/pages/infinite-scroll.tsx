import { GetServerSideProps } from "next";
import InfiniteScroll from "react-infinite-scroller";
import { dehydrate, QueryClient, useInfiniteQuery } from "react-query";
import { Dog, DogItem, getDogs } from "shared";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery<Dog[]>("infinite-scroll-dogs", () =>
    getDogs(0, 10)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default function InfiniteScrollPage() {
  const {
    fetchNextPage,
    hasNextPage,
    data: dogs,
  } = useInfiniteQuery<Dog[]>(
    "infinite-scroll-dogs",
    ({ pageParam = 0 }) =>
      fetch(`/api/dogs?offset=${pageParam || 0}`).then((r) => r.json()),
    {
      getNextPageParam: (lastPage) =>
        lastPage.length === 10 && lastPage.at(-1)!.id + 1,
    }
  );

  return (
    <div className="max-w-[500px] mx-auto mt-8">
      <h1>Dogs</h1>
      <InfiniteScroll
        hasMore={hasNextPage}
        loadMore={() => fetchNextPage()}
        loader={<div>loading</div>}
        className="rounded-xl border border-solid border-gray-300 divide-y "
      >
        {dogs?.pages
          ?.flat()
          ?.map((dog) => <DogItem key={dog.id} dog={dog} />) || <></>}
      </InfiniteScroll>
    </div>
  );
}
