// Backend/src/app.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import multer from 'multer';
import config from './config/config.js';
import path from 'path';
import logger from './utils/logger.js';
import noCache from './middlewares/noCache.js';
import cookieParser from 'cookie-parser';
import userRouter from './routes/users.router.js';
import productRouter from './routes/products.router.js';
import sliderRouter from './routes/sliders.router.js';
import sessionRouter from './routes/session.router.js';
import './config/passport.config.js';
import initializePassport from './config/passport.config.js';
import swaggerUiExpress from 'swagger-ui-express';
import swaggerSpecs from './config/swagger.js';
import passport from 'passport';
import aboutRouter from './routes/about.router.js';
import orderRouter from './routes/orders.router.js';

const app = express();
const PORT = config.port;
const MONGO_URI = config.mongoURI;

app.use(cors({
    origin: config.frontendURL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/upload', express.static('upload'));
app.use(cookieParser(config.cookieSecret))
app.use(noCache)
initializePassport();
app.use(passport.initialize())

const storage = multer.diskStorage({
    destination:(req, file, cd) => cb(null, 'upload/'),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

//routers
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/sliders', sliderRouter);
app.use('/api/sessions', sessionRouter);
app.use('/api/about', aboutRouter);
app.use('/api/orders', orderRouter);
app.use('/api/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerSpecs));

const server = app.listen(PORT, () => {
    logger.info(`Servidor corriendo en ${PORT}`);
});

mongoose.connect(MONGO_URI)
.then(() => {
    logger.info('Conectado a MongoDB');
}).catch(err => {
    logger.error('Error conectando a MongoDB', err);
});