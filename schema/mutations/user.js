const {
  GraphQLBoolean,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
} = require('graphql');
const UserType = require('../typedefs/user');
const AuthType = require('../typedefs/auth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../../models').users;

const LOGIN_USER = {
  type: AuthType,
  args: {
    username: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(parent, args) {
    const { username, password } = args;

    const user = await User.findOne({
      where: {
        username: username,
      },
    });

    if (!user)
      throw new Error(`User ${username} does not exist in the database!`);

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error('Invalid Password');

    const token = jwt.sign(
      { id: user.id, name: user.username },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h',
      }
    );

    return { id: user.id, token: token, tokenExp: 1 };
  },
};

const CREATE_USER = {
  type: UserType,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    username: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
    status: { type: new GraphQLNonNull(GraphQLBoolean) },
  },
  async resolve(parent, args) {
    const { name, username, password, status } = args;

    const user = await User.findOne({
      where: {
        username: username,
      },
    });

    if (user) {
      throw new Error('Username already exists!');
    }

    if (name === username) {
      throw new Error("Name and Username can't be the same!");
    }

    const encryptedPassword = await bcrypt.hash(password, 12);
    await User.create({ name, username, password: encryptedPassword, status });
    return args;
  },
};

const DELETE_USER = {
  type: UserType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  async resolve(parent, args) {
    const user = await User.findOne({
      where: {
        id: args.id,
      },
    });

    if (!user) {
      throw new Error('User does not exist!');
    }

    await User.destroy({
      where: {
        id: args.id,
      },
    });

    return user;
  },
};

module.exports = {
  CREATE_USER,
  DELETE_USER,
  LOGIN_USER,
};
