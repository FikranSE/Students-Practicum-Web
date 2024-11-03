module.exports = (sequelize, DataTypes) => {
  const Reference = sequelize.define('Reference', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Reference.associate = (models) => {
    Reference.belongsTo(models.Class, {
      foreignKey: 'classId',
      as: 'class'
    });
  };

  return Reference;
};