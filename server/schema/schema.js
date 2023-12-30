const graphql = require("graphql");
const _ = require("lodash");
// describe object types required
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const Book = require('../model/book');
const Author = require("../model/author");

// define a new type
const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID }, // string types for graphql
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return Author.findById(parent.authorId)
      },
    },
  }), // wrap in a es6 function
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return Book.find({authorId:parent.id})
      },
    },
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
        return Book.findById(args.id)
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from db / other  source
        // return _.find(authors, { id: args.id });
        return Author.findById(args.id)
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return Book.find({});
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return Author.find({});
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) }, // Either Define in schema or use this prop both give same results 
        age: { type: GraphQLInt }
      },
      resolve(parent, args){
        let author = new Author({
          name: args.name,
          age: args.age
        })
        return author.save();
      }
    },
    addBook:{
      type:BookType,
      args:{
        name:{type:GraphQLString},
        genre:{type:GraphQLString},
        authorId:{type:GraphQLID}
      },
      resolve(parent, args){
        let book = new Book ({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId
        })
        return book.save();
      }
    }
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation:Mutation
});
