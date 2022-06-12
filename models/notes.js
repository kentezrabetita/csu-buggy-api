module.exports = (sequelize, Sequelize) => {
  const Note = sequelize.define('note', {
    user_id: {
      type: Sequelize.INTEGER,
    },
    description: {
      type: Sequelize.STRING,
    },
  });
  return Note;
};
