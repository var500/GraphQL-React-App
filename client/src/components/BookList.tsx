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
  const [bookId, setBookId] = useState(data?.books[0]?.id || undefined); // undefined so that the component always loads

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <ul className="p-0 list-disc">
        {data
          ? data.books.map((book) => (
              <li
                className="inline-block m-3 p-3 border-r-4 border-red-400 border hover:shadow-xl cursor-pointer"
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
      {<BookDetails bookId={bookId} />}
    </div>
  );
}
