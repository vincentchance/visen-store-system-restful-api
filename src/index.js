import {web} from './application/web.js';
import {logger} from './application/logging.js';
import dotenv from 'dotenv';
import userService from './service/user-service.js'

dotenv.config();

web.listen(3000, () => {
	(async () => {
	  try {
		await userService.adminSetup();
	  } catch (err) {
		console.error('❌ Admin setup failed:', err.message);
	  }
	})();
	logger.info('App start');
})