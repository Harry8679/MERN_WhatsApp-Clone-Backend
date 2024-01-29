import app from "./app.js";
import logger from './configs/logger.config.js';

const PORT = process.env.PORT || 6000;
console.log(process.env.NODE_ENV);

app.listen(PORT, () => {
  logger.info(`WhatsApp Backend is running on the port ${PORT}`);
});
