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
  mutation addBook($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      id
    }
  }
`;

// getting a single book
const getBookquery = gql`
  query book($id: ID) {
    book(id: $id) {
      id
      name
      genre
      author{
        name
        age
        book {
          name
          id
        }
      }
    }
  }
`;

export { getBooksquery, getAuthorsquery, addBookMutation, getBookquery };
