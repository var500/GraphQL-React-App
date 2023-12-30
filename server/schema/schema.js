const graphql = require("graphql");
const _ = require("lodash");
// describe object types required
const { GraphQLObjectType, 
  GraphQLString, 
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList 
} = graphql;

// define a new type
const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID }, // string types for graphql
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author:{
      type:AuthorType,
      resolve(parent,args){
        // return _.find(authors, { id: parent.authorId });
      }
    }
  }), // wrap in a es6 function
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID }, // string types for graphql
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type:new GraphQLList(BookType),
      resolve(parent,args){
        // return _.filter(books,{authorId:parent.id})
      }
    }
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
        // return _.find(books, { id: args.id });
      },
    },
    author:{
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from db / other  source
        // return _.find(authors, { id: args.id });
      },
    },
    books:{
      type: new GraphQLList(BookType),
      resolve(parent,args){
        return books
      }
    },
    authors:{
      type:new GraphQLList(AuthorType),
      resolve(parent,args){
        return authors
      }
    }
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
