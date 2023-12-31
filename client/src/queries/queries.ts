import { gql } from "@apollo/client";

const getBooksquery = gql`
  query books {
    books {
      name
      id
    }
  }
`;

const getAuthorsquery = gql`
  query authors {
    authors {
      name
      id
    }
  }
`;

const addBookMutation = gql`
  mutation addBook($name: String!, $genre: String!, $authorId: ID!){
    addBook(name:$name,genre:$genre,authorId:$authorId){
      name
      id
    }
  }
`;

export { getBooksquery, getAuthorsquery, addBookMutation };
