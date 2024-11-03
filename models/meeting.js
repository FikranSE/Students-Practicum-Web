module.exports = (sequelize, DataTypes) => {
  const Meeting = sequelize.define('Meeting', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Meeting.associate = (models) => {
    Meeting.belongsTo(models.Class, { foreignKey: 'classId' });
    Meeting.hasMany(models.Module, { foreignKey: 'meetingId' });
    Meeting.hasMany(models.Assignment, { foreignKey: 'meetingId' });
    Meeting.hasMany(models.Submission, { foreignKey: 'meetingId' }); 
    Meeting.hasMany(models.Response, { foreignKey: 'meetingId' }); 
    Meeting.hasMany(models.Question, { foreignKey: 'meetingId' }); 
  };
  

  return Meeting;
};