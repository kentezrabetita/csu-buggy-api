const {
  GraphQLString,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLID,
} = require('graphql');

const ItemType = require('../typedefs/item');
const Item = require('../../models').items;

const ADD_ITEM = {
  type: ItemType,
  args: {
    owner: { type: new GraphQLNonNull(GraphQLString) },
    owner_number: { type: new GraphQLNonNull(GraphQLString) },
    item_name: { type: new GraphQLNonNull(GraphQLString) },
    item_description: { type: new GraphQLNonNull(GraphQLString) },
    item_status: { type: new GraphQLNonNull(GraphQLBoolean) },
  },
  async resolve(parent, args) {
    const { owner, owner_number, item_name, item_description, item_status } =
      args;

    await Item.create({
      owner,
      owner_number,
      item_name,
      item_description,
      item_status,
    });

    return args;
  },
};

const EDIT_ITEM = {
  type: ItemType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    owner: { type: new GraphQLNonNull(GraphQLString) },
    owner_number: { type: new GraphQLNonNull(GraphQLString) },
    item_name: { type: new GraphQLNonNull(GraphQLString) },
    item_description: { type: new GraphQLNonNull(GraphQLString) },
    item_status: { type: new GraphQLNonNull(GraphQLBoolean) },
  },
  async resolve(parent, args) {
    const {
      id,
      owner,
      owner_number,
      item_name,
      item_description,
      item_status,
    } = args;

    const item = await Item.findOne({
      where: {
        id,
      },
    });

    if (!item) throw new Error('Item not found!');

    await Item.update(
      {
        id,
        owner,
        owner_number,
        item_name,
        item_description,
        item_status,
      },
      {
        where: {
          id,
        },
      }
    );

    return await Item.findOne({
      where: {
        id,
      },
    });
  },
};

const DELETE_ITEM = {
  type: ItemType,
  args: { id: { type: new GraphQLNonNull(GraphQLID) } },
  async resolve(parent, args) {
    const item = await Item.findOne({
      where: {
        id: args.id,
      },
    });

    if (!item) throw new Error('Item not found!');

    await Item.destroy({
      where: {
        id: args.id,
      },
    });

    return item;
  },
};

module.exports = {
  ADD_ITEM,
  EDIT_ITEM,
  DELETE_ITEM,
};
