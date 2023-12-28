const graphql = require("graphql");
const _ = require("lodash");
// describe object types required
const { GraphQLObjectType, 
  GraphQLString, 
  GraphQLSchema,
  GraphQLID,
  GraphQLInt 
} = graphql;

// dummy data
var books = [
  { name: "Name of the Wind", genre: "Fantasy", id: "1" },
  { name: "The Final Empire", genre: "Fantasy", id: "2" },
  { name: "The Long Earth", genre: "Sci-Fi", id: "3" },
];

var authors = [
  {name:"Robert Frost", age:68, id:"1"},
  {name:"Terry Pratchett", age:48, id:"2"},
  {name:"John Keats", age:44, id:"3"},
]

// define a new type
const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID }, // string types for graphql
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }), // wrap in a es6 function
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID }, // string types for graphql
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
  }), // wrap in a es6 function
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from db / other  source
        return _.find(books, { id: args.id });
      },
    },
    author:{
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from db / other  source
        return _.find(authors, { id: args.id });
      },
    }
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
