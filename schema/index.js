const { GraphQLObjectType, GraphQLSchema } = require('graphql');
const { ADD_ITEM, EDIT_ITEM, DELETE_ITEM } = require('./mutations/item');

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {},
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addItem: ADD_ITEM,
    editItem: EDIT_ITEM,
    deleteItem: DELETE_ITEM,
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
