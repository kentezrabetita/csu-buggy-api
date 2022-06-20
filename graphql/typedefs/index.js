const gql = require('graphql-tag');

module.exports = gql`
  type Item {
    id: ID!
    item_name: String!
    item_description: String!
    item_status: String!
  }

  type Query {
    getItems: [Item]
    getItem(id: ID!): Item!
  }

  type Mutation {
    addItem(
      item_name: String!
      item_description: String!
      item_status: String!
    ): Item!

    editItem(
      id: ID!
      item_name: String!
      item_description: String!
      item_status: String!
    ): Item!

    deleteItem(id: ID!): Item!
  }
`;
