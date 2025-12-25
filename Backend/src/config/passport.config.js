// Backend/src/config/passport.config.js
import passport from 'passport';
import passportLocal from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { cookieExtractor, PRIVATE_KEY } from '../utils/jwt.js';
import { createHash } from '../utils/password.js';
import logger from '../utils/logger.js';
import UserDAO from '../services/dao/user.dao.js';

//estrategia declarada
  const LocalStrategy = passportLocal.Strategy;
  const userDAO = new UserDAO();

   const initializePassport = () => {
  // JwtStrategy
  passport.use(
    'jwt',
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: PRIVATE_KEY,
      },
      async (jwt_payload, done) => {
        logger.info('Entrando a passport Strategy con JWT.');
        try {
          logger.info('JWT obtenido payload:');
          logger.info(JSON.stringify(jwt_payload, null, 2));
          if (!jwt_payload.id) {
            logger.error('ID no encontrado en el payload del JWT');
            return done(null, false, { message: 'ID no encontrado en el token' });
          }
          const user = await userDAO.getUserById(jwt_payload.id);
          if (!user) {
            logger.warn(`Usuario no encontrado para ID: ${jwt_payload.id}`);
            return done(null, false, { message: 'Usuario no encontrado' });
          }
          logger.info(`Usuario autenticado: ${user.email} (ID: ${jwt_payload.id})`);
          return done(null, user);
        } catch (error) {
          logger.error(`Error en estrategia de passport JWT: ${error.message}`);
          return done(error, false);
        }
      }
    )
  );

  // LocalStrategy - registro de usuario
    passport.use(
    'register',
    new LocalStrategy(
      { passReqToCallback: true, usernameField: 'email' },
      async (req, username, password, done) => {
        logger.info(`Registrando usuario ${username}`);
        const { username: userName, email } = req.body;

        try {
          const exist = await userDAO.findByEmail(email);
          if (exist) {
            logger.warn(`El usuario ya existe: ${email}`);
            return done(null, false, { message: 'El usuario ya existe' });
          }

          const hashedPassword = createHash(password);
          const user = {
            username: userName,
            email,
            password: hashedPassword,
            role: 'user',
            loggedBy: 'App',
          };
          const result = await userDAO.createUser(user);

          logger.info(`Usuario registrado correctamente: ${email}`);
          return done(null, result);
        } catch (error) {
          logger.error(`Error registrando usuario: ${error.message}`);
          return done(error);
        }
      }
    )
  );


  // Serialización y deserialización
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (_id, done) => {
    try {
      const user = await userDAO.getUserById(_id);
      done(null, user);
    } catch (error) {
      logger.error(`Error deserializando el usuario: ${error.message}`);
      done(error);
    }
  });
};

export default initializePassport;