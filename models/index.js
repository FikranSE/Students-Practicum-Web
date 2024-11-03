const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config.json');

const sequelize = new Sequelize(config.development);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user')(sequelize, DataTypes);
db.Class = require('./class')(sequelize, DataTypes);
db.Enrollment = require('./enrollment')(sequelize, DataTypes);
db.Meeting = require('./meeting')(sequelize, DataTypes);
db.Module = require('./module')(sequelize, DataTypes);
db.Assignment = require('./assignment')(sequelize, DataTypes);
db.Response = require('./response')(sequelize, DataTypes);
db.Discussion = require('./discussion')(sequelize, DataTypes);
db.Chat = require('./chat')(sequelize, DataTypes);
db.Submission = require('./submission')(sequelize, DataTypes);
db.JadwalPraktikum = require('./jadwalPraktikum')(sequelize, DataTypes);
db.Answer = require('./answer')(sequelize, DataTypes);
db.Question = require('./question')(sequelize, DataTypes);
db.Reference = require('./reference')(sequelize, DataTypes);
db.Absensi = require('./absensi')(sequelize, DataTypes);

// Mengatur asosiasi model
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
 
// Sinkronisasi model
sequelize.sync({ force: false }).then(() => {
  console.log('Database & tables created!');
});
 
module.exports = db;
  