This is a crappy mock up of internal backend services that are meant to be hit by the BFF (Remix or Next.js server)
These would be implemented in any lanaguage and OpenAPI/GraphQL clients would be generated (see /shared)

It's possible some subset of backend services could be externalized, particularly high volume endpoints, but the general pattern is:

```
backend => BFF => browser
```

Benefits:
- BFF can pluck just the columns it needs for specific use cases, reducing data sent over the network.
- Waterfalls in data that require sequential roundtrips stay within the datacenter

