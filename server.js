const express = require('express');
const sequelize = require('./config/database');
const resourceRoutes = require('./routes/resource_routes');
const userRoutes = require('./routes/user_routes');
const cronJobs = require('./cronjobs');
const { authMiddleware } = require('./middlewares/auth');

const app = express();
app.use(express.json());
app.use('/api/resources', resourceRoutes);
app.use('/user', userRoutes);


(async () => {
  try {
    await sequelize.sync({alter:true});
    console.log('Database synced.');
    app.listen(3000, () => console.log(`Server running on port 3000`));
  } catch (error) {
    console.error('Error starting server:', error);
  }
})();
