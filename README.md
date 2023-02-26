WIP: What is this repo



Examples: Social media, budgeting app

Characteristics of highly interactive apps.
- Almost every page is personalized
- SEO pages exist but need to render differently for logged-in users
- Pages have multiple interactive elements (dashboards, feeds, netflix-style carousels)
- Interactive components are reused (Facebook's comment box is everywhere)



Some components are tied to a specific data fetch (connect button). 
- Building a specific API for them makes sense.

Most pages need to do data fetching, often completely one-off.
- Just throwing this in getServerSideProps or equivalent is easiest. Type safety is easy.

Some pages need to lazy load/stream slow data.
- This is ideally done with Streaming. Otherwise another API has to be created and data waterfall introduced.

Some pages want to defer fetching until user interaction (infinite scroll) or real time event (isOnline marker, notifications). 
These pages may still want to fetch initial data on first render.
- This is the main tension.
- On initial render, you want to just call the data function
- On subsequent render, you want to wrap it in a request handler.
- Remix: useFetcher can solve this, though multiple loaders on a route get a little ugly.
- tRPC? https://trpc.io/docs/ssg-helpers

