// Backend/src/services/models/aboutUs.model.js
import mongoose from 'mongoose';

const aboutUsSchema = new mongoose.Schema({
    title: String,
    description: String,
});

export default mongoose.model('AboutUs', aboutUsSchema);