## Deployed on Vercel

View the project here[https://prize-picks-pokedex.vercel.app].

## Project Set-up

```
pnpm install

pnpm start
```

## Notes

# Completed

- [x] Search for any Pokemon using PokeAPI[https://pokeapi.co/docs/v2]
- [x] List history of searches with links
- [x] Able to see details about abilities, species, images and types upon searching.
- [x] Able to see other evolutions of Pokemon and be able to navigate to specific Pokemon in the evolution chain
- [x] Minimal styling and UX

# Not completed

- [ ] Displaying `moves`. I chose not to include listing each pokemon's `moves` since the list of learnable moves are quite large
- [ ] Automated testing. I definitely needed more time to include tests!
- [ ] Typescript definitions. Given more time, I would have defined the types more exhaustively

# Concurrency considerations

With respect to the frontend application, we should focus on minimizing API requests to maintain a good level of performance when there are multiple concurrent users making requests.

I implemented the search feature with a debounced change handler to limit the number of requests made to the API.

When scaling an application like this one, there are a few additional strategies that should be considered. It's critical to implement loading states (placeholders and spinners) and error handling. Having them in place is important to handle slow API responses and to catch any issues that come up during concurrent requests.

In additiopn to that, implementing a cacheing solution can be really helpful as well. For this project, we could use localStorage to store the results of API requests so that subsequent requests for the same Pokemon does not require making a call to the PokeAPI. Alternatively, we could leverage libraries like `swr`, a data fetching library with built-in cacheing features.

Keep in mind the server handling the API requests is more critical to manage concurrency. If we were to advise PokeAPI on concurrency, we would probably be discussing loading balancing strategies, server side caching, CDNs, rate limiting, and more.
