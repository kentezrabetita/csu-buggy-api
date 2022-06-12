const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
} = require('graphql');

const AuthType = new GraphQLObjectType({
  name: 'Auth',
  fields: () => ({
    id: { type: GraphQLID },
    token: { type: GraphQLString },
    tokenExp: { type: GraphQLInt },
  }),
});

module.exports = AuthType;
