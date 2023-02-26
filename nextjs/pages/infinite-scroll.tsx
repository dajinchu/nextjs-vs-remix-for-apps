import { createPrefetcher } from "@/utils/ssr";
import { trpc } from "@/utils/trpc";
import { GetServerSideProps } from "next";
import InfiniteScroll from "react-infinite-scroller";
import { DogItem } from "shared";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const trpc = createPrefetcher()
  await trpc.getDogs.prefetchInfinite({})
  return {
    props: {
      trpcState: trpc.dehydrate(),
    }
  }
};

export default function InfiniteScrollPage() {
  const {
    fetchNextPage,
    hasNextPage,
    isFetching,
    data: dogs,
  } = trpc.getDogs.useInfiniteQuery(
    {},
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  return (
    <div className="max-w-[500px] mx-auto mt-8">
      <h1>Dogs</h1>
      <InfiniteScroll
        hasMore={hasNextPage && !isFetching}
        loadMore={() => fetchNextPage()}
        loader={<div>loading</div>}
        className="rounded-xl border border-solid border-gray-300 divide-y "
      >
        {dogs?.pages?.map(({dogs})=>dogs)
          ?.flat()
          ?.map((dog) => <DogItem key={dog.id} dog={dog} />) || <></>}
      </InfiniteScroll>
    </div>
  );
}
