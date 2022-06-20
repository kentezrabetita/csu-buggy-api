const Item = require('../../models/').items;

module.exports = {
  Query: {
    getItems: async () => {
      const items = await Item.findAll();
      return items;
    },

    async getItem(_, { id }) {
      const item = await Item.findOne({
        where: {
          id,
        },
      });

      if (!item) throw new Error('Item not found!');

      return item;
    },
  },

  Mutation: {
    async addItem(_, { item_name, item_description, item_status }) {
      await Item.create({
        item_name,
        item_description,
        item_status,
      });

      return {
        item_name,
        item_description,
        item_status,
      };
    },

    async editItem(_, { id, item_name, item_description, item_status }) {
      const item = await Item.findOne({
        where: {
          id,
        },
      });

      if (!item) throw new Error('Item not found!');

      await Item.update(
        {
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
