// Backend/src/services/models/slider.model.js
import mongoose from 'mongoose';

const sliderSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

export default mongoose.model('Slider', sliderSchema);