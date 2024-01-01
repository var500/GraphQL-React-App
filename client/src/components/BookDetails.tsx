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

  if (error) return <p>Error: {error.message}</p>;

  // Access the data returned by the query
  const bookData: BookDetailsResponse = data?.book;
  return (
    <div
      id="book-details"
      className="fixed top-0 right-0 w-2/5 h-full bg-red-400 overflow-auto p-8 shadow-lg box-border text-white"
    >
      {bookData ? (
        bookData && (
          <div className="mt-8">
            <h1 className="text-2xl font-extrabold">{bookData.name}</h1>
            <div className="flex flex-row items-center py-3">
              <p className="font-bold">{"Genre:"}</p>
              <p className="ml-2">{bookData.genre}</p>
            </div>
            <div className="flex flex-row items-center py-3">
              <p className="font-bold">{"Author:"}</p>
              <p className="ml-2">{bookData.author && bookData.author.name}</p>
            </div>
            <p className="py-3">{`All Books by ${bookData.author.name}:`}</p>
            <ul className="mx-8 list-disc">
              {bookData.author &&
                bookData.author.books.map((item: Books) => (
                  <li key={item.id} className="py-2">{item.name}</li>
                ))}
            </ul>
          </div>
        )
      ) : loading ? (
        loading && (
          <div>
            <p>Loading ...</p>
          </div>
        )
      ) : (
        <p>No Book Selected</p>
      )}
    </div>
  );
}
