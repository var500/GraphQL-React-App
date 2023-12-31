import { useQuery } from "@apollo/client";
import { getBooksquery } from "@/queries/queries";

interface Book {
  id: string;
  name: string;
  genre: string;
  authorId: string;
}

export function BookList() {
  const { loading, error, data } = useQuery<{ books: Book[] }>(getBooksquery);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <ul className="mx-12 list-disc">
        {data
          ? data.books.map((book) => <li key={book.id}>{book.name}</li>)
          : null}
      </ul>
    </div>
  );
}
