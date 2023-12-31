import { gql, useQuery } from "@apollo/client";

const getBooksquery = gql`
  query books {
    books {
      name
      id
    }
  }
`;

export function BookList() {
  const { loading, error, data } = useQuery(getBooksquery);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <ul id="book-list">
      {data?data.books.map(book => (
        <li key={book.id}>{book.name}</li>
      )):null}
      </ul>
    </div>
  );
}
