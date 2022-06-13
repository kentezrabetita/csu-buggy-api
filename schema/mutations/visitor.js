const { GraphQLString, GraphQLNonNull, GraphQLBoolean } = require('graphql');
const VisitorType = require('../typedefs/visitor');

const Visitor = require('../../models').visitors;

const ADD_VISITOR = {
  type: VisitorType,
  args: {
    last_name: { type: new GraphQLNonNull(GraphQLString) },
    first_name: { type: new GraphQLNonNull(GraphQLString) },
    middle_name: { type: new GraphQLNonNull(GraphQLString) },
    purpose: { type: new GraphQLNonNull(GraphQLString) },
    status: { type: new GraphQLNonNull(GraphQLBoolean) },
    image_url: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(parent, args) {
    // ! uncomment if okay na ang tanan
    /* if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    } */
    const { last_name, first_name, middle_name, purpose, status, image_url } =
      args;
    await Visitor.create({
      last_name,
      first_name,
      middle_name,
      purpose,
      status,
      image_url,
    });
    return args;
  },
};

module.exports = {
  ADD_VISITOR,
};
