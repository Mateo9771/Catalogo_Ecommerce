// Backend/src/services/dtos/slider.dto.js
class SliderDTO {
  constructor(slider) {
    this.id = slider._id;
    this.title = slider.title;
    this.description = slider.description;
    this.imageUrl = slider.imageUrl;
  }
}

export default SliderDTO;