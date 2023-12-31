"use client";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";

//Components
import { BookList } from "../components/BookList";
import { AddBook } from "@/components/AddBook";

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
      <div id="main" className="p-4">
        <h1 className="text-2xl font-bold p-4">My Library</h1>
        <BookList />
        <AddBook />
      </div>
    </ApolloProvider>
  );
}
