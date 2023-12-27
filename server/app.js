const express = require('express')
const graphqlHTTP = require('express-graphql');

const app = express();

app.listen(process.env.PORT,() =>{
    console.log('✅ Now listening for requests on PORT 4000')
})