// Backend/src/utils/jwt.js
import jwt from 'jsonwebtoken';
import logger from './logger.js';
import config from '../config/config.js';

export const PRIVATE_KEY = config.cookieSecret;

export const generateJWToken = (user) => {
  try {
    if (!user.id) {
      logger.error('No se proporcionó un ID de usuario para generar el token JWT');
      throw new Error('ID de usuario inválido');
    }
    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    };
    logger.info(`Generando token JWT para usuario ${user.email} (ID: ${user.id})`);
    const token = jwt.sign(payload, PRIVATE_KEY, { expiresIn: '1h' });
    logger.info(`Token JWT generado exitosamente para ${user.email}`);
    return token;
  } catch (error) {
    logger.error(`Error al generar JWT para ${user.email || 'desconocido'}: ${error.message}`);
    throw new Error('Error al generar token JWT');
  }
};

export const generateResetToken = (email) => {
  try {
    logger.info(`Generando token de restablecimiento para email: ${email}`);
    const token = jwt.sign({ email }, PRIVATE_KEY, { expiresIn: '15m' });
    logger.info(`Token de restablecimiento generado para ${email}`);
    return token;
  } catch (error) {
    logger.error(`Error al generar token de restablecimiento para ${email}: ${error.message}`);
    throw new Error('Error al generar token de restablecimiento');
  }
};

export const verifyResetToken = (token) => {
  try {
    logger.info(`Verificando token de restablecimiento: ${token.substring(0, 10)}...`);
    const decoded = jwt.verify(token, PRIVATE_KEY);
    logger.info(`Token de restablecimiento verificado exitosamente: ${decoded.email}`);
    return decoded;
  } catch (error) {
    logger.error(`Error al verificar token de restablecimiento: ${error.message}`);
    throw new Error('Token inválido o expirado');
  }
};

export const cookieExtractor = (req) => {
  const token = req?.cookies?.JwtCookieToken || null;
  if (token) {
    logger.info(`Cookie extraída: ${token.substring(0, 10)}...`);
  } else {
    logger.warn(`No se encontró cookie JwtCookieToken`);
  }
  return token;
};