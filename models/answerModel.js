// models/Answer.js
module.exports = (sequelize, DataTypes) => {
  const Answers = sequelize.define("Answers", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    sessionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    questionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    answerText: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
  });

  Answers.associate = (models) => {
    console.log('models.InterviewSessions:', models.InterviewSessions);
    console.log('models.Questions:', models.Questions);

    Answers.belongsTo(models.InterviewSessions, { foreignKey: 'sessionId' });
    Answers.belongsTo(models.Questions, { foreignKey: 'questionId' });
  };

  return Answers;
};
