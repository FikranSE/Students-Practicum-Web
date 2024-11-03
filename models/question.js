// Question model
module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    questionText: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Question.associate = (models) => {
    Question.belongsTo(models.Response, { foreignKey: 'responseId' });
    Question.belongsTo(models.Class, { foreignKey: 'classId' });
    Question.belongsTo(models.Meeting, { foreignKey: 'meetingId' });
  };

  return Question;
};
