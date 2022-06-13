const {
  GraphQLString,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLID,
} = require('graphql');
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
  async resolve(parent, args, req) {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
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

const EDIT_VISITOR = {
  type: VisitorType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    last_name: { type: new GraphQLNonNull(GraphQLString) },
    first_name: { type: new GraphQLNonNull(GraphQLString) },
    middle_name: { type: new GraphQLNonNull(GraphQLString) },
    purpose: { type: new GraphQLNonNull(GraphQLString) },
    status: { type: new GraphQLNonNull(GraphQLBoolean) },
    image_url: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(parent, args, req) {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    const { last_name, first_name, middle_name, purpose, status, image_url } =
      args;
    await Visitor.update(
      {
        last_name,
        first_name,
        middle_name,
        purpose,
        status,
        image_url,
      },
      {
        where: {
          id: args.id,
        },
      }
    );

    return await Visitor.findOne({
      where: {
        id: args.id,
      },
    });
  },
};

const DELETE_VISITOR = {
  type: VisitorType,
  args: { id: { type: new GraphQLNonNull(GraphQLID) } },
  async resolve(parent, args, req) {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    const visitor = await Visitor.findOne({
      where: {
        id: args.id,
      },
    });

    await Visitor.destroy({
      where: {
        id: args.id,
      },
    });

    return visitor;
  },
};

module.exports = {
  ADD_VISITOR,
  EDIT_VISITOR,
  DELETE_VISITOR,
};
