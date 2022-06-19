const { GraphQLList } = require('graphql');
const ItemType = require('../typedefs/item');
const Item = require('../../models').items;

const GET_ALL_ITEMS = {
  type: new GraphQLList(ItemType),
  async resolve() {
    const items = Item.findAll();
    return items;
  },
};

module.exports = {
  GET_ALL_ITEMS,
};
