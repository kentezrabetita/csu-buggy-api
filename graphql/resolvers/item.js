const Item = require('../../models/').items;

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
      { owner, owner_number, item_name, item_description, item_status }
    ) {
      await Item.create({
        owner,
        owner_number,
        item_name,
        item_description,
        item_status,
      });

      return {
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
    async deleteItem(_, { id }) {
      const item = await Item.findOne({
        where: {
          id,
        },
      });

      if (!item) throw new Error('Item not found!');

      await Item.destroy({
        where: {
          id,
        },
      });

      return item;
    },
  },
};
