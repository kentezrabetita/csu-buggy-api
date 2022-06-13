const { GraphQLList, GraphQLID, GraphQLNonNull } = require('graphql');
const UserType = require('../typedefs/user');
const User = require('../../models').users;

const GET_ALL_USERS = {
  type: new GraphQLList(UserType),
  async resolve(parent, args, req) {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const users = await User.findAll();
      return users;
    } catch (error) {
      throw error;
    }
  },
};

const GET_USER = {
  type: UserType,
  args: { id: { type: new GraphQLNonNull(GraphQLID) } },
  async resolve(parent, args, req) {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const user = await User.findOne({
        where: {
          id: args.id,
        },
      });

      if (!user) {
        throw new Error('User does not exist!');
      }

      return user;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = {
  GET_ALL_USERS,
  GET_USER,
};
