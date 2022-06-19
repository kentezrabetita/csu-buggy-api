module.exports = (sequelize, Sequelize) => {
  const Item = sequelize.define('item', {
    owner: {
      type: Sequelize.STRING,
    },
    owner_number: {
      type: Sequelize.STRING,
    },
    item_name: {
      type: Sequelize.STRING,
    },
    item_description: {
      type: Sequelize.STRING,
    },
    item_status: {
      type: Sequelize.BOOLEAN,
    },
  });
  return Item;
};
