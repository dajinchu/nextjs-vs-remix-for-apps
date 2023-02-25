import { LoaderArgs } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { DogItem, getDogs } from "shared";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { getParamsOrFail } from "remix-params-helper";
import { z } from "zod";

const ParamsSchema = z.object({
  offset: z.number().optional(),
});

/*
On downside of this approach is that if you visit /infinite-scroll?page=22 directly, you will get page 22 results at the top.

*/

export const loader = async ({ request, params }: LoaderArgs) => {
  const url = new URL(request.url);
  const result = getParamsOrFail(url.searchParams, ParamsSchema);
  return await getDogs(result.offset || 0, 10);
};

export default function InfiniteScrollPage() {
  const fetcher = useFetcher<typeof loader>();
  const [hasMore, setHasMore] = useState(true);
  const [dogs, setDogs] = useState(useLoaderData<typeof loader>());
  const offset = dogs[dogs.length - 1].id + 1;

  useEffect(() => {
    const { data } = fetcher;
    if (data && data.length > 0) {
      setDogs((d) => [...d, ...data]);
      setHasMore(data.length === 10);
    }
  }, [fetcher.data]);

  return (
    <div className="max-w-[500px] mx-auto mt-8">
      <h1>Dogs</h1>
      <InfiniteScroll
        hasMore={fetcher.state === "idle" && hasMore}
        loadMore={() => {
          fetcher.load(`/infinite-scroll?offset=${offset}`);
        }}
        loader={<div>loading</div>}
        className="rounded-xl border border-solid border-gray-300 divide-y "
      >
        {dogs.map((dog) => (
          <DogItem key={dog.id} dog={dog} />
        ))}
      </InfiniteScroll>
    </div>
  );
}
