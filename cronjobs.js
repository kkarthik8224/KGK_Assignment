const cron = require('node-cron');
const sequelize = require('./config/database');

cron.schedule('*/1 * * * *', async () => {
  try {
    await sequelize.query(`
      UPDATE resources
      SET status = 'expired'
      WHERE expiration_time < NOW() AND status = 'active';
    `);
    console.log('Checked and updated expired resources.');
  } catch (error) {
    console.error('Error updating expired resources:', error);
  }
});