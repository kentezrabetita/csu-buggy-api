const gql = require('graphql-tag');

module.exports = gql`
  type Item {
    id: ID!
    owner: String!
    owner_number: String!
    item_name: String!
    item_description: String!
    item_status: Boolean!
  }

  type User {
    id: ID!
    username: String!
    token: String!
    createdAt: String!
  }

  input RegisterInput {
    username: String!
    password: String!
    confirm_password: String!
  }

  type Query {
    getItems: [Item]
  }

  type Mutation {
    addItem(
      owner: String!
      owner_number: String!
      item_name: String!
      item_description: String!
      item_status: Boolean!
    ): Item!

    editItem(
      id: ID!
      owner: String!
      owner_number: String!
      item_name: String!
      item_description: String!
      item_status: Boolean!
    ): Item!

    deleteItem(id: ID!): Item!
    registerUser(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
  }
`;
