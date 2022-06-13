const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
} = require('graphql');

const VisitorType = new GraphQLObjectType({
  name: 'Visitor',
  fields: () => ({
    id: { type: GraphQLID },
    last_name: { type: GraphQLString },
    first_name: { type: GraphQLString },
    middle_name: { type: GraphQLString },
    purpose: { type: GraphQLString },
    status: { type: GraphQLBoolean },
    image_url: { type: GraphQLString },
  }),
});

module.exports = VisitorType;
