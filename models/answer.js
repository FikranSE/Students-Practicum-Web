// Answer model
module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define('Answer', {
    answerText: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  
  Answer.associate = (models) => {
    Answer.belongsTo(models.Response, { foreignKey: 'responseId' });
    Answer.belongsTo(models.Class, { foreignKey: 'classId' });
    Answer.belongsTo(models.Meeting, { foreignKey: 'meetingId' });
    Answer.belongsTo(models.User, { foreignKey: 'userId' });
    Answer.belongsTo(models.Question, { foreignKey: 'questionId' });
  }; 

  return Answer;
};
