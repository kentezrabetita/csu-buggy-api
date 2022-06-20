const User = require('../../models/').users;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { UserInputError } = require('apollo-server');

require('dotenv').config();

const {
  validateRegisterInput,
  validateLoginInput,
} = require('../../utils/validate');

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: '8h' }
  );
}

module.exports = {
  Mutation: {
    async login(_, { username, password }) {
      const { errors, valid } = validateLoginInput(username, password);

      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }

      const user = await User.findOne({
        where: {
          username,
        },
      });

      if (!user) {
        errors.general = 'User not found';
        throw new UserInputError('User not found', { errors });
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        errors.general = 'Wrong crendetials';
        throw new UserInputError('Wrong crendetials', { errors });
      }

      const token = generateToken(user);

      return {
        id: user.id,
        username: user.username,
        createdAt: user.createdAt,
        token,
      };
    },
    async registerUser(
      _,
      { registerInput: { username, password, confirm_password } }
    ) {
      // * validate fields
      const { valid, errors } = validateRegisterInput(
        username,
        password,
        confirm_password
      );

      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }

      // * check user if exists
      const user = await User.findOne({
        where: {
          username,
        },
      });

      if (user) {
        throw new UserInputError('Username is taken', {
          errors: {
            username: 'This username is taken',
          },
        });
      }

      // * hash password using bcrypt
      password = await bcrypt.hash(password, 12);

      await User.create({
        username,
        password,
      });

      const res = await User.findOne({
        where: {
          username,
        },
      });

      // * generate jwt token
      const token = generateToken(res);
      return {
        id: res.id,
        username: res.username,
        createdAt: res.createdAt,
        token,
      };
    },
  },
};
