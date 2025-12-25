// Backend/src/utils/password.jss
import bcrypt from 'bcrypt';
import logger from './logger.js';

export const createHash = (password) => {
    try{
        logger.info(`Generando hash de contraseña`);
        const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        logger.info(`Hash de contraseña generado`);
        return hash
    } catch (error){
        logger.error(`Error al generar hash de contraseña: ${error.message}`);
        throw new Error(`Error al generar contraseña`);
    }
}

export const isValidPassword = (user, password) => {
    try {
        logger.info(`Validando contraseña para usuario: ${user.email} (ID: ${user.id})`);
        const isValid = bcrypt.compareSync(password, user.password);
        if (isValid) {
            logger.info(`Contraseña válida para usuario: ${user.email}`);
        } else {
            logger.warn(`Contraseña inválida para usuario: ${user.email}`);
        }
        return isValid;
    } catch (error) {
        logger.error(`Error al validar contraseña para usuario ${user.email}: ${error.message}`);
        throw new Error('Error al validar contraseña');
    }
};