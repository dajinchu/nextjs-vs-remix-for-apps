import { backend } from "@/lib/backend";
import { GetServerSideProps } from "next";
import InfiniteScroll from "react-infinite-scroller";
import { dehydrate, QueryClient, useInfiniteQuery } from "react-query";
import { Dog, DogItem } from "shared";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery<Dog[]>("infinite-scroll-dogs", () =>
    backend.getDogs(0)
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
    isFetching,
    data: dogs,
  } = useInfiniteQuery<Dog[]>(
    "infinite-scroll-dogs",
    ({ pageParam }) =>
      fetch(`/api/infinite-scroll?offset=${pageParam || 0}`).then((r) =>
        r.json()
      ),
    {
      getNextPageParam: (lastPage) =>
        lastPage.length === 10 && lastPage.at(-1)!.id + 1,
    }
  );

  return (
    <div className="max-w-[500px] mx-auto mt-8">
      <h1>Dogs</h1>
      <InfiniteScroll
        // initialLoad={false}
        hasMore={hasNextPage && !isFetching}
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
