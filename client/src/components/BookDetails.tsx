import { useQuery } from "@apollo/client";
import { getBookquery } from "@/queries/queries";

interface BookDetailsProps {
  bookId: string; // Ensure bookId is of type string
}

interface Books {
  name: string;
  id: string;
}

interface Author {
  name: string;
  age: string;
  books: Books[];
}

interface BookDetailsResponse {
  id: string;
  name: string;
  genre: string;
  author: Author;
}

export function BookDetails(bookId: BookDetailsProps) {
  const { loading, error, data } = useQuery(getBookquery, {
    variables: {
      id: bookId.bookId,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Access the data returned by the query
  const bookData: BookDetailsResponse = data?.book;

  return (
    <div id="book-details">
      {bookData && (
        <div className="mt-8">
          <h1 className="text-2xl font-extrabold">{bookData.name}</h1>
          <div className="flex flex-row items-center">
            <p className="font-bold">{"Genre:"}</p>
            <p>{bookData.genre}</p>
          </div>
          <div className="flex flex-row items-center">
            <p className="font-bold">{"Author:"}</p>
            <p>{bookData.author && bookData.author.name}</p>
          </div>
          <p >{`All Books by ${bookData.author.name}:`}</p>
          <ul className="mx-8 list-disc">
            {bookData.author &&
              bookData.author.books.map((item: Books) => (
                <li key={item.id}>{item.name}</li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}
