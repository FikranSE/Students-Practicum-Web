module.exports = (sequelize, DataTypes) => {
  const Assignment = sequelize.define('Assignment', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    instructions: {
      type: DataTypes.STRING,
      allowNull: false
    },
    submitedFile: {
      type: DataTypes.STRING,
      allowNull: true
    },
    due: { 
      type: DataTypes.DATE,
      allowNull: false
    }
  });

  Assignment.associate = (models) => {
    Assignment.belongsTo(models.Meeting, { foreignKey: 'meetingId' });
    Assignment.belongsTo(models.Class, { foreignKey: 'classId' });
    Assignment.hasMany(models.Submission, { foreignKey: 'assignmentId' }); // Add this line to establish the association
  };
   
  return Assignment;
};
