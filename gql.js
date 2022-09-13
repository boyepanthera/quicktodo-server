const express = require('express');
// const { graphqlHTTP } = require('express-graphql');
// const { buildSchema } = require('graphql');

// const schema = buildSchema(`
//     type Query {
//         hello : String
//         getUser(id: ID!) : User
//     }

//     type User {
//         id : ID!,
//         name: String
//     }
// `);

// const CreateTodo = () => {
//   return { name: 'Nobody send your father', id: 1 };
// };

// const root = { hello: () => 'hello world', getUser: CreateTodo() };
// const server = express();
// server.use(
//   '/graphql',
//   graphqlHTTP({
//     schema,
//     rootValue: root,
//     graphiql: true,
//   })
// );

server.listen(4001, () => {
  console.log('quicktodogql running on port 4001');
});
