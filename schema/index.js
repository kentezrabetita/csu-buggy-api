const { GraphQLObjectType, GraphQLSchema } = require('graphql');
const { GET_ALL_USERS, GET_USER } = require('./queries/user');
const { CREATE_USER, DELETE_USER, LOGIN_USER } = require('./mutations/user');
const { CREATE_NOTE } = require('./mutations/note');
const { GET_USER_NOTES, GET_ALL_NOTES } = require('./queries/note');
const {
  ADD_VISITOR,
  EDIT_VISITOR,
  DELETE_VISITOR,
} = require('./mutations/visitor');
const { GET_ALL_VISITORS } = require('./queries/visitor');

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    getAllUsers: GET_ALL_USERS,
    getUser: GET_USER,
    getUserNotes: GET_USER_NOTES,
    getAllNotes: GET_ALL_NOTES,
    getAllVisitors: GET_ALL_VISITORS,
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser: CREATE_USER,
    deleteUser: DELETE_USER,
    createNote: CREATE_NOTE,
    loginUser: LOGIN_USER,
    addVisitor: ADD_VISITOR,
    editVisitor: EDIT_VISITOR,
    deleteVisitor: DELETE_VISITOR,
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
