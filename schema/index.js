const { GraphQLObjectType, GraphQLSchema } = require('graphql');
const { GET_ALL_USERS, GET_USER } = require('./queries/user');
const { CREATE_USER, DELETE_USER, LOGIN_USER } = require('./mutations/user');
const {
  ADD_VISITOR,
  EDIT_VISITOR,
  DELETE_VISITOR,
} = require('./mutations/visitor');
const { GET_ALL_VISITORS } = require('./queries/visitor');

const { ADD_ITEM, EDIT_ITEM, DELETE_ITEM } = require('./mutations/item');

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    getAllUsers: GET_ALL_USERS,
    getUser: GET_USER,
    getAllVisitors: GET_ALL_VISITORS,
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser: CREATE_USER,
    deleteUser: DELETE_USER,
    loginUser: LOGIN_USER,
    addVisitor: ADD_VISITOR,
    editVisitor: EDIT_VISITOR,
    deleteVisitor: DELETE_VISITOR,
    addItem: ADD_ITEM,
    editItem: EDIT_ITEM,
    deleteItem: DELETE_ITEM,
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
