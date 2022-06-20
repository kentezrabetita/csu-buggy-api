const itemResolvers = require('./item');
const userResolvers = require('./user');

const Item = require('../../models').items;

module.exports = {
  Query: {
    ...itemResolvers.Query,
  },

  Mutation: {
    ...itemResolvers.Mutation,
  },
};
