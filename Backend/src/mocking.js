import {fakerES as faker} from '@faker-js/faker';
import mongoose from 'mongoose';
import Product from './services/models/products.model.js';
import Slider from './services/models/sliders.model.js';
import AboutUs from './services/models/aboutUs.model.js';
import logger from './utils/logger.js';
import config from './config/config.js';

// Verificar que URL_MONGO esté definida
if (!config.mongoURI) {
    console.error('Error: URL_MONGO no está definida en configs.js');
    process.exit(1); // Salir si no hay URL de conexión
}

// Conectar a MongoDB
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Conectado a la base de datos para generar datos de prueba');
}).catch((err) => {
    console.error('Error al conectar a la base de datos:', err);
    process.exit(1);
});

async function generateMockProducts(numProducts = 20) {
    const products = [];
    
    for (let i = 0; i < numProducts; i++) {
        products.push({
            name: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            precio: faker.number.float({ min: 10, max: 1000, precision: 0.01 }),
            stock: faker.number.int({ min: 0, max: 100 }),
            imageUrl: faker.image.url({ width: 300, height: 300, category: 'product' }),
        });
    }

    try {
        logger.info(`Generando ${numProducts} productos falsos...`);
        await Product.insertMany(products);
        logger.info('Productos falsos generados exitosamente');
    } catch (error) {
        logger.error('Error al generar productos falsos:', error);
        throw error;
    }
}

async function generateMockSliders(numSliders = 5) {
    const sliders = [];

    for (let i = 0; i < numSliders; i++) {
        sliders.push({
            title: faker.lorem.sentence({ min: 3, max: 5 }),
            description: faker.lorem.paragraph(),
            imageUrl: faker.image.url({ width: 1200, height: 400, category: 'banner' }),
        });
    }

    try {
        logger.info(`Generando ${numSliders} sliders falsos...`);
        await Slider.insertMany(sliders);
        logger.info('Sliders falsos generados exitosamente');
    } catch (error) {
        logger.error('Error al generar sliders falsos:', error);
        throw error;
    }
}

async function generateAboutUs() {
    const aboutUsData = {
        title: 'Sobre Nosotros',
        description: faker.lorem.paragraphs(2, '\n'),
    };

    try {
        logger.info('Generando datos de AboutUs...');
        // Eliminar cualquier registro existente de AboutUs para asegurar un único registro
        await AboutUs.deleteMany({});
        await AboutUs.create(aboutUsData);
        logger.info('Datos de AboutUs generados exitosamente');
    } catch (error) {
        logger.error('Error al generar datos de AboutUs:', error);
        throw error;
    }
}

async function poblarBaseDeDatos() {
    try {
        // Generar productos
        await generateMockProducts(20);
        // Generar sliders
        await generateMockSliders(5);
        // Generar AboutUs
        await generateAboutUs();
        logger.info('Base de datos poblada exitosamente');
    } catch (error) {
        logger.error('Error al poblar la base de datos:', error);
    } finally {
        // Cerrar la conexión a MongoDB
        await mongoose.connection.close();
        logger.info('Conexión a MongoDB cerrada');
    }
}

// Ejecutar la función principal
poblarBaseDeDatos();