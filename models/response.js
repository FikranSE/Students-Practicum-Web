module.exports = (sequelize, DataTypes) => {
  const Response = sequelize.define('Response', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    due: { 
      type: DataTypes.DATE,
      allowNull: false
    }
  });

  Response.associate = (models) => {
    Response.belongsTo(models.Meeting, { foreignKey: 'meetingId' }); 
    Response.belongsTo(models.Class, { foreignKey: 'classId' });
    Response.hasMany(models.Question, { foreignKey: 'responseId' });
  }; 

  return Response;
};