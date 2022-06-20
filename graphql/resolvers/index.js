const itemResolvers = require('./item');

module.exports = {
  Query: {
    ...itemResolvers.Query,
  },

  Mutation: {
    ...itemResolvers.Mutation,
  },
};
