module.exports = (sequelize, Sequelize) => {
  const Item = sequelize.define('item', {
    item_name: {
      type: Sequelize.STRING,
    },
    item_description: {
      type: Sequelize.STRING,
    },
    item_status: {
      type: Sequelize.STRING,
    },
  });
  return Item;
};
