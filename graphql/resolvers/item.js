const { AuthenticationError } = require('apollo-server');

const Item = require('../../models/').items;
const e = require('express');
const isAuth = require('../../utils/auth');

module.exports = {
  Query: {
    getItems: async () => {
      const items = Item.findAll();
      return items;
    },
  },

  Mutation: {
    async addItem(
      _,
      { owner, owner_number, item_name, item_description, item_status },
      context
    ) {
      const userDetails = isAuth(context);

      await Item.create({
        user: userDetails.id,
        owner,
        owner_number,
        item_name,
        item_description,
        item_status,
      });

      return {
        id: userDetails.id,
        owner,
        owner_number,
        item_name,
        item_description,
        item_status,
      };
    },
    async editItem(
      _,
      { id, owner, owner_number, item_name, item_description, item_status }
    ) {
      const item = await Item.findOne({
        where: {
          id,
        },
      });

      if (!item) throw new Error('Item not found!');

      await Item.update(
        {
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
    async deleteItem(_, { id }, context) {
      const userDetails = isAuth(context);

      const item = await Item.findOne({
        where: {
          id,
        },
      });

      if (!item) throw new Error('Item not found!');

      if (userDetails.id === item.user) {
        await Item.destroy({
          where: {
            id,
          },
        });
      } else {
        throw new AuthenticationError('This action is not allowed!');
      }

      return item;
    },
  },
};
