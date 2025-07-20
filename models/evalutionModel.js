module.exports = (sequelize, DataTypes) => {
  const Evaluation = sequelize.define("Evaluation", {
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
    score: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    feedback: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
  });

  Evaluation.associate = (models) => {
    Evaluation.belongsTo(models.InterviewSessions, { foreignKey: 'sessionId' });
    Evaluation.belongsTo(models.Questions, { foreignKey: 'questionId' });
  };

  return Evaluation;
};
