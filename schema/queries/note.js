const { GraphQLList, GraphQLID, GraphQLNonNull } = require('graphql');
const NoteType = require('../typedefs/note');
const Note = require('../../models').notes;
const User = require('../../models').users;

const GET_ALL_NOTES = {
  type: new GraphQLList(NoteType),
  async resolve(parent, args) {
    const notes = Note.findAll();
    return notes;
  },
};

const GET_USER_NOTES = {
  type: new GraphQLList(NoteType),
  args: { id: { type: new GraphQLNonNull(GraphQLID) } },
  async resolve(parent, args) {
    const user = await User.findOne({
      where: {
        id: args.id,
      },
    });

    if (!user) throw new Error("User doesn't even exist yet! 🚩");

    const userNotes = await Note.findAll({
      where: {
        user_id: args.id,
      },
    });

    if (userNotes.length === 0) throw new Error('This user has no notes!');

    return userNotes;
  },
};

module.exports = {
  GET_USER_NOTES,
  GET_ALL_NOTES,
};
