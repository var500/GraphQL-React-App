const express = require("express");
const { graphqlHTTP } = require('express-graphql');
const schema = require("./schema/schema");
const db = require("./config/db");
const cors = require('cors');
require('dotenv').config()

db();
const app = express();
app.use(cors());
const port = process.env.PORT || 5000;
app.use(express.json());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql:true
  })
);

app.listen(port, () => {
  console.log(`✅ Now listening for requests on PORT ${port}`);
});
