module.exports = (sequelize, DataTypes) => {
  const Discussion = sequelize.define('Discussion', {
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });
 
  Discussion.associate = (models) => {
    Discussion.belongsTo(models.User, { foreignKey: 'userId' });
    Discussion.belongsTo(models.Class, { foreignKey: 'classId' });
  };

  return Discussion;
};