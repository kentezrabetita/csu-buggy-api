const express = require('express');
const app = express();
const db = require('./models');
const cors = require('cors');

const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema');
const isAuth = require('./middleware/is-auth');

require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

(async () => {
  await db.sequelize.sync();
})();

app.use(isAuth);

app.get('/', (req, res) => {
  res.send('Your server is running!');
});

app.use(
  '/graphql',
  graphqlHTTP({
    graphiql: true,
    schema: schema,
  })
);

app.listen(process.env.PORT, () => {
  console.log('🚀 Server is running yehey! 🚀');
});
