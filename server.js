const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const path = require('path');
const app = express();
const port = 3000;
const { sequelize } = require('./models');
const userRoutes = require('./routes/userRoutes');
const kelasRoutes = require('./routes/kelasRoutes');
const meetingRoutes = require('./routes/meetingRoutes');
const moduleRoutes = require('./routes/moduleRoutes');
const assignmentRoutes = require('./routes/assignmentRoutes');
const submissionRoutes = require('./routes/submissionRoutes');
const responsiRoutes = require('./routes/responsiRoutes');
const discussionRoutes = require('./routes/discussionRoutes');

app.set('view engine', 'ejs'); 
app.set('views', path.join(__dirname, 'views')); 
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));



app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Pastikan secure diatur ke true di production
}));




// routes
app.use('/', userRoutes);
app.use('/', kelasRoutes);
app.use('/', meetingRoutes);
app.use('/', moduleRoutes);
app.use('/', assignmentRoutes);
app.use('/', submissionRoutes);
app.use('/', responsiRoutes);
app.use('/', discussionRoutes);

sequelize.sync({ force: false }) 
  .then(() => {
    console.log('Database synced');
  })
  .catch(err => {
    console.error('Failed to sync database:', err);
  });

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
