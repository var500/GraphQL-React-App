const express = require("express");
const { graphqlHTTP } = require('express-graphql');
const schema = require("./schema/schema");
const app = express();
require('dotenv').config()

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql:true
  })
);

app.listen(process.env.PORT, () => {
  console.log(`✅ Now listening for requests on PORT ${process.env.PORT}`);
});
