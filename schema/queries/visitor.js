const { GraphQLList } = require('graphql');
const VisitorType = require('../typedefs/visitor');
const Visitor = require('../../models').visitors;

const GET_ALL_VISITORS = {
  type: new GraphQLList(VisitorType),
  async resolve(parent, args, req) {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    const visitors = Visitor.findAll();
    return visitors;
  },
};

module.exports = {
  GET_ALL_VISITORS,
};
