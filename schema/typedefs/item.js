const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
} = require('graphql');

const ItemType = new GraphQLObjectType({
  name: 'Item',
  fields: () => ({
    id: { type: GraphQLID },
    owner: { type: GraphQLString },
    owner_number: { type: GraphQLString },
    item_name: { type: GraphQLString },
    item_description: { type: GraphQLString },
    item_status: { type: GraphQLBoolean },
  }),
});

module.exports = ItemType;
