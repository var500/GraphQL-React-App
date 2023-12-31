"use client"
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from "@apollo/client";

//Components
import { BookList } from "./ui/BookList";

// apollo client setup
const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});
const cache = new InMemoryCache();
const client = new ApolloClient({
  link: httpLink,
  cache: cache,
});

export default function Home() {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1>My Library</h1>
        <BookList />
      </div>
    </ApolloProvider>
  );
}
