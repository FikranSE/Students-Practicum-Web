module.exports = (sequelize, DataTypes) => {
  const Module = sequelize.define('Module', {
    filePath: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Module.associate = (models) => {
    Module.belongsTo(models.Meeting, { foreignKey: 'meetingId' });
    Module.belongsTo(models.Class, { foreignKey: 'classId' });
  };

  return Module;
};