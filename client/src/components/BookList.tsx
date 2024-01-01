import { useQuery } from "@apollo/client";
import { getBooksquery } from "@/queries/queries";
import { BookDetails } from "./BookDetails";
import { useState } from "react";

interface Book {
  id: string;
  name: string;
  genre: string;
  authorId: string;
}

export function BookList() {
  const { loading, error, data } = useQuery<{ books: Book[] }>(getBooksquery);
  const [bookId, setBookId] = useState(data?.books[0]?.id || "");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <ul className="mx-12 list-disc">
        {data
          ? data.books.map((book) => (
              <li
                key={book.id}
                onClick={(e) => {
                  setBookId(book.id);
                }}
              >
                {book.name}
              </li>
            ))
          : null}
      </ul>
      {bookId && <BookDetails bookId={bookId} />}
    </div>
  );
}
