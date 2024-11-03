module.exports = (sequelize, DataTypes) => {
  const Submission = sequelize.define('Submission', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    classId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    meetingId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    assignmentId: { // Add this column to the table
      type: DataTypes.INTEGER,
      allowNull: false
    },
    uploadedFile: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Submission.associate = (models) => {
    Submission.belongsTo(models.User, { foreignKey: 'userId' });
    Submission.belongsTo(models.Class, { foreignKey: 'classId' });
    Submission.belongsTo(models.Meeting, { foreignKey: 'meetingId' });
    Submission.belongsTo(models.Assignment, { foreignKey: 'assignmentId' }); // Make sure this association is defined
  }; 

  return Submission;
};
