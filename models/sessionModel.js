module.exports = (sequelize, DataTypes) => {
  const InterviewSessions = sequelize.define("InterviewSessions", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    }
  },{
    timestamps: false,
  });

  InterviewSessions.associate = (models) => {
    InterviewSessions.belongsTo(models.Users, { foreignKey: 'userId' });
    InterviewSessions.hasMany(models.Questions, { foreignKey: 'sessionId' });
    InterviewSessions.hasMany(models.Answers, { foreignKey: 'sessionId' });
    InterviewSessions.hasMany(models.Evaluation, { foreignKey: 'sessionId' });
  };

  return InterviewSessions;
};
