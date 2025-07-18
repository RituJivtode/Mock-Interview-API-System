// models/Question.js
module.exports = (sequelize, DataTypes) => {
  const Questions = sequelize.define("Questions", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    sessionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    questionText: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
  });

  Questions.associate = (models) => {
    Questions.belongsTo(models.InterviewSessions, { foreignKey: 'sessionId' });
    Questions.hasMany(models.Answers, { foreignKey: 'questionId' });
    Questions.hasMany(models.Evaluation, { foreignKey: 'questionId' });
  };

  return Questions;
};
