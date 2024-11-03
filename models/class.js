module.exports = (sequelize, DataTypes) => {
  const Class = sequelize.define('Class', {
    enrollKey: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    year: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Class.associate = (models) => {
    Class.hasMany(models.Meeting, { foreignKey: 'classId' });
    Class.hasMany(models.Question, { foreignKey: 'classId' });
    Class.hasMany(models.Enrollment, { foreignKey: 'classId' });
    Class.hasMany(models.Submission, { foreignKey: 'classId' });
    Class.hasMany(models.Module, { foreignKey: 'classId' });
    Class.hasMany(models.Assignment, { foreignKey: 'classId' });
    Class.hasMany(models.JadwalPraktikum, { foreignKey: 'classId' });
    Class.hasMany(models.Response, { foreignKey: 'classId' });
    Class.hasMany(models.Discussion, { foreignKey: 'classId' });
    Class.hasMany(models.Absensi, { foreignKey: 'classId' });
    Class.hasMany(models.Reference, {
      foreignKey: 'classId',
      as: 'references' 
    });
  };

  return Class;
}; 