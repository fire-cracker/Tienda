import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { createLogger, format, transports } from 'winston';

import { sequelize } from './index';

const logger = createLogger({
  level: 'debug',
  format: format.simple(),
  transports: [new transports.Console()]
});

(async function () {
  const sql = await fs.promises.readFile(path.join(__dirname, './tshirtshop.sql'), 'utf8');
  await sequelize.query(sql, { type: sequelize.QueryTypes.RAW });
  logger.debug(chalk.blue('All tables created and seeded successfully'));
}());
