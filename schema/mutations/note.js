const { GraphQLString, GraphQLNonNull, GraphQLID } = require('graphql');
const NoteType = require('../typedefs/note');

const Note = require('../../models').notes;

const CREATE_NOTE = {
  type: NoteType,
  args: {
    user_id: { type: new GraphQLNonNull(GraphQLID) },
    description: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(args, req) {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    const { user_id, description } = args;
    await Note.create({ user_id, description });
    return args;
  },
};

module.exports = {
  CREATE_NOTE,
};
