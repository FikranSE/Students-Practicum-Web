module.exports = (sequelize, DataTypes) => {
  const JadwalPraktikum = sequelize.define('JadwalPraktikum', {
    aslabName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false
    },
    day: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
 
  JadwalPraktikum.associate = (models) => {
    JadwalPraktikum.belongsTo(models.Class, { foreignKey: 'classId' });
  };

  return JadwalPraktikum;
};
