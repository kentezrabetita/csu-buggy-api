const { GraphQLObjectType, GraphQLID, GraphQLString } = require('graphql');
const UserType = require('./user');
const User = require('../../models').users;

const NoteType = new GraphQLObjectType({
  name: 'Note',
  fields: () => ({
    id: { type: GraphQLID },
    user_id: {
      type: UserType,
      resolve(parent, args) {
        return User.findOne({
          where: {
            id: parent.user_id,
          },
        });
      },
    },
    description: { type: GraphQLString },
  }),
});

module.exports = NoteType;
