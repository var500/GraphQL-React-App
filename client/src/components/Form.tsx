import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { addBookMutation, getBooksquery } from "@/queries/queries";

interface AppFormProps {
  authors?: string[][];
}

interface AddBook {
  name: string;
  id: string;
}

export function AppForm({ authors }: AppFormProps) {
  const [bookName, setBookName] = useState("");
  const [genre, setGenre] = useState();
  const [authorId, setAuthorId] = useState();
  const [addBook, { data: addBookData }] = useMutation<{ addBook: AddBook }>(
    addBookMutation
  );

  const handleBookName = (event: any) => {
    setBookName(event.target.value);
  };
  const handleGenreChange = (event: any) => {
    setGenre(event.target.value);
  };
  const handleAuthorId = (event: any) => {
    setAuthorId(event.target.value);
  };

  const handleFormData = async (event: any) => {
    event.preventDefault();
    const result = await addBook({
      variables: {
        name: bookName,
        genre: genre,
        authorId: authorId,
      },
      refetchQueries:[{query: getBooksquery}]
    });
    console.log(result.data?.addBook);
  };

  useEffect(() => {}, [handleBookName, handleGenreChange]);

  return (
    <form className=" p-5 fixed left-0 bottom-0 w-3/5">
      <div className="space-y-2 mt-10">
        <div className="mt-1">
          <label
            htmlFor="Book-name"
            className="flex text-sm font-bold leading-6 text-gray-900 text-right"
          >
            Book name
          </label>
          <div className="mt-2">
            <input
              type="text"
              value={bookName}
              onChange={handleBookName}
              name="Book-name"
              id="Book-name"
              autoComplete="given-name"
              className="flex rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="mt-1">
          <label
            htmlFor="Genre"
            className="flex text-sm font-bold leading-6 text-gray-900"
          >
            Genre
          </label>

          <input
            type="text"
            value={genre}
            onChange={handleGenreChange}
            name="Genre"
            id="Genre"
            autoComplete="given-name"
            className="flex rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="mt-1">
          <label
            htmlFor="Author Name"
            className="block text-sm font-bold leading-6 text-gray-900"
          >
            Author id
          </label>

          <select
            onChange={handleAuthorId}
            id="Author name"
            name="Author name"
            autoComplete="Author name"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
          >
            <option value="">Add Authors</option>
            {authors?.map((author, index) => (
              <option key={index} value={author[0]}>
                {author[1]}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-1 ">
          <button
            onClick={handleFormData}
            className="bg-blue-800 hover:bg-blue-300 rounded-full px-4 py-2 text-white"
          >
            +
          </button>
        </div>
      </div>
    </form>
  );
}
