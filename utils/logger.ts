import pinoLogger from 'pino';

const logger = pinoLogger();
export const logInfo = (payload: any, message?: string) => logger.info(payload, message);

export const logError = (payload: any, message?: string) => logger.error(payload, message);

export const logDebug = (payload: any, message?: string) => logger.debug(payload, message);

export const logWarn = (payload: any, message?: string) => logger.warn(payload, message);