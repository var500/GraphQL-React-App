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
  const [bookName, setBookName] = useState();
  const [genre, setGenre] = useState();
  const [success, setSuccess] = useState<boolean>();
  const [authorId, setAuthorId] = useState();
  const [addBook, { data: addBookData }] = useMutation<{ addBook: AddBook }>(
    addBookMutation
  );

  const handleBookName = (event: any) => {
    setBookName(event.target.value);
    setSuccess(false);
  };
  const handleGenreChange = (event: any) => {
    setGenre(event.target.value);
  };
  const handleAuthorId = (event: any) => {
    setAuthorId(event.target.value);
  };
  const bookAddStatus = () => {
    setSuccess(true);
  };

  const handleFormData = async (event: any) => {
    event.preventDefault();

    if (bookName && genre && authorId) {
      const result = await addBook({
        variables: {
          name: bookName,
          genre: genre,
          authorId: authorId,
        },
        refetchQueries: [{ query: getBooksquery }],
      });
      bookAddStatus();
    }
    else{
      setSuccess(false);
    }
  };

  useEffect(() => {}, [handleBookName, handleGenreChange]);

  return (
    <form className=" p-5 fixed flex justify-center left-0 w-3/5">
      <div className=" mt-10">
        <div className="mt-1 flex gap-4 items-center justify-between">
          <label
            htmlFor="Book-name"
            className="flex text-sm font-bold leading-6 text-gray-900 text-right"
          >
            {"Book name: "}
          </label>
          <div className="mt-2">
            <input
              type="text"
              required
              value={bookName}
              onChange={handleBookName}
              name="Book-name"
              id="Book-name"
              autoComplete="given-name"
              className="flex rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="mt-1 flex gap-4 items-center justify-between">
          <label
            htmlFor="Genre"
            className="flex text-sm font-bold leading-6 text-gray-900"
          >
            {"Genre: "}
          </label>

          <input
            type="text"
            value={genre}
            required
            onChange={handleGenreChange}
            name="Genre"
            id="Genre"
            autoComplete="given-name"
            className="flex rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="mt-1 flex gap-4 items-center justify-between">
          <label
            htmlFor="Author Name"
            className="block text-sm font-bold leading-6 text-gray-900"
          >
            {"Author id: "}
          </label>

          <select
            onChange={handleAuthorId}
            id="Author name"
            name="Author name"
            required
            autoComplete="Author name"
            className="block w-52 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
          >
            <option value="">--select--</option>
            {authors?.map((author, index) => (
              <option key={index} value={author[0]}>
                {author[1]}
              </option>
            ))}
          </select>
        </div>
        <div className="-mt-7 flex justify-center">
          <button
            onClick={handleFormData}
            className="bg-red-400 hover:bg-blue-300 rounded-full px-4 py-2 w-32 mt-20 text-white"
          >
            ADD
          </button>
        </div>
        {success == true ? (
          <div className="flex justify-center mt-5">
            <p>✅ Book Added Successfully</p>
          </div>
        ) : success == false ? (
          <div className="flex justify-center mt-5">
            <p>❌ Error: Please Input All the feilds</p>
          </div>
        ) : null}
      </div>
    </form>
  );
}
