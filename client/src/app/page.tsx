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
      <div id="main" className="p-5 box-border w-3/5 h-full">
        <h1 className="text-2xl font-bold p-4 text-red-600 justify-center flex w-full">
          My Reading List
        </h1>
        <div className="max-h-72">
          <BookList />
        </div>
        <AddBook />
      </div>
    </ApolloProvider>
  );
}
