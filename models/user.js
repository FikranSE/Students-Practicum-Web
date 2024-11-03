module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    nim: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'mahasiswa'
    }
  });

  User.associate = (models) => {
    User.hasMany(models.Discussion, { foreignKey: 'userId', onDelete: 'CASCADE' });
    User.hasMany(models.Chat, { as: 'SentChats', foreignKey: 'senderId', onDelete: 'CASCADE' });
    User.hasMany(models.Chat, { as: 'ReceivedChats', foreignKey: 'receiverId', onDelete: 'CASCADE' });
    User.hasMany(models.Submission, { foreignKey: 'userId', onDelete: 'CASCADE' }); 
    User.hasMany(models.Answer, { foreignKey: 'userId', onDelete: 'CASCADE' }); 
    User.hasMany(models.Absensi, { foreignKey: 'userId', onDelete: 'CASCADE' }); 
  };
  

  return User;
};