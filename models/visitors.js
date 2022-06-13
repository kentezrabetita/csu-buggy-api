module.exports = (sequelize, Sequelize) => {
  const Visitor = sequelize.define('visitor', {
    last_name: {
      type: Sequelize.STRING,
    },
    first_name: {
      type: Sequelize.STRING,
    },
    middle_name: {
      type: Sequelize.STRING,
    },
    purpose: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.BOOLEAN,
    },
    image_url: {
      type: Sequelize.STRING,
    },
  });
  return Visitor;
};
