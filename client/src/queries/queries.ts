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

export { getBooksquery, getAuthorsquery };
