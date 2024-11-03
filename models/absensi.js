// Absensi model
module.exports = (sequelize, DataTypes) => {
  const Absensi = sequelize.define('Absensi', {
    tanggal_absen: {
      type: DataTypes.DATE,
      allowNull: false
    },
    kehadiran: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }); 
  
  Absensi.associate = (models) => {
    Absensi.belongsTo(models.Class, { foreignKey: 'classId' });
    Absensi.belongsTo(models.User, { foreignKey: 'userId' });
  }; 

  return Absensi;
};
