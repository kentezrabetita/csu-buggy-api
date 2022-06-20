const express = require('express');
const app = express();
const db = require('./models');
const cors = require('cors');

const { ApolloServer } = require('apollo-server');
const typeDefs = require('./graphql/typedefs');
const resolvers = require('./graphql/resolvers');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

(async () => {
  await db.sequelize.sync();
})();

app.get('/', (req, res) => {
  res.send('Your server is running!');
});

server.listen(process.env.PORT, () => {
  console.log('🚀 Server is running yehey! 🚀');
});
