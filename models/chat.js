module.exports = (sequelize, DataTypes) => {
  const Chat = sequelize.define('Chat', {
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    senderId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users', // Changed from 'User' to 'Users'
        key: 'id'
      }
    },
    receiverId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    }
  });

  Chat.associate = (models) => {
    Chat.belongsTo(models.User, { as: 'Sender', foreignKey: 'senderId' });
    Chat.belongsTo(models.User, { as: 'Receiver', foreignKey: 'receiverId' });
  };

  return Chat;
};