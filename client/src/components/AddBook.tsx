import { useQuery } from "@apollo/client";
import { AppForm } from "./Form";
import { getAuthorsquery, addBookMutation } from "@/queries/queries";

interface Authors {
  name: string;
  id: string;
}

export function AddBook() {
  const { loading, error, data:authorsData } = useQuery<{ authors: Authors[] }>(
    getAuthorsquery
  );


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  const Auth = authorsData?.authors.map((ids) => {
    const authors = [ids.id, ids.name];
    return authors;
  });
  return (
    <div>
      <AppForm authors={Auth} />
    </div>
  );
}
